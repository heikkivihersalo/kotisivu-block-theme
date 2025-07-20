/**
 * External dependencies
 */
import { sep } from 'node:path';
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
import { discoverBlocksWithMapping } from './src/discovery/discovery.js';

import type { PluginConfig, ChunkInfo, AssetInfo } from './types/index.js';

let _config: ResolvedConfig;

/**
 * Create a Vite plugin for multi-block Gutenberg builds
 *
 * This plugin is designed specifically for building multiple WordPress blocks
 * from organized directory structures using path mappings. It discovers blocks
 * automatically and processes them individually.
 *
 * @param {PluginConfig} pluginConfig - Configuration options for the plugin
 * @returns {Array} Array of Vite plugins
 */
export const viteBlocks = (pluginConfig = {} as PluginConfig) => {
	const pwd = process.env.PWD || process.cwd();
	let outputDirectory: string;

	const {
		watch = [],
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
			name: 'vite-plugin-gutenberg-multi-blocks',
			config: () => config({ outDir: normalisedOut }),
			configResolved(config: ResolvedConfig) {
				_config = config;
				outputDirectory = config.build.outDir;
			},
			options,
			outputOptions,
			buildStart: async function (this: PluginContext) {
				watch.forEach((file) => this.addWatchFile(file));

				// Process discovered blocks (multi-block builds only)
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
					console.warn(
						'No blocks discovered. Ensure pathMappings are configured correctly.'
					);
				}
			},

			transform: function (
				this: PluginContext,
				code: string,
				id: string
			) {
				// Use the first discovered block for transform context
				const targetBlock =
					discoveredBlocks.length > 0
						? discoveredBlocks[0].blockJson
						: {};
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
