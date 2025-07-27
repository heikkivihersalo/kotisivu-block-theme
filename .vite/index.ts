/**
 * External dependencies
 */
import type { PluginContext, OutputOptions } from 'rollup';
import type { ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import { sideloadBlocks, sideloadAssets } from './src/sideload';
import { config } from './src/config';
import { generateBundle } from './src/bundle';
import { generateBlockManifest } from './src/manifest';
import { options, outputOptions } from './src/options';
import generatePlugins from './src/plugins';
import { transform } from './src/transform';
import {
	discoverBlocksWithMapping,
	discoverAssetsWithMapping,
} from './src/discovery';
import { normalizePath } from './src/common';

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
export const wp = (pluginConfig = {} as PluginConfig) => {
	const {
		dependencies = [],
		terserOptions = {},
		build: {
			outDir = null,
			assetsDir = {},
			blocksDir = {},
			watch = [],
			minify = true,
			sourcemap = false,
		} = {},
	} = pluginConfig;

	// Default WordPress dependencies that should always be externalized
	const defaultDependencies = ['react', 'react-dom'];

	// Merge default dependencies with user-provided dependencies (avoiding duplicates)
	const allDependencies = [
		...defaultDependencies,
		...dependencies.filter((dep) => !defaultDependencies.includes(dep)),
	];

	// Default aggressive Terser configuration optimized for WordPress
	const defaultTerserOptions = {
		compress: {
			drop_console: true,
			drop_debugger: true,
			pure_funcs: [
				'console.log',
				'console.info',
				'console.debug',
				'console.warn',
			],
			passes: 2,
		},
		mangle: {
			properties: false,
		},
		format: {
			comments: false,
			beautify: false,
			semicolons: true,
		},
	};

	// Deep merge user terserOptions with defaults
	const mergedTerserOptions = {
		compress: {
			...defaultTerserOptions.compress,
			...terserOptions.compress,
		},
		mangle: { ...defaultTerserOptions.mangle, ...terserOptions.mangle },
		format: {
			...defaultTerserOptions.format,
			...terserOptions.format,
			...terserOptions.output, // Support legacy 'output' option
		},
	};

	const pwd = process.env.PWD || process.cwd();
	let outputDirectory: string;

	// Require block paths for multi-block builds
	if (!blocksDir || Object.keys(blocksDir).length === 0) {
		throw new Error(
			'build.blocksDir are required for multi-block builds. This plugin does not support single block builds.'
		);
	}

	// Discover blocks from block paths (required)
	const discoveredBlocks = discoverBlocksWithMapping(blocksDir, pwd);

	if (discoveredBlocks.length === 0) {
		throw new Error(
			'No blocks discovered from build.blocksDir. Ensure blocksDir are configured correctly and point to directories containing block.json files.'
		);
	}

	// Discover assets from asset paths (optional)
	const discoveredAssets = discoverAssetsWithMapping(assetsDir, pwd);

	return [
		{
			name: 'vite-plugin-gutenberg-multi-blocks',
			config: () =>
				config({
					outDir: normalizePath(outDir),
					minify,
					terserOptions: mergedTerserOptions,
					sourcemap,
				}),
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
					await sideloadBlocks.call(
						this,
						block.blockJson,
						outputDirectory,
						block.path,
						block.name,
						block.outputPath, // Pass custom output path if available
						sourcemap // Pass sourcemap configuration
					);
				}

				// Process discovered assets (if any)
				if (discoveredAssets.length > 0) {
					await sideloadAssets.call(
						this,
						discoveredAssets,
						outputDirectory,
						allDependencies,
						sourcemap // Pass sourcemap configuration
					);
				}

				// Generate block manifest from discovered blocks
				generateBlockManifest.call(
					this,
					discoveredBlocks,
					outputDirectory
				);
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
				generateBundle.call(this, options, bundle, allDependencies);
			},
		},
		...generatePlugins({ discoveredBlocks }),
	];
};
