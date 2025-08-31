/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/**
 * Shared dependencies
 */
import { FilePathResolver } from '../../common/services/FilePathResolver';
import type { DiscoveredAsset } from '../../common/types';

/**
 * Internal dependencies
 */
import { AssetHandler } from './AssetHandler';
import { discoverAssetsWithMapping } from './discovery';

/**
 * Vite plugin for handling WordPress assets
 *
 * This plugin is responsible for:
 * - Discovering assets from configured directories
 * - Sideloading asset entry points
 */
export function AssetsPlugin(): Plugin {
	let outputDirectory: string;
	let discoveredAssets: DiscoveredAsset[] = [];
	let configPluginApi: any = null;
	const pwd = process.env.PWD || process.cwd();

	return {
		name: 'vite-plugin-gutenberg-assets',

		// Store reference to config plugin API
		configResolved(resolvedConfig: ResolvedConfig) {
			// Find the ConfigPlugin in the resolved plugins
			const configPlugin = resolvedConfig.plugins.find(
				(plugin: any) => plugin.name === 'vite-plugin-gutenberg-config'
			);

			if (!configPlugin?.api) {
				throw new Error(
					'AssetsPlugin requires ConfigPlugin to be loaded first'
				);
			}

			configPluginApi = configPlugin.api;
			const config = configPluginApi.getResolvedConfig();
			if (!config) {
				throw new Error(
					'ConfigPlugin has not resolved configuration yet'
				);
			}

			const {
				build: { outDir } = {},
			} = config;

			if (typeof outDir === 'string') {
				outputDirectory =
					FilePathResolver.normalizePath(outDir) || 'dist';
			} else {
				outputDirectory = resolvedConfig.build.outDir || 'dist';
			}
		},

		// Only apply this plugin if assets are discovered
		apply: () => {
			// This will be checked during buildStart when we have access to config
			return true;
		},

		buildStart: async function (this: PluginContext) {
			if (!configPluginApi) {
				throw new Error('AssetsPlugin requires ConfigPlugin API');
			}

			const config = configPluginApi.getResolvedConfig();
			if (!config) {
				throw new Error(
					'ConfigPlugin has not resolved configuration yet'
				);
			}

			const assetsDir = config.paths?.assetsDir;
			if (!assetsDir || Object.keys(assetsDir).length === 0) {
				return; // Skip if no assets configured
			}

			// Discover assets from asset paths
			discoveredAssets = discoverAssetsWithMapping(assetsDir, pwd);

			if (discoveredAssets.length === 0) {
				return; // Skip if no assets found
			}

			const {
				build: { sourcemap = false } = {},
				wordpress: { dependencies = [] } = {},
			} = config;

			// Default WordPress dependencies that should always be externalized
			const allDependencies = ['react', 'react-dom', ...dependencies];

			// Create Asset handler instance
			const assetHandler = new AssetHandler({
				context: this,
				outputDirectory,
				dependencies: allDependencies,
			});

			for (const asset of discoveredAssets) {
				try {
					const jsOutputPath = resolve(`${asset.outputPath}.js`);
					mkdirSync(dirname(jsOutputPath), { recursive: true });
					await assetHandler.processAsset(asset, sourcemap);
				} catch {
					// Skip assets that can't be processed
					continue;
				}
			}
		},
	};
}
