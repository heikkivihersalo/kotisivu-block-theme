import type { PluginContext, InputOptions, OutputOptions } from 'rollup';
import type { ResolvedConfig } from 'vite';

import { sep } from 'node:path';
import { readFileSync } from 'node:fs';
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

interface PluginConfig {
	watch?: string[];
	outDir?: string;
	dependencies?: string[];
}

let _config: ResolvedConfig;

export const createViteBlock = (pluginConfig = {} as PluginConfig) => {
	const pwd = process.env.PWD;
	let rootDirectory: string;
	let outputDirectory: string;
	const blockFile: WordpressBlockJson = JSON.parse(
		readFileSync(`${pwd}/src/block.json`, 'utf-8')
	);

	const {
		watch = ['./src/template.php', './src/render.php'],
		outDir = null,
		dependencies = [],
	} = pluginConfig;

	const regex = new RegExp(sep + '$');
	const normalisedOut =
		regex.test(outDir) === false && outDir ? outDir + sep : outDir;

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
			buildStart: async function (
				this: PluginContext,
				options: InputOptions
			) {
				rootDirectory = options.input[0].substring(
					0,
					options.input[0].lastIndexOf('/')
				);
				watch.forEach((file) => this.addWatchFile(file));

				await sideload.call(this, blockFile, outputDirectory);
			},

			transform: function (code: string, id: string) {
				transform.call(this, code, id, blockFile, _config);
			},
			generateBundle: function (
				options: OutputOptions,
				bundle: { [fileName: string]: ChunkInfo | AssetInfo }
			) {
				generateBundle.call(this, options, bundle, dependencies);
			},
		},
		...generatePlugins({ outDir: normalisedOut }),
	];
};
