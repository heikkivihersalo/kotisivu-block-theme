/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

import { BlockHandler } from '../../common/handlers';
import type { ViteBlocksPluginConfig } from '../../common/types';

/**
 * Vite plugin for WordPress Gutenberg blocks
 *
 * This is a lean plugin that serves as a bridge between Vite's plugin system
 * and the comprehensive BlockHandler. The plugin's responsibilities are:
 *
 * - Integrating with Vite's plugin lifecycle hooks
 * - Coordinating between Vite configuration and BlockHandler
 * - Exposing block discovery API for other plugins
 *
 * All block processing logic is handled by the BlockHandler class, making
 * this plugin a thin coordinator that focuses purely on Vite integration.
 */
export function BlocksPlugin(config: ViteBlocksPluginConfig): Plugin {
	const { sourcemap = false } = config;
	let blockHandler: BlockHandler;
	let resolvedViteConfig: ResolvedConfig;

	return {
		name: 'vite-plugin-gutenberg-blocks',

		configResolved(resolvedConfig: ResolvedConfig) {
			resolvedViteConfig = resolvedConfig;
		},

		buildStart: async function (this: PluginContext) {
			// Initialize block handler with configuration and context
			blockHandler = new BlockHandler({
				context: this,
				outputDirectory: '', // Will be configured below
				config,
			});

			// Configure output directory from resolved config
			blockHandler.configureOutputDirectory(resolvedViteConfig);

			// Initialize block handler (validation, discovery, watch files)
			await blockHandler.initialize();

			// Process all discovered blocks
			await blockHandler.processAllBlocks(sourcemap);
		},

		generateBundle: async function (this: PluginContext) {
			// Copy static files for all blocks (build mode only)
			await blockHandler.copyStaticFilesForAllBlocks();
		},

		// Expose discovered blocks for other plugins
		api: {
			getDiscoveredBlocks: () => blockHandler.getDiscoveredBlocks(),
		},
	};
}
