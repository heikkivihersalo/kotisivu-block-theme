/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import { sideloadAssets } from './sideloadAssets.js';
import { discoverAssetsWithMapping } from '../../common/discovery/index.js';
import { normalizePath } from '../../common/index.js';

import type { DiscoveredAssetInfo } from '../../common/types/index.js';

interface AssetsPluginConfig {
	assetsDir: Record<string, string>;
	outDir?: string | undefined;
	dependencies?: string[];
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
}

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
	const defaultDependencies = ['react', 'react-dom'];

	// Merge default dependencies with user-provided dependencies (avoiding duplicates)
	const allDependencies = [
		...defaultDependencies,
		...dependencies.filter((dep) => !defaultDependencies.includes(dep)),
	];

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
				await sideloadAssets.call(
					this,
					discoveredAssets,
					outputDirectory,
					allDependencies,
					sourcemap
				);
			}
		},

		// Expose discovered assets for other plugins
		api: {
			getDiscoveredAssets: () => discoveredAssets,
			getAllDependencies: () => allDependencies,
		},
	};
}
