import {
	isEditorFile,
	isWordPressEditorModule,
	isEditorRelatedChunk,
	isEditorUtilityChunk,
	isRootAssetChunk,
} from '../helpers.js';
import { CHUNK_PATTERNS } from '../../constants.js';

/**
 * Creates chunk file names configuration for Rollup with direct output logic
 * @param {string} outputDir - Main output directory for blocks
 * @param {string} editorOutputDir - Output directory for editor dependencies
 * @returns {Function} Chunk file names function for Rollup configuration
 */
export function createChunkFileNames(outputDir, editorOutputDir) {
	return (chunkInfo) => {
		// Store chunk destination info in the chunk name for later processing
		if (
			chunkInfo.name === CHUNK_PATTERNS.REACT_RUNTIME ||
			isRootAssetChunk(chunkInfo)
		) {
			// Mark as root chunk
			return `[name]${CHUNK_PATTERNS.ROOT_SUFFIX}.js`;
		}

		if (
			chunkInfo.name === CHUNK_PATTERNS.EDITOR_DEPENDENCIES ||
			chunkInfo.name === CHUNK_PATTERNS.WP_EDITOR ||
			isEditorRelatedChunk(chunkInfo) ||
			isEditorUtilityChunk(chunkInfo)
		) {
			// Mark as editor chunk
			return `[name]${CHUNK_PATTERNS.EDITOR_SUFFIX}.js`;
		}

		// Default to blocks directory
		return '[name].js';
	};
}
