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
import type { AssetsPluginConfig } from '../../common/types/plugins.ts';

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
export function AssetsPlugin(config: AssetsPluginConfig): Plugin {
	const { assetsDir, outDir, dependencies = [], sourcemap = false } = config;

	let outputDirectory: string;
	let discoveredAssets: DiscoveredAsset[] = [];
	const pwd = process.env.PWD || process.cwd();

	// Default WordPress dependencies that should always be externalized
	const allDependencies = ['react', 'react-dom', ...dependencies];

	// Discover assets from asset paths (optional)
	if (assetsDir && Object.keys(assetsDir).length > 0) {
		discoveredAssets = discoverAssetsWithMapping(assetsDir, pwd);
	}

	return {
		name: 'vite-plugin-gutenberg-assets',

		// Only apply this plugin if assets are discovered
		apply: () => {
			return discoveredAssets.length > 0;
		},

		configResolved(resolvedConfig: ResolvedConfig) {
			if (typeof outDir === 'string') {
				outputDirectory =
					FilePathResolver.normalizePath(outDir) || 'dist';
			} else {
				outputDirectory = resolvedConfig.build.outDir || 'dist';
			}
		},

		buildStart: async function (this: PluginContext) {
			// Process discovered assets only if any exist
			if (discoveredAssets.length === 0) {
				return;
			}

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
