import type { PluginContext, OutputOptions } from 'rollup';
import type { ResolvedConfig } from 'vite';

import { sep } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { sideload } from './src/buildStart.js';
import { config } from './src/config.js';
import {
	generateBundle,
	type ChunkInfo,
	type AssetInfo,
} from './src/generateBundle.js';
import { options } from './src/options.js';
import { outputOptions } from './src/outputOptions.js';
import generatePlugins from './src/plugins.js';
import { transform, type WordpressBlockJson } from './src/transform.js';
import {
	discoverBlocks,
	discoverBlocksWithMapping,
} from './src/blockDiscovery.js';

interface PluginConfig {
	watch?: string[];
	outDir?: string;
	dependencies?: string[];
	blockFolders?: string[];
	// New path mapping support
	pathMappings?: Record<string, string>;
}

let _config: ResolvedConfig;

export const createViteBlock = (pluginConfig = {} as PluginConfig) => {
	const pwd = process.env.PWD || process.cwd();
	let outputDirectory: string;

	// Try to read the default block.json if it exists, otherwise use empty config
	let blockFile: WordpressBlockJson = {};
	const defaultBlockPath = `${pwd}/src/block.json`;
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
		blockFolders = [],
		pathMappings = {},
	} = pluginConfig;

	const regex = new RegExp(sep + '$');
	const normalisedOut =
		outDir && regex.test(outDir) === false ? outDir + sep : outDir;

	// Discover blocks from specified folders or path mappings
	const discoveredBlocks =
		Object.keys(pathMappings).length > 0
			? discoverBlocksWithMapping(pathMappings, pwd)
			: blockFolders.length > 0
				? discoverBlocks(blockFolders, pwd)
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
					console.log(
						`Found ${discoveredBlocks.length} blocks to process:`
					);
					for (const block of discoveredBlocks) {
						console.log(`- ${block.name} at ${block.path}`);
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
