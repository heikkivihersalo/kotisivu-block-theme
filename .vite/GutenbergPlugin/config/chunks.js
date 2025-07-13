import { ASSET_FOLDERS } from './constants.js';

/**
 * Check if chunking should be enabled based on configuration
 * @param {Object} chunksConfig - Chunk configuration object
 * @returns {boolean} Whether chunking is enabled
 */
function isChunkingEnabled(chunksConfig = {}) {
	// Check if any chunk paths are explicitly defined
	const hasFrontendChunks =
		Array.isArray(chunksConfig.frontend) &&
		chunksConfig.frontend.length > 0;
	const hasEditorChunks =
		Array.isArray(chunksConfig.editor) && chunksConfig.editor.length > 0;

	return hasFrontendChunks || hasEditorChunks;
}

/**
 * Create manual chunks configuration for Rollup
 * This function implements organized chunking logic:
 * - When no chunking is configured: all shared deps go to assets/common
 * - When chunking is configured: specific paths go to assets/frontend or assets/editor
 * - Unconfigured dependencies go to assets/common as fallback
 *
 * @param {Object} chunksConfig - Chunk configuration object with frontend and editor arrays
 * @returns {Function} Manual chunks function for Rollup
 */
export function createManualChunks(
	chunksConfig = { frontend: [], editor: [] }
) {
	const frontendPaths = chunksConfig.frontend || [];
	const editorPaths = chunksConfig.editor || [];
	const isExplicitChunkingEnabled = isChunkingEnabled(chunksConfig);

	return (id) => {
		// Skip WordPress externals (these shouldn't be bundled at all)
		if (id.startsWith('@wordpress')) {
			return undefined;
		}

		// When explicit chunking is enabled, check specific paths first
		if (isExplicitChunkingEnabled) {
			// Check if this module matches any configured frontend chunk paths
			for (const frontendPath of frontendPaths) {
				if (id.includes(frontendPath)) {
					// Extract a meaningful chunk name from the path
					const segments = frontendPath.split('/');
					const chunkName =
						segments[segments.length - 1] || 'frontend-chunk';
					return `assets/frontend/${chunkName}`;
				}
			}

			// Check if this module matches any configured editor chunk paths
			for (const editorPath of editorPaths) {
				if (id.includes(editorPath)) {
					// Extract a meaningful chunk name from the path
					const segments = editorPath.split('/');
					const chunkName =
						segments[segments.length - 1] || 'editor-chunk';
					return `assets/editor/${chunkName}`;
				}
			}
		}

		// For shared dependencies: only chunk substantial shared modules
		if (id.includes('resources/shared')) {
			// Only chunk shared components, utils, and hooks that are likely to be reused
			if (
				id.includes('/components/') ||
				id.includes('/utils/') ||
				id.includes('/hooks/') ||
				id.includes('/constants/')
			) {
				// Group by category for better organization
				if (id.includes('/components/')) {
					return 'assets/common/components';
				}
				if (id.includes('/utils/')) {
					return 'assets/common/utils';
				}
				if (id.includes('/hooks/')) {
					return 'assets/common/hooks';
				}
				if (id.includes('/constants/')) {
					return 'assets/common/constants';
				}
			}
		}

		// Handle node_modules dependencies - put them in common folder to avoid root clutter
		if (id.includes('node_modules')) {
			// Extract package name for better organization
			const nodeModulesMatch = id.match(/node_modules\/([^\/]+)/);
			if (nodeModulesMatch) {
				const packageName = nodeModulesMatch[1];
				// Clean up scoped package names (e.g., @scope/package -> scope-package)
				const cleanPackageName = packageName
					.replace('@', '')
					.replace('/', '-');
				return `assets/common/vendor-${cleanPackageName}`;
			}
			return 'assets/common/vendor';
		}

		// All other files that would normally be chunks should go to common
		// This ensures no files end up in the root blocks folder
		// But only if they're actually being shared between multiple entries
		return undefined; // Let Vite decide, but this should rarely create chunks in root now
	};
}

/**
 * Generate chunk file names for the build output
 * Organizes chunks in assets subdirectories based on their type
 *
 * @param {Object} chunksConfig - Chunk configuration object
 * @returns {Function} Chunk file naming function
 */
export function createChunkFileNames(
	chunksConfig = { frontend: [], editor: [] }
) {
	return (chunkInfo) => {
		// The chunk name already includes the assets subfolder from createManualChunks
		// e.g., "assets/frontend/utils", "assets/editor/components", "assets/common/shared"
		return `${chunkInfo.name}-[hash].js`;
	};
}
