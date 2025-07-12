/**
 * Shared helper functions for chunk-related operations
 * These functions are used across multiple chunk feature files
 */

/**
 * Checks if a module is React-related
 * @param {string} moduleId - Module ID to check
 * @param {string[]} customPatterns - Custom patterns to check (optional)
 * @returns {boolean} True if module is React-related
 */
export function isReactModule(moduleId, customPatterns = null) {
	const defaultPatterns = [
		'jsx-dev-runtime',
		'jsx-runtime',
		'react/index',
		'react-dom',
	];

	const patterns = customPatterns || defaultPatterns;
	return patterns.some((pattern) => moduleId.includes(pattern));
}

/**
 * Checks if a module is a WordPress editor package
 * @param {string} moduleId - Module ID to check
 * @param {string[]} customPatterns - Custom patterns to check (optional)
 * @returns {boolean} True if module is a WordPress editor package
 */
export function isWordPressEditorModule(moduleId, customPatterns = null) {
	const defaultPatterns = [
		'@wordpress/block-editor',
		'@wordpress/components',
		'@wordpress/compose',
		'@wordpress/rich-text',
		'@wordpress/editor',
	];

	const patterns = customPatterns || defaultPatterns;
	return patterns.some((pattern) => moduleId.includes(pattern));
}

/**
 * Checks if a module is an editor file based on file patterns
 * @param {string} moduleId - Module ID to check
 * @param {string[]} customPatterns - Custom patterns to check (optional)
 * @returns {boolean} True if module appears to be editor-related
 */
export function isEditorFile(moduleId, customPatterns = null) {
	const defaultPatterns = [
		'editor.',
		'/editor/',
		'editor-styles',
		'edit.jsx',
		'edit.tsx',
		'edit.js',
		'edit.ts',
	];

	const patterns = customPatterns || defaultPatterns;
	return patterns.some((pattern) => moduleId.includes(pattern));
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
 * Checks if a module is used by both editor and frontend (save) components
 * @param {string} moduleId - Module ID to check
 * @param {Function} getModuleInfo - Function to get module information
 * @param {Object} patterns - Custom patterns to check (optional)
 * @param {string[]} patterns.editor - Editor file patterns
 * @param {string[]} patterns.frontend - Frontend file patterns
 * @returns {boolean} True if module is used by both editor and frontend
 */
export function isSharedEditorFrontendUtility(
	moduleId,
	getModuleInfo,
	patterns = null
) {
	const defaultPatterns = {
		editor: [
			'edit.tsx',
			'edit.jsx',
			'edit.js',
			'edit.ts',
			'editor.',
			'/editor/',
			'Inspector.tsx',
		],
		frontend: [
			'save.tsx',
			'save.jsx',
			'save.js',
			'save.ts',
			'view.',
			'/view/',
			'render.php',
		],
	};

	const checkPatterns = patterns || defaultPatterns;

	try {
		const moduleInfo = getModuleInfo(moduleId);
		if (!moduleInfo || !moduleInfo.importers) return false;

		const hasEditorImporter = moduleInfo.importers.some((importer) =>
			checkPatterns.editor.some((pattern) => importer.includes(pattern))
		);

		const hasFrontendImporter = moduleInfo.importers.some((importer) =>
			checkPatterns.frontend.some((pattern) => importer.includes(pattern))
		);

		return hasEditorImporter && hasFrontendImporter;
	} catch (e) {
		return false;
	}
}

/**
 * Checks if a module is a shared editor utility based on file patterns
 * @param {string} moduleId - Module ID to check
 * @param {Function} getModuleInfo - Function to get module information (optional)
 * @param {Object} patterns - Custom patterns to check (optional)
 * @param {string[]} patterns.editor - Editor file patterns
 * @param {string[]} patterns.frontend - Frontend file patterns
 * @param {string[]} patterns.fallback - Fallback patterns for basic detection
 * @returns {boolean} True if module is a shared editor utility
 */
export function isSharedEditorUtility(
	moduleId,
	getModuleInfo = null,
	patterns = null
) {
	const defaultPatterns = {
		editor: [
			'edit.tsx',
			'edit.jsx',
			'edit.js',
			'edit.ts',
			'editor.',
			'/editor/',
			'Inspector.tsx',
		],
		frontend: [
			'save.tsx',
			'save.jsx',
			'save.js',
			'save.ts',
			'view.',
			'/view/',
			'render.php',
		],
		fallback: ['/inspector/', 'components/inspector'],
	};

	const checkPatterns = patterns || defaultPatterns;

	// Use dynamic analysis if getModuleInfo is available
	if (getModuleInfo) {
		try {
			const moduleInfo = getModuleInfo(moduleId);
			if (!moduleInfo || !moduleInfo.importers) return false;

			// Check if this module is imported only by editor files
			const isUsedByEditor = moduleInfo.importers.some((importer) =>
				checkPatterns.editor.some((pattern) =>
					importer.includes(pattern)
				)
			);

			// Check if it's NOT used by frontend files
			const isUsedByFrontend = moduleInfo.importers.some((importer) =>
				checkPatterns.frontend.some((pattern) =>
					importer.includes(pattern)
				)
			);

			// Return true if used by editor but not frontend
			return isUsedByEditor && !isUsedByFrontend;
		} catch (e) {
			// Fall back to pattern-based detection if dynamic analysis fails
		}
	}

	// Fallback: basic pattern detection for common editor-only patterns
	return checkPatterns.fallback.some((pattern) => moduleId.includes(pattern));
}

/**
 * Checks if a chunk contains modules that are used by editor files
 * @param {Object} chunkInfo - Chunk information from Rollup
 * @param {string[]} customPatterns - Custom patterns to check for editor files (optional)
 * @returns {boolean} True if chunk is editor-related
 */
export function isEditorRelatedChunk(chunkInfo, customPatterns = null) {
	if (!chunkInfo.moduleIds) return false;

	return chunkInfo.moduleIds.some((moduleId) => {
		try {
			// Check if this module is directly an editor file
			return isEditorFile(moduleId, customPatterns);
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
 * @param {string[]} customPatterns - Custom patterns to check (optional)
 * @returns {boolean} True if chunk should go to build root
 */
export function isRootAssetChunk(chunkInfo, customPatterns = null) {
	if (!chunkInfo.name) return false;

	const defaultPatterns = [
		'root-assets',
		'react-runtime',
		'jsx-dev-runtime',
		'jsx-runtime',
	];

	const patterns = customPatterns || defaultPatterns;
	return patterns.some((pattern) => chunkInfo.name.includes(pattern));
}
