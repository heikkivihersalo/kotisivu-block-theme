/**
 * Common patterns that indicate editor-related files
 */
const EDITOR_PATTERNS = [
	'editor.',
	'/editor/',
	'editor-styles',
	'Editor',
	'inspector',
	'Inspector',
	'controls',
	'Controls',
];

/**
 * WordPress packages that are editor-specific
 */
const WP_EDITOR_PACKAGES = [
	'@wordpress/block-editor',
	'@wordpress/components',
	'@wordpress/compose',
	'@wordpress/rich-text',
	'@wordpress/editor',
];

/**
 * React-related packages that should go to root
 */
const REACT_PACKAGES = [
	'jsx-dev-runtime',
	'jsx-runtime',
	'react/index',
	'react-dom',
];

/**
 * Common utility libraries that might be used by editors
 */
const COMMON_UTILITIES = [
	'classnames',
	'clsx',
	'lodash',
	'uuid',
	'prop-types',
	'react-transition-group',
	'react-modal',
	'react-select',
	'downshift',
	'reakit',
	'framer-motion',
	'use-', // React hooks pattern
];

/**
 * Project paths that contain shared utilities
 */
const PROJECT_SHARED_PATHS = [
	'resources/shared',
	'resources/app',
	'/shared/',
	'/app/',
];

/**
 * Checks if a module ID matches any pattern in an array
 * @param {string} moduleId - Module ID to check
 * @param {string[]} patterns - Array of patterns to match against
 * @returns {boolean} True if module matches any pattern
 */
function matchesAnyPattern(moduleId, patterns) {
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
		matchesAnyPattern(importer, EDITOR_PATTERNS)
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
 * Creates manual chunks configuration for Rollup
 * @returns {Function} Manual chunks function for Rollup configuration
 */
export function createManualChunks() {
	return (id, { getModuleInfo }) => {
		// Helper function to check if a module is used by editor files
		const isUsedByEditor = (moduleId, visited = new Set()) => {
			return isModuleUsedByEditor(moduleId, getModuleInfo, visited);
		};

		// Special handling for React and root files - these should go to build root
		if (matchesAnyPattern(id, REACT_PACKAGES)) {
			return 'root-assets/react-runtime';
		}

		// Group editor-specific WordPress dependencies
		if (matchesAnyPattern(id, WP_EDITOR_PACKAGES)) {
			return 'editor-deps/wp-editor';
		}

		// Dynamically detect any dependency used by editor files
		if (isUsedByEditor(id)) {
			// Skip React dependencies - they should be externalized, but if bundled put in root
			if (id.includes('react')) {
				return 'root-assets/react-runtime';
			}

			// Categorize WordPress editor-specific packages
			if (matchesAnyPattern(id, WP_EDITOR_PACKAGES)) {
				return 'editor-deps/wp-editor';
			}

			// Categorize known utility libraries (both node_modules and project)
			if (matchesAnyPattern(id, COMMON_UTILITIES)) {
				return 'editor-deps/editor-utils';
			}

			// Group project-specific shared utilities used by editor
			if (matchesAnyPattern(id, PROJECT_SHARED_PATHS)) {
				return 'editor-deps/project-utils';
			}

			// Group any node_modules dependency used by editor (catch-all)
			if (
				id.includes('/node_modules/') &&
				!id.includes('@wordpress/') &&
				!id.includes('react')
			) {
				return 'editor-deps/misc';
			}

			// Group any other project dependency used by editor
			if (!id.includes('/node_modules/')) {
				return 'editor-deps/project-misc';
			}
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
			return 'root-assets/react-runtime';
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
			// Check if this module is directly editor-related
			if (matchesAnyPattern(moduleId, EDITOR_PATTERNS)) {
				return true;
			}

			// Check if this module contains editor-specific patterns in widgets
			if (
				moduleId.includes('resources/widgets') &&
				matchesAnyPattern(moduleId, EDITOR_PATTERNS)
			) {
				return true;
			}

			// Check for shared utilities that are commonly used by editors
			if (
				moduleId.includes('resources/shared') &&
				(moduleId.includes('components') ||
					moduleId.includes('utils') ||
					moduleId.includes('hooks') ||
					moduleId.includes('lib'))
			) {
				return true;
			}

			return false;
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
			if (matchesAnyPattern(moduleId, WP_EDITOR_PACKAGES)) {
				return true;
			}

			// Check for common editor utilities
			if (matchesAnyPattern(moduleId, COMMON_UTILITIES)) {
				return true;
			}

			// Check for project files that might be editor-related
			if (matchesAnyPattern(moduleId, PROJECT_SHARED_PATHS)) {
				return true;
			}

			// Check for any file that contains editor-specific patterns
			if (
				moduleId.includes('resources/widgets') &&
				matchesAnyPattern(moduleId, EDITOR_PATTERNS)
			) {
				return true;
			}

			return false;
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

	const rootAssetPatterns = [
		'root-assets',
		'react-runtime',
		'jsx-dev-runtime',
		'jsx-runtime',
	];

	return matchesAnyPattern(chunkInfo.name, rootAssetPatterns);
}

/**
 * Creates chunk file names configuration for Rollup
 * @returns {Function} Chunk file names function for Rollup configuration
 */
export function createChunkFileNames() {
	return (chunkInfo) => {
		// Check if this is a root asset that should go to build root
		if (isRootAssetChunk(chunkInfo)) {
			return '[name].js';
		}

		// Check if chunk name already suggests it should remain as-is
		// (covers dynamically generated chunk names from manualChunks)
		if (
			chunkInfo.name &&
			(chunkInfo.name.includes('wp-editor') ||
				chunkInfo.name.includes('editor-utils') ||
				chunkInfo.name.includes('project-utils') ||
				chunkInfo.name.includes('project-misc') ||
				chunkInfo.name.includes('misc'))
		) {
			return '[name].js';
		}

		// Use dynamic detection to determine if this chunk is editor-related
		// Note: getModuleInfo is not available in chunkFileNames, so we rely on simpler heuristics
		const isEditorChunk = isEditorRelatedChunk(chunkInfo);
		const isEditorUtility = isEditorUtilityChunk(chunkInfo);

		// Move editor-related chunks to editor-deps folder
		if (isEditorChunk || isEditorUtility) {
			return 'editor-deps/[name].js';
		}

		return '[name].js';
	};
}
