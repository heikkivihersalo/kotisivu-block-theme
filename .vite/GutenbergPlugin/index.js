import { createBlockInputs } from './config/input.js';
import {
	createExternalFunction,
	createGlobalsMapping,
} from './config/externals.js';
import {
	createManualChunks,
	getFrontendOnlyChunkNames,
} from './config/chunks.js';
import { createBundleGenerator } from './processors/bundle.js';
import { splitEditorCSS } from './processors/css.js';
import { ASSET_FOLDERS } from './config/constants.js';

/**
 * WordPress Gutenberg Blocks Vite Plugin
 *
 * This plugin scans for block.json files and creates appropriate build entries
 * for WordPress Gutenberg blocks with the correct file naming conventions.
 *
 * Supports multiple input directories with organized output structure.
 *
 * @param {Object} options - Plugin configuration options
 * @param {Object} options.input - Input directories mapping (required)
 * @param {string} options.output - Output directory (default: 'build/blocks')
 * @param {Object} options.chunks - Chunk organization configuration
 * @param {string[]} options.chunks.frontend - Array of folder paths for frontend-only chunks
 * @param {string[]} options.chunks.editor - Array of folder paths for editor-only chunks
 */
export default function gutenbergBlocksPlugin(options = {}) {
	const {
		input,
		output = 'build/blocks',
		chunks = { frontend: [], editor: [] },
	} = options;

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
							// Frontend styles (style-index.css) stay in their block directories
							if (
								assetInfo.name &&
								assetInfo.name.endsWith('style-index.css')
							) {
								return '[name].[ext]';
							}

							// Block-specific editor styles (editor-styles.css) should go to block directories as index.css
							// These will be processed by the CSS processor to rename and move them
							if (
								assetInfo.name &&
								assetInfo.name.endsWith('editor-styles.css')
							) {
								return '[name].[ext]';
							}

							// Direct index.css files (CSS-only blocks) stay in their block directories
							if (
								assetInfo.name &&
								assetInfo.name.endsWith('index.css')
							) {
								return '[name].[ext]';
							}

							// All other assets (shared JS dependencies, etc.) go to editor-assets
							return `${ASSET_FOLDERS.EDITOR}/[name].[ext]`;
						},
						chunkFileNames: (chunkInfo) => {
							// Get frontend-only package chunks from package.json
							const frontendOnlyPackageChunks =
								getFrontendOnlyChunkNames();

							// Check if this chunk is a frontend-only package
							if (
								frontendOnlyPackageChunks.includes(
									chunkInfo.name
								)
							) {
								return `${ASSET_FOLDERS.FRONTEND}/[name].js`;
							}

							// Check if this chunk matches any frontend folder paths
							const isFrontendChunk = chunks.frontend.some(
								(folderPath) =>
									chunkInfo.moduleIds?.some((moduleId) =>
										moduleId.includes(folderPath)
									)
							);

							if (isFrontendChunk) {
								return `${ASSET_FOLDERS.FRONTEND}/[name].js`;
							}

							// Check if this chunk matches any editor folder paths
							const isEditorChunk = chunks.editor.some(
								(folderPath) =>
									chunkInfo.moduleIds?.some((moduleId) =>
										moduleId.includes(folderPath)
									)
							);

							if (isEditorChunk) {
								return `${ASSET_FOLDERS.EDITOR}/[name].js`;
							}

							// All other chunks go to editor-assets by default
							return `${ASSET_FOLDERS.EDITOR}/[name].js`;
						},
						format: 'es',
						globals: createGlobalsMapping(),
						manualChunks: createManualChunks(),
					},
					external: createExternalFunction(),
				},
			};
		},

		generateBundle: createBundleGenerator(inputDirs),

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
