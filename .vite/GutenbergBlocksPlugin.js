import {
	createBlockInputs,
	createExternalFunction,
	createGlobalsMapping,
	createManualChunks,
	createChunkFileNames,
	createBundleGenerator,
	createDirectOutputOrganizer,
} from './utils/index.js';

/**
 * WordPress Gutenberg Blocks Vite Plugin
 *
 * This plugin scans for block.json files and creates appropriate build entries
 * for WordPress Gutenberg blocks with the correct file naming conventions.
 *
 * Supports multiple input directories with organized output structure.
 */
export default function gutenbergBlocksPlugin(options = {}) {
	// Support both old and new configuration formats
	const {
		// New multi-input format
		input,
		output = 'build/blocks',
		dependencies = {},
		// Legacy format (for backward compatibility)
		blocksDir,
		outputDir,
		editorOutputDir,
		copyBlockJson = true,
	} = options;

	// Determine configuration format and set up directories
	let inputDirs, baseOutputDir, editorDir;

	if (input && typeof input === 'object') {
		// New multi-input format
		inputDirs = input;
		baseOutputDir = output;
		editorDir =
			dependencies.editorOutput || `${output.split('/')[0]}/editor`; // Use dependencies.editorOutput or fallback
	} else {
		// Legacy format - maintain backward compatibility
		inputDirs = { '': blocksDir || 'resources/widgets/block-library' };
		baseOutputDir = outputDir || 'blocks';
		editorDir = editorOutputDir || 'editor';
	}

	return {
		name: 'gutenberg-blocks',
		config(config) {
			// Create build entries for all input directories
			const allInputs = {};

			for (const [outputSubDir, inputDir] of Object.entries(inputDirs)) {
				const inputs = createBlockInputs(inputDir, outputSubDir);
				Object.assign(allInputs, inputs);
			}

			// Calculate final output directory
			const finalOutputDir =
				Object.keys(inputDirs).length > 1
					? baseOutputDir
					: Object.keys(inputDirs)[0]
						? `${baseOutputDir}/${Object.keys(inputDirs)[0]}`
						: baseOutputDir;

			// Update Vite config with direct output configuration
			config.build = {
				...config.build,
				rollupOptions: {
					input: allInputs,
					output: {
						dir: finalOutputDir,
						entryFileNames: '[name].js',
						assetFileNames: '[name].[ext]',
						format: 'es',
						globals: createGlobalsMapping(),
						chunkFileNames: createChunkFileNames(
							finalOutputDir,
							editorDir
						),
						manualChunks: createManualChunks(),
					},
					external: createExternalFunction(),
				},
			};
		},

		generateBundle: createBundleGenerator(inputDirs, copyBlockJson),

		writeBundle: createDirectOutputOrganizer(
			baseOutputDir,
			editorDir,
			inputDirs
		),
	};
}
