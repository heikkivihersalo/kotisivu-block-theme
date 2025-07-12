import { createBlockInputs } from './scripts/blockDiscovery.js';
import {
	createExternalFunction,
	createGlobalsMapping,
} from './scripts/externals.js';
import {
	createManualChunks,
	createChunkFileNames,
} from './scripts/chunking.js';
import { createBundleGenerator } from './scripts/bundleGeneration.js';

/**
 * WordPress Gutenberg Blocks Vite Plugin
 *
 * This plugin scans for block.json files and creates appropriate build entries
 * for WordPress Gutenberg blocks with the correct file naming conventions.
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

			// Update Vite config
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
						chunkFileNames: createChunkFileNames(),
						manualChunks: createManualChunks(),
					},
					external: createExternalFunction(),
				},
			};
		},

		generateBundle: createBundleGenerator(blocksDir, copyBlockJson),
	};
}
