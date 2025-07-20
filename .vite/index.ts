/**
 * External dependencies
 */
import { sep } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import type { PluginContext, OutputOptions } from 'rollup';
import type { ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import { sideload } from './src/sideload';
import { config } from './src/config.js';
import { generateBundle } from './src/generateBundle.js';
import { options, outputOptions } from './src/options/index.js';
import generatePlugins from './src/plugins.js';
import { transform } from './src/transform.js';
import { FILE_NAMES } from './constants.ts';
import { discoverBlocksWithMapping } from './src/discovery/discovery.js';

import type {
	PluginConfig,
	WordpressBlockJson,
	ChunkInfo,
	AssetInfo,
} from './types/index.js';

let _config: ResolvedConfig;

/**
 * Create a Vite plugin for Gutenberg blocks
 *
 * @param {PluginConfig} pluginConfig - Configuration options for the plugin
 * @returns {Array} Array of Vite plugins
 */
export const viteBlocks = (pluginConfig = {} as PluginConfig) => {
	const pwd = process.env.PWD || process.cwd();
	let outputDirectory: string;

	// Try to read the default block.json if it exists, otherwise use empty config
	let blockFile: WordpressBlockJson = {};

	const defaultBlockPath = `${pwd}/src/${FILE_NAMES.BLOCK_CONFIG}`;

	if (existsSync(defaultBlockPath)) {
		try {
			blockFile = JSON.parse(readFileSync(defaultBlockPath, 'utf-8'));
		} catch (error) {
			console.warn('Warning: Could not parse default block.json:', error);
		}
	}

	const {
		watch = ['./src/template.php', './src/render.php'],
		outDir = null,
		dependencies = [],
		pathMappings = {},
	} = pluginConfig;

	const regex = new RegExp(sep + '$');
	const normalisedOut =
		outDir && regex.test(outDir) === false ? outDir + sep : outDir;

	// Discover blocks from path mappings
	const discoveredBlocks =
		Object.keys(pathMappings).length > 0
			? discoverBlocksWithMapping(pathMappings, pwd)
			: [];

	return [
		{
			name: 'vite-plugin-gutenberg-blocks',
			config: () => config({ outDir: normalisedOut, blockFile }),
			configResolved(config: ResolvedConfig) {
				_config = config;
				outputDirectory = config.build.outDir;
			},
			options,
			outputOptions,
			buildStart: async function (this: PluginContext) {
				watch.forEach((file) => this.addWatchFile(file));

				// Process discovered blocks
				if (discoveredBlocks.length > 0) {
					for (const block of discoveredBlocks) {
						await sideload.call(
							this,
							block.blockJson,
							outputDirectory,
							block.path,
							block.name,
							block.outputPath // Pass custom output path if available
						);
					}
				} else {
					// Fallback to default behavior
					await sideload.call(this, blockFile, outputDirectory);
				}
			},

			transform: function (
				this: PluginContext,
				code: string,
				id: string
			) {
				// Use the first discovered block or fallback to default
				const targetBlock =
					discoveredBlocks.length > 0
						? discoveredBlocks[0].blockJson
						: blockFile;
				return transform.call(this, code, id, targetBlock, _config);
			},
			generateBundle: function (
				this: PluginContext,
				options: OutputOptions,
				bundle: { [fileName: string]: ChunkInfo | AssetInfo }
			) {
				generateBundle.call(this, options, bundle, dependencies);
			},
		},
		...generatePlugins({ outDir: normalisedOut, discoveredBlocks }),
	];
};
