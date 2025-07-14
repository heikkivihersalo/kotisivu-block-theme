import { createBlockInputs } from './config/input.js';
import {
	createExternalFunction,
	createGlobalsMapping,
} from './config/externals.js';
import { createManualChunks, createChunkFileNames } from './config/chunks.js';
import { createBundleGenerator } from './processors/bundle.js';
import { splitEditorCSS } from './processors/css.js';
import { ASSET_FOLDERS } from './config/constants.js';
import type {
	PluginOptions,
	ChunkConfig,
	AssetInfo,
	ChunkInfo,
} from './types.js';

// Vite plugin types
type ViteConfig = {
	build?: {
		cssCodeSplit?: boolean;
		rollupOptions?: {
			input?: Record<string, string>;
			output?: any;
			external?: (id: string) => boolean;
		};
	};
};

type VitePlugin = {
	name: string;
	config: (config: ViteConfig) => void;
	generateBundle: any;
	writeBundle: {
		sequential: boolean;
		handler: (
			options: any,
			bundle: Record<string, AssetInfo | ChunkInfo>
		) => Promise<void>;
	};
};

/**
 * WordPress Gutenberg Blocks Vite Plugin
 *
 * This plugin scans for block.json files and creates appropriate build entries
 * for WordPress Gutenberg blocks with the correct file naming conventions.
 *
 * Supports multiple input directories with organized output structure.
 *
 * @param options - Plugin configuration options
 * @param options.input - Input directories mapping (required)
 * @param options.output - Output directory (default: 'build/blocks')
 * @param options.chunks - Chunk organization configuration
 * @param options.chunks.frontend - Array of folder paths for frontend-only chunks
 * @param options.chunks.editor - Array of folder paths for editor-only chunks
 * @param options.chunks.common - Array of folder paths for common chunks
 */
export default function gutenbergBlocksPlugin(
	options: PluginOptions
): VitePlugin {
	const {
		input,
		output = 'build/blocks',
		chunks = { frontend: [], editor: [], common: [] },
	} = options;

	// Determine configuration format and set up directories
	let inputDirs: Record<string, string>;
	let baseOutputDir: string;

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
		config(config: ViteConfig): void {
			// Create build entries for all input directories
			const allInputs: Record<string, string> = {};

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
			const rollupOutput = {
				dir: finalOutputDir,
				entryFileNames: '[name].js',
				assetFileNames: (assetInfo: AssetInfo): string => {
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

					// Only move non-chunk assets to assets/common if needed
					// Chunk files are handled by chunkFileNames
					return '[name].[ext]';
				},
				chunkFileNames: createChunkFileNames(chunks),
				format: 'es' as const,
				globals: createGlobalsMapping(),
				manualChunks: createManualChunks(chunks),
			};

			config.build = {
				...config.build,
				cssCodeSplit: true, // Enable CSS code splitting per entry
				rollupOptions: {
					input: allInputs,
					output: rollupOutput,
					external: createExternalFunction(),
				},
			};
		},

		generateBundle: createBundleGenerator(inputDirs),

		writeBundle: {
			sequential: true,
			async handler(
				options: any,
				bundle: Record<string, AssetInfo | ChunkInfo>
			): Promise<void> {
				// Split the consolidated editor CSS into individual block-specific files
				// Use the same output directory calculation as in config
				const outputDirForCSS =
					Object.keys(inputDirs).length > 1
						? baseOutputDir
						: Object.keys(inputDirs)[0]
							? `${baseOutputDir}/${Object.keys(inputDirs)[0]}`
							: baseOutputDir;

				await splitEditorCSS(options, bundle, outputDirForCSS);
			},
		},
	};
}
