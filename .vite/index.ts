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
 * This plugin is designed exclusively for building multiple WordPress blocks
 * from organized directory structures using path mappings. Path mappings are
 * mandatory and the plugin will throw an error if they are not configured.
 * Single block builds are not supported.
 *
 * @param {PluginConfig} pluginConfig - Configuration options for the plugin (pathMappings required)
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

	// Require path mappings for multi-block builds
	if (!pathMappings || Object.keys(pathMappings).length === 0) {
		throw new Error(
			'pathMappings are required for multi-block builds. This plugin does not support single block builds.'
		);
	}

	const regex = new RegExp(sep + '$');
	const normalisedOut =
		outDir && regex.test(outDir) === false ? outDir + sep : outDir;

	// Discover blocks from path mappings (required)
	const discoveredBlocks = discoverBlocksWithMapping(pathMappings, pwd);

	if (discoveredBlocks.length === 0) {
		throw new Error(
			'No blocks discovered from pathMappings. Ensure pathMappings are configured correctly and point to directories containing block.json files.'
		);
	}

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
			},

			transform: function (
				this: PluginContext,
				code: string,
				id: string
			) {
				// Multi-block builds only - use the first discovered block for transform context
				const targetBlock = discoveredBlocks[0].blockJson;
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
		...generatePlugins({ discoveredBlocks }),
	];
};
