/**
 * External dependencies
 */
import type { Plugin } from 'vite';

/**
 * Internal dependencies
 */
import {
	AssetsPlugin,
	BlocksPlugin,
	ConfigPlugin,
	DevServerPlugin,
	ManifestPlugin,
	generatePlugins,
} from './src/plugins/index.js';

import type { PluginConfig } from './src/common/types/plugin-config.ts';

/**
 * Create a Vite plugin for multi-block Gutenberg builds
 *
 * This plugin uses a single unified configuration that all plugins share.
 * Each plugin extracts only the properties it needs from the shared config.
 *
 * @param {PluginConfig} config - Unified configuration options for all plugins
 * @returns {Array} Array of Vite plugins
 */
export const wp = (config: PluginConfig): Plugin[] => {
	// Validate required configuration
	if (
		!config.paths?.blocksDir ||
		Object.keys(config.paths.blocksDir).length === 0
	) {
		throw new Error(
			'paths.blocksDir is required for multi-block builds. This plugin does not support single block builds.'
		);
	}

	// Build ViteWordPressConfig for ConfigPlugin (keeping backward compatibility)
	const viteWordPressConfig = {
		terserOptions: config.build?.terserOptions,
		server: {
			host: config.server?.host,
			port: config.server?.port,
			strictPort: config.server?.strictPort,
			cors: config.server?.cors,
			https: config.server?.https,
		},
		resolve: config.build?.resolve,
		environment: config.environment,
		hmr: config.hmr,
		build: {
			outDir: config.build?.outDir,
			sourcemap: config.build?.sourcemap,
			minify: config.build?.minify,
			target: config.build?.target,
			cssCodeSplit: config.build?.cssCodeSplit,
			dependencies: config.wordpress?.dependencies,
			assetsDir: config.paths?.assetsDir,
			blocksDir: config.paths?.blocksDir,
		},
	};

	// Create configuration plugin (must be first to set up build config)
	const configPlugin = ConfigPlugin(viteWordPressConfig);

	// Create the blocks plugin
	const blocksPlugin = BlocksPlugin(config);

	// Create the assets plugin (optional, only if assets are configured)
	const assetsPlugin =
		config.paths?.assetsDir &&
		Object.keys(config.paths.assetsDir).length > 0
			? AssetsPlugin(config)
			: null;

	// Create the manifest plugin
	const manifestPlugin = ManifestPlugin(config);

	// Create the dev server plugin
	const devServerPlugin = DevServerPlugin(config);

	// Get additional plugins (React, static copy, etc.)
	const additionalPlugins = generatePlugins();

	// Return array of plugins, filtering out null values
	const plugins = [
		configPlugin,
		blocksPlugin,
		...(assetsPlugin ? [assetsPlugin] : []),
		manifestPlugin,
		devServerPlugin,
		...additionalPlugins,
	] as Plugin[];

	return plugins;
};
