import {
	createBlockInputs,
	createExternalFunction,
	createGlobalsMapping,
	createManualChunks,
	createChunkFileNames,
	createBundleGenerator,
	createDirectOutputOrganizer,
} from './index.js';

/**
 * WordPress Gutenberg Blocks Vite Plugin
 *
 * This plugin scans for block.json files and creates appropriate build entries
 * for WordPress Gutenberg blocks with the correct file naming conventions.
 *
 * Uses a custom approach to output files directly to the correct folders
 * without requiring post-build moves.
 */
export default function gutenbergBlocksPlugin(options = {}) {
	const {
		blocksDir = 'resources/widgets/block-library',
		outputDir = 'blocks',
		editorOutputDir = 'editor',
		copyBlockJson = true,
	} = options;

	return {
		name: 'gutenberg-blocks',
		config(config) {
			// Create build entries for each block
			const input = createBlockInputs(blocksDir);

			// Update Vite config with direct output configuration
			config.build = {
				...config.build,
				rollupOptions: {
					input,
					output: {
						dir: outputDir,
						entryFileNames: '[name].js',
						assetFileNames: '[name].[ext]',
						format: 'es',
						globals: createGlobalsMapping(),
						chunkFileNames: createChunkFileNames(
							outputDir,
							editorOutputDir
						),
						manualChunks: createManualChunks(),
					},
					external: createExternalFunction(),
				},
			};
		},

		generateBundle: createBundleGenerator(blocksDir, copyBlockJson),

		writeBundle: createDirectOutputOrganizer(outputDir, editorOutputDir),
	};
}
