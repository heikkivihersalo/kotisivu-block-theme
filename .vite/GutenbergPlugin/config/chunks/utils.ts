/**
 * Internal dependencies
 */
import type { ChunkConfig } from '../../types/lib/plugin.js';

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
 * Get chunk name for shared resources based on path and configuration
 * @param id - Module ID
 * @param useContextSpecificChunks - Whether to use context-specific chunks
 * @param chunksConfig - Chunk configuration to determine what goes where
 * @returns Chunk name or undefined
 */
export function getSharedResourceChunk(
	id: string,
	useContextSpecificChunks: boolean,
	chunksConfig?: { frontend: string[]; editor: string[]; common: string[] }
): string | undefined {
	// If no explicit chunking is enabled, everything goes to common
	if (!useContextSpecificChunks || !chunksConfig) {
		const resourceMap = {
			'/components/': 'assets/common/components',
			'/utils/': 'assets/common/utils',
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

	// When explicit chunking is enabled, determine placement based on what's configured
	// Check if the resource type matches any configured paths
	if (id.includes('/components/')) {
		// Check if any editor paths are configured (components usually go to editor)
		if (chunksConfig.editor.length > 0) {
			return 'assets/editor/components';
		}
		// Fall back to common if no editor chunks configured
		return 'assets/common/components';
	}

	if (id.includes('/utils/')) {
		// Check if any frontend paths are configured (utils usually go to frontend)
		if (chunksConfig.frontend.length > 0) {
			return 'assets/frontend/utils';
		}
		// Fall back to common if no frontend chunks configured
		return 'assets/common/utils';
	}

	if (id.includes('/hooks/')) {
		return 'assets/common/hooks';
	}

	if (id.includes('/constants/')) {
		return 'assets/common/constants';
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
