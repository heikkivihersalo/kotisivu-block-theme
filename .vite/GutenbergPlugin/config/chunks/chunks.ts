/**
 * Internal dependencies
 */
import {
	getChunkNameForPaths,
	getSharedResourceChunk,
	isChunkingEnabled,
} from './utils.js';
import type { ChunkConfig } from '../../types/lib/plugin.js';
import type {
	ManualChunksFunction,
	ChunkFileNamingInfo,
	ChunkFileNamesFunction,
} from '../../types/lib/vite.js';

/**
 * Create manual chunks configuration for Rollup
 * This function implements organized chunking logic:
 * - When no chunking is configured: all shared deps go to assets/common
 * - When chunking is configured: only paths that match configured arrays get chunked to their respective assets folder
 * - Unconfigured dependencies go to assets/common as fallback
 *
 * @param chunksConfig - Chunk configuration object with frontend, editor, and common arrays
 * @returns Manual chunks function for Rollup
 */
export function createManualChunks(
	chunksConfig: ChunkConfig = { frontend: [], editor: [], common: [] }
): ManualChunksFunction {
	const frontendPaths = chunksConfig.frontend || [];
	const editorPaths = chunksConfig.editor || [];
	const commonPaths = chunksConfig.common || [];
	const isExplicitChunkingEnabled = isChunkingEnabled(chunksConfig);

	return (id: string): string | undefined => {
		// Skip WordPress externals (these shouldn't be bundled at all)
		if (id.startsWith('@wordpress')) {
			return undefined;
		}

		// When explicit chunking is enabled, check specific paths first
		if (isExplicitChunkingEnabled) {
			// Check configured paths in order: frontend, editor, common
			const frontendChunk = getChunkNameForPaths(
				id,
				frontendPaths,
				'frontend'
			);
			if (frontendChunk) return frontendChunk;

			const editorChunk = getChunkNameForPaths(id, editorPaths, 'editor');
			if (editorChunk) return editorChunk;

			const commonChunk = getChunkNameForPaths(id, commonPaths, 'common');
			if (commonChunk) return commonChunk;
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
				// Use helper function for shared resource chunking
				return getSharedResourceChunk(id, isExplicitChunkingEnabled, {
					frontend: frontendPaths,
					editor: editorPaths,
					common: commonPaths,
				});
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
 * Uses clean names without hashes since versioning is handled by asset.php files
 *
 * @param chunksConfig - Chunk configuration object
 * @returns Chunk file naming function
 */
export function createChunkFileNames(
	_chunksConfig: ChunkConfig = { frontend: [], editor: [], common: [] }
): ChunkFileNamesFunction {
	return (chunkInfo: ChunkFileNamingInfo): string => {
		// The chunk name already includes the assets subfolder from createManualChunks
		// e.g., "assets/frontend/utils", "assets/editor/components", "assets/common/shared"
		// Use clean names without hashes - versioning is handled by asset.php files
		return `${chunkInfo.name}.js`;
	};
}
