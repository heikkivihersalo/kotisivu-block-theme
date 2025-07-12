/**
 * Checks if a module is React-related
 * @param {string} moduleId - Module ID to check
 * @returns {boolean} True if module is React-related
 */
function isReactModule(moduleId) {
	return (
		moduleId.includes('jsx-dev-runtime') ||
		moduleId.includes('jsx-runtime') ||
		moduleId.includes('react/index') ||
		moduleId.includes('react-dom')
	);
}

/**
 * Checks if a module is a WordPress editor package
 * @param {string} moduleId - Module ID to check
 * @returns {boolean} True if module is a WordPress editor package
 */
function isWordPressEditorModule(moduleId) {
	return (
		moduleId.includes('@wordpress/block-editor') ||
		moduleId.includes('@wordpress/components') ||
		moduleId.includes('@wordpress/compose') ||
		moduleId.includes('@wordpress/rich-text') ||
		moduleId.includes('@wordpress/editor')
	);
}

/**
 * Checks if a module is an editor file based on file patterns
 * @param {string} moduleId - Module ID to check
 * @returns {boolean} True if module appears to be editor-related
 */
function isEditorFile(moduleId) {
	return (
		moduleId.includes('editor.') ||
		moduleId.includes('/editor/') ||
		moduleId.includes('editor-styles')
	);
}

/**
 * Checks if a module is used by editor files
 * @param {string} moduleId - Module ID to check
 * @param {Function} getModuleInfo - Function to get module information
 * @param {Set} visited - Set of already visited modules to prevent infinite recursion
 * @returns {boolean} True if module is used by editor files
 */
export function isModuleUsedByEditor(
	moduleId,
	getModuleInfo,
	visited = new Set()
) {
	if (visited.has(moduleId)) return false;
	visited.add(moduleId);

	const moduleInfo = getModuleInfo(moduleId);
	if (!moduleInfo) return false;

	// Direct check - is this directly imported by an editor file?
	const hasDirectEditorImporter = moduleInfo.importers?.some((importer) =>
		isEditorFile(importer)
	);

	if (hasDirectEditorImporter) return true;

	// Recursive check - are any of the importers used by editor files?
	return (
		moduleInfo.importers?.some((importer) =>
			isModuleUsedByEditor(importer, getModuleInfo, visited)
		) || false
	);
}

/**
 * Checks if a module is a shared editor utility based on file patterns
 * @param {string} moduleId - Module ID to check
 * @returns {boolean} True if module is a shared editor utility
 */
function isSharedEditorUtility(moduleId) {
	return (
		moduleId.includes('gapControls') ||
		moduleId.includes('variationPicker') ||
		moduleId.includes('getTransformedMetadata') ||
		moduleId.includes('innerBlocksAppender') ||
		moduleId.includes('tailwind-utilities') ||
		moduleId.includes('classnames') ||
		moduleId.includes('clsx')
	);
}

/**
 * Creates manual chunks configuration for Rollup
 * @returns {Function} Manual chunks function for Rollup configuration
 */
export function createManualChunks() {
	return (id, { getModuleInfo }) => {
		// Helper function to check if a module is used by editor files
		const isUsedByEditor = (moduleId, visited = new Set()) => {
			return isModuleUsedByEditor(moduleId, getModuleInfo, visited);
		};

		// Handle React packages - these should go to build root
		if (isReactModule(id)) {
			return 'react-runtime';
		}

		// Handle shared editor utilities - these should go to editor directory
		if (isSharedEditorUtility(id)) {
			return 'editor-dependencies';
		}

		// Handle WordPress editor packages
		if (isWordPressEditorModule(id)) {
			return 'wp-editor';
		}

		// Dynamically detect any dependency used by editor files
		if (isUsedByEditor(id)) {
			// Skip React dependencies - they should be externalized, but if bundled put in root
			if (id.includes('react')) {
				return 'react-runtime';
			}

			// WordPress editor packages
			if (isWordPressEditorModule(id)) {
				return 'wp-editor';
			}

			// Everything else used by editors goes into a general editor dependencies chunk
			return 'editor-dependencies';
		}

		// Group common WordPress dependencies (only if NOT externalized)
		if (id.includes('@wordpress/')) {
			return 'wp-deps';
		}

		// React dependencies should be externalized, not bundled
		// If React somehow gets here, it means externalization failed
		if (id.includes('react')) {
			console.warn(
				`React dependency ${id} should be externalized but is being bundled. Check externals config.`
			);
			return 'react-runtime';
		}

		return null;
	};
}

/**
 * Creates chunk file names configuration for Rollup
 * @returns {Function} Chunk file names function for Rollup configuration
 */
/**
 * Checks if a chunk contains modules that are used by editor files
 * @param {Object} chunkInfo - Chunk information from Rollup
 * @returns {boolean} True if chunk is editor-related
 */
function isEditorRelatedChunk(chunkInfo) {
	if (!chunkInfo.moduleIds) return false;

	return chunkInfo.moduleIds.some((moduleId) => {
		try {
			// Check if this module is directly an editor file
			return isEditorFile(moduleId);
		} catch (e) {
			return false;
		}
	});
}

/**
 * Checks if a chunk contains utility modules commonly used by editors
 * @param {Object} chunkInfo - Chunk information from Rollup
 * @returns {boolean} True if chunk contains editor utilities
 */
function isEditorUtilityChunk(chunkInfo) {
	if (!chunkInfo.moduleIds) return false;

	return chunkInfo.moduleIds.some((moduleId) => {
		try {
			// Check for WordPress editor packages
			if (isWordPressEditorModule(moduleId)) {
				return true;
			}

			// Check if this is any module used by editor files
			// (Note: We can't use getModuleInfo here, so we do basic heuristics)
			// This will catch utility libraries and project files used by editors
			return false; // Will be handled by dynamic chunk naming from manualChunks
		} catch (e) {
			return false;
		}
	});
}

/**
 * Checks if a chunk should be placed in the build root
 * @param {Object} chunkInfo - Chunk information from Rollup
 * @returns {boolean} True if chunk should go to build root
 */
function isRootAssetChunk(chunkInfo) {
	if (!chunkInfo.name) return false;

	return (
		chunkInfo.name.includes('root-assets') ||
		chunkInfo.name.includes('react-runtime') ||
		chunkInfo.name.includes('jsx-dev-runtime') ||
		chunkInfo.name.includes('jsx-runtime')
	);
}

/**
 * Creates chunk file names configuration for Rollup with direct output logic
 * @param {string} outputDir - Main output directory for blocks
 * @param {string} editorOutputDir - Output directory for editor dependencies
 * @returns {Function} Chunk file names function for Rollup configuration
 */
export function createChunkFileNames(outputDir, editorOutputDir) {
	return (chunkInfo) => {
		// Store chunk destination info in the chunk name for later processing
		if (chunkInfo.name === 'react-runtime' || isRootAssetChunk(chunkInfo)) {
			// Mark as root chunk
			return '[name]__ROOT__.js';
		}
		
		if (chunkInfo.name === 'editor-dependencies' || 
			chunkInfo.name === 'wp-editor' || 
			isEditorRelatedChunk(chunkInfo) || 
			isEditorUtilityChunk(chunkInfo)) {
			// Mark as editor chunk
			return '[name]__EDITOR__.js';
		}

		// Default to blocks directory
		return '[name].js';
	};
}
