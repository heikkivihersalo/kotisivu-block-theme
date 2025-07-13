import {
	createBlockInputs,
	createExternalFunction,
	createGlobalsMapping,
	createManualChunks,
	createBundleGenerator,
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
	const { input, output = 'build/blocks', copyBlockJson = true } = options;

	// Determine configuration format and set up directories
	let inputDirs, baseOutputDir;

	if (input && typeof input === 'object') {
		inputDirs = input;
		baseOutputDir = output;
	} else {
		throw new Error(
			'Input configuration is required and must be an object'
		);
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
						entryFileNames: '[name].js',
						assetFileNames: (assetInfo) => {
							// Only put editor-related assets in editor-assets folder
							// Frontend styles (style-index.css) should stay in their block directories
							if (
								assetInfo.name &&
								assetInfo.name.endsWith('style-index.css')
							) {
								return '[name].[ext]';
							}
							// All other assets (editor CSS, shared JS dependencies) go to editor-assets
							return 'editor-assets/[name].[ext]';
						},
						chunkFileNames: 'editor-assets/[name].js',
						format: 'es',
						globals: createGlobalsMapping(),
						manualChunks: createManualChunks(),
					},
					external: createExternalFunction(),
				},
			};
		},

		generateBundle: createBundleGenerator(inputDirs, copyBlockJson),

		writeBundle: {
			sequential: true,
			async handler(options, bundle) {
				// Split the consolidated editor CSS into individual block-specific files
				// Use the same output directory calculation as in config
				const outputDirForCSS =
					Object.keys(inputDirs).length > 1
						? baseOutputDir
						: Object.keys(inputDirs)[0]
							? `${baseOutputDir}/${Object.keys(inputDirs)[0]}`
							: baseOutputDir;

				await splitEditorCSS.call(
					this,
					options,
					bundle,
					outputDirForCSS
				);
			},
		},
	};
}
