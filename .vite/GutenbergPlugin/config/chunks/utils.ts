import type { ChunkConfig } from '../../types.js';

/**
 * Extract chunk name from path
 * @param path - Path to extract name from
 * @param fallback - Fallback chunk name
 * @returns Extracted chunk name
 */
export function extractChunkName(path: string, fallback: string): string {
	const segments = path.split('/');
	return segments[segments.length - 1] || fallback;
}

/**
 * Get chunk name for shared resources based on path
 * @param id - Module ID
 * @param useContextSpecificChunks - Whether to use context-specific chunks
 * @returns Chunk name or undefined
 */
export function getSharedResourceChunk(
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

export function getChunkNameForPaths(
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
export function isChunkingEnabled(
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
