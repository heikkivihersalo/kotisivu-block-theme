/**
 * Shared helper functions for chunk-related operations
 * These functions are used across multiple chunk feature files
 */

/**
 * Checks if a module is React-related
 * @param {string} moduleId - Module ID to check
 * @returns {boolean} True if module is React-related
 */
export function isReactModule(moduleId) {
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
export function isWordPressEditorModule(moduleId) {
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
export function isEditorFile(moduleId) {
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
export function isSharedEditorUtility(moduleId) {
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
 * Checks if a chunk contains modules that are used by editor files
 * @param {Object} chunkInfo - Chunk information from Rollup
 * @returns {boolean} True if chunk is editor-related
 */
export function isEditorRelatedChunk(chunkInfo) {
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
export function isEditorUtilityChunk(chunkInfo) {
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
export function isRootAssetChunk(chunkInfo) {
	if (!chunkInfo.name) return false;

	return (
		chunkInfo.name.includes('root-assets') ||
		chunkInfo.name.includes('react-runtime') ||
		chunkInfo.name.includes('jsx-dev-runtime') ||
		chunkInfo.name.includes('jsx-runtime')
	);
}
