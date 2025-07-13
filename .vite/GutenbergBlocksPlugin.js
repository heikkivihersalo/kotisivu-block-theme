import {
	createBlockInputs,
	createExternalFunction,
	createGlobalsMapping,
	createManualChunks,
	createChunkFileNames,
	createBundleGenerator,
	createDirectOutputOrganizer,
	splitEditorCSS,
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
				cssCodeSplit: true, // Enable CSS code splitting per entry
				rollupOptions: {
					input: allInputs,
					output: {
						dir: finalOutputDir,
						entryFileNames: '[name].js',					assetFileNames: (assetInfo) => {
						// Handle CSS files from edit entries and index-css entries
						if (assetInfo.name && assetInfo.name.endsWith('.css')) {
							// Check if this is CSS from an edit entry that should be renamed to index.css
							if (assetInfo.name.includes('/edit.css')) {
								return assetInfo.name.replace('/edit.css', '/index.css');
							}
							// Check if this is an index-css file that should be renamed to index.css
							if (assetInfo.name.includes('/index-css.css')) {
								return assetInfo.name.replace('/index-css.css', '/index.css');
							}
						}
						return '[name].[ext]';
					},
						format: 'es',
						globals: createGlobalsMapping(),
						chunkFileNames: createChunkFileNames(
							finalOutputDir,
							editorDir
						),
						manualChunks: createManualChunks(),
						// Force chunk creation even for small modules
						experimentalMinChunkSize: 0,
					},
					external: createExternalFunction(),
				},
			};
		},

		generateBundle: createBundleGenerator(inputDirs, copyBlockJson),

		writeBundle: {
			sequential: true,
			async handler(options, bundle) {
				// First, handle direct output organization (move editor files, etc.)
				const directOutputOrganizer = createDirectOutputOrganizer(
					baseOutputDir,
					editorDir,
					inputDirs
				);
				await directOutputOrganizer.call(this, options, bundle);
				
				// Then, split the consolidated editor CSS into individual block files
				// Use the same output directory calculation as in config
				const outputDirForCSS = Object.keys(inputDirs).length > 1
					? baseOutputDir
					: Object.keys(inputDirs)[0]
						? `${baseOutputDir}/${Object.keys(inputDirs)[0]}`
						: baseOutputDir;
				
				await splitEditorCSS.call(this, options, bundle, outputDirForCSS);
			}
		},
	};
}
