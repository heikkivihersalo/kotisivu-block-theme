/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

/**
 * Shared dependencies
 */
import { normalizePath } from '../../common/utils';
import { DevFileEmitter } from '../../common/utils/vite/DevFileEmitter';
import type {
	DiscoveredAsset,
	ViteAssetsPluginConfig,
} from '../../common/types';

/**
 * Internal dependencies
 */
import { discoverAssetsWithMapping } from './discovery';
import { processAssets } from './processor.ts';

/**
 * Vite plugin for handling WordPress assets
 *
 * This plugin is responsible for:
 * - Discovering assets from configured directories
 * - Sideloading asset entry points
 */
export function AssetsPlugin(config: ViteAssetsPluginConfig): Plugin {
	const { assetsDir, outDir, dependencies = [], sourcemap = false } = config;

	let outputDirectory: string;
	let discoveredAssets: DiscoveredAsset[] = [];
	let fileEmitter: DevFileEmitter;
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

			// Initialize file emitter with output directory
			fileEmitter = new DevFileEmitter(outputDirectory);
		},

		buildStart: async function (this: PluginContext) {
			// Process discovered assets only if any exist
			if (discoveredAssets.length > 0) {
				await processAssets(this, discoveredAssets, {
					outputDirectory,
					dependencies: allDependencies,
					sourcemap,
					fileEmitter,
				});
			}
		},
	};
}
