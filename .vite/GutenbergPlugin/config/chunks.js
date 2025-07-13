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
 * This function implements explicit chunking logic:
 * - If no chunk paths are configured, all dependencies stay bundled with entry files
 * - If chunk paths are configured, only those specific paths are split into chunks
 * - No automatic detection or complex heuristics
 *
 * @param {Object} chunksConfig - Chunk configuration object with frontend and editor arrays
 * @returns {Function|undefined} Manual chunks function for Rollup, or undefined if no chunking
 */
export function createManualChunks(
	chunksConfig = { frontend: [], editor: [] }
) {
	// Only enable chunking if explicitly configured
	if (!isChunkingEnabled(chunksConfig)) {
		return undefined; // No manual chunking - keeps dependencies with entry files
	}

	const frontendPaths = chunksConfig.frontend || [];
	const editorPaths = chunksConfig.editor || [];

	return (id) => {
		// Check if this module matches any configured frontend chunk paths
		for (const frontendPath of frontendPaths) {
			if (id.includes(frontendPath)) {
				// Extract a meaningful chunk name from the path
				const segments = frontendPath.split('/');
				const chunkName =
					segments[segments.length - 1] || 'frontend-chunk';
				return `${ASSET_FOLDERS.FRONTEND}/${chunkName}`;
			}
		}

		// Check if this module matches any configured editor chunk paths
		for (const editorPath of editorPaths) {
			if (id.includes(editorPath)) {
				// Extract a meaningful chunk name from the path
				const segments = editorPath.split('/');
				const chunkName =
					segments[segments.length - 1] || 'editor-chunk';
				return `${ASSET_FOLDERS.EDITOR}/${chunkName}`;
			}
		}

		// No explicit chunk configuration for this module
		return undefined;
	};
}

/**
 * Generate chunk file names for the build output
 * Simple naming: chunks go directly to their designated asset folders
 *
 * @param {Object} chunksConfig - Chunk configuration object
 * @returns {Function|string} Chunk file naming function or default pattern
 */
export function createChunkFileNames(
	chunksConfig = { frontend: [], editor: [] }
) {
	// Only use custom naming if chunking is enabled
	if (!isChunkingEnabled(chunksConfig)) {
		return '[name]-[hash].js'; // Default Vite naming
	}

	return (chunkInfo) => {
		// The chunk name already includes the asset folder from createManualChunks
		// e.g., "frontend-assets/utils" or "editor-assets/components"
		return `${chunkInfo.name}-[hash].js`;
	};
}
