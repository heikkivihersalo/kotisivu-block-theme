import type { ChunkConfig } from '../types.js';

// Types for Rollup's chunk info
type ChunkInfo = {
	name: string;
	[key: string]: any;
};

type ManualChunksFunction = (id: string) => string | undefined;
type ChunkFileNamesFunction = (chunkInfo: ChunkInfo) => string;

/**
 * Extract chunk name from path
 * @param path - Path to extract name from
 * @param fallback - Fallback chunk name
 * @returns Extracted chunk name
 */
function extractChunkName(path: string, fallback: string): string {
	const segments = path.split('/');
	return segments[segments.length - 1] || fallback;
}

/**
 * Get chunk name for shared resources based on path
 * @param id - Module ID
 * @param useContextSpecificChunks - Whether to use context-specific chunks
 * @returns Chunk name or undefined
 */
function getSharedResourceChunk(
	id: string,
	useContextSpecificChunks: boolean
): string | undefined {
	const resourceMap = {
		'/components/': useContextSpecificChunks
			? 'assets/editor/components'
			: 'assets/common/components',
		'/utils/': useContextSpecificChunks
			? 'assets/frontend/utils'
			: 'assets/common/utils',
		'/hooks/': 'assets/common/hooks',
		'/constants/': 'assets/common/constants',
	};

	for (const [path, chunkName] of Object.entries(resourceMap)) {
		if (id.includes(path)) {
			return chunkName;
		}
	}
	return undefined;
}
function getChunkNameForPaths(
	id: string,
	paths: string[],
	assetType: string
): string | undefined {
	for (const path of paths) {
		if (id.includes(path)) {
			const chunkName = extractChunkName(path, `${assetType}-chunk`);
			return `assets/${assetType}/${chunkName}`;
		}
	}
	return undefined;
}

/**
 * Check if chunking should be enabled based on configuration
 * @param chunksConfig - Chunk configuration object
 * @returns Whether chunking is enabled
 */
function isChunkingEnabled(
	chunksConfig: ChunkConfig = { frontend: [], editor: [], common: [] }
): boolean {
	// Check if any chunk paths are explicitly defined
	const hasFrontendChunks =
		Array.isArray(chunksConfig.frontend) &&
		chunksConfig.frontend.length > 0;
	const hasEditorChunks =
		Array.isArray(chunksConfig.editor) && chunksConfig.editor.length > 0;
	const hasCommonChunks =
		Array.isArray(chunksConfig.common) && chunksConfig.common.length > 0;

	return hasFrontendChunks || hasEditorChunks || hasCommonChunks;
}

/**
 * Create manual chunks configuration for Rollup
 * This function implements organized chunking logic:
 * - When no chunking is configured: all shared deps go to assets/common
 * - When chunking is configured: specific paths go to assets/frontend, assets/editor, or assets/common
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
				return getSharedResourceChunk(id, isExplicitChunkingEnabled);
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
 * @param chunksConfig - Chunk configuration object
 * @returns Chunk file naming function
 */
export function createChunkFileNames(
	_chunksConfig: ChunkConfig = { frontend: [], editor: [], common: [] }
): ChunkFileNamesFunction {
	return (chunkInfo: ChunkInfo): string => {
		// The chunk name already includes the assets subfolder from createManualChunks
		// e.g., "assets/frontend/utils", "assets/editor/components", "assets/common/shared"
		return `${chunkInfo.name}-[hash].js`;
	};
}
