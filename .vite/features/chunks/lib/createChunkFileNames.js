import {
	isEditorFile,
	isWordPressEditorModule,
	isEditorRelatedChunk,
	isEditorUtilityChunk,
	isRootAssetChunk,
} from '../helpers.js';

/**
 * Creates chunk file names configuration for Rollup with direct output logic
 * @param {string} outputDir - Main output directory for blocks
 * @param {string} editorOutputDir - Output directory for editor dependencies
 * @returns {Function} Chunk file names function for Rollup configuration
 */
export function createChunkFileNames(outputDir, editorOutputDir) {
	return (chunkInfo) => {
		// Store chunk destination info in the chunk name for later processing
		if (chunkInfo.name === 'react-runtime' || isRootAssetChunk(chunkInfo)) {
			// Mark as root chunk
			return '[name]__ROOT__.js';
		}

		if (
			chunkInfo.name === 'editor-dependencies' ||
			chunkInfo.name === 'wp-editor' ||
			isEditorRelatedChunk(chunkInfo) ||
			isEditorUtilityChunk(chunkInfo)
		) {
			// Mark as editor chunk
			return '[name]__EDITOR__.js';
		}

		// Default to blocks directory
		return '[name].js';
	};
}
