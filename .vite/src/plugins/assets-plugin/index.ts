/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

/**
 * Shared dependencies
 */
import { normalizePath } from '../../common/utils';
import type { DiscoveredAssetInfo } from '../../common/types/assets.ts';

/**
 * Internal dependencies
 */
import { discoverAssetsWithMapping } from './discovery';
import { processAssets } from './processor.ts';

type AssetsPluginConfig = {
	assetsDir: Record<string, string>;
	outDir?: string | undefined;
	dependencies?: string[];
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
};

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
	let discoveredAssets: DiscoveredAssetInfo[] = [];
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
				outputDirectory = normalizePath(outDir) || 'dist';
			} else {
				outputDirectory = resolvedConfig.build.outDir || 'dist';
			}
		},

		buildStart: async function (this: PluginContext) {
			// Process discovered assets only if any exist
			if (discoveredAssets.length > 0) {
				await processAssets(this, discoveredAssets, {
					outputDirectory,
					dependencies: allDependencies,
					sourcemap,
				});
			}
		},
	};
}
