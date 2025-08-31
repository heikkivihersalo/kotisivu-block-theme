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
import {
	extractManifestConfig,
	extractBlocksConfig,
	extractAssetsConfig,
	extractDevServerConfig,
} from './src/common/types/plugins.ts';
import {
	getBuildConfig,
	getServerConfig,
	getEnvironmentConfig,
	getHMRConfig,
} from './src/common/utils/config-helpers.ts';

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

	// Extract specific plugin configurations from unified config
	const blocksConfig = extractBlocksConfig(config);
	const assetsConfig = extractAssetsConfig(config);
	const manifestConfig = extractManifestConfig(config);
	const devServerConfig = extractDevServerConfig(config);

	// Build ViteWordPressConfig for ConfigPlugin (keeping backward compatibility)
	const buildConfig = getBuildConfig(config);
	const serverConfig = getServerConfig(config);
	const environmentConfig = getEnvironmentConfig(config);
	const hmrConfig = getHMRConfig(config);

	const viteWordPressConfig = {
		terserOptions: buildConfig.terserOptions,
		server: {
			host: serverConfig.host,
			port: serverConfig.port,
			strictPort: serverConfig.strictPort,
			cors: serverConfig.cors,
			https: serverConfig.https,
		},
		resolve: buildConfig.resolve,
		environment: environmentConfig,
		hmr: hmrConfig,
		build: {
			outDir: buildConfig.outDir,
			sourcemap: buildConfig.sourcemap,
			minify: buildConfig.minify,
			target: buildConfig.target,
			cssCodeSplit: buildConfig.cssCodeSplit,
			dependencies: config.wordpress?.dependencies,
			assetsDir: config.paths?.assetsDir,
			blocksDir: config.paths?.blocksDir,
		},
	};

	// Create configuration plugin (must be first to set up build config)
	const configPlugin = ConfigPlugin(viteWordPressConfig);

	// Create the blocks plugin
	const blocksPlugin = BlocksPlugin(blocksConfig);

	// Create the assets plugin (optional, only if assets are configured)
	const assetsPlugin = assetsConfig ? AssetsPlugin(assetsConfig) : null;

	// Create the manifest plugin
	const manifestPlugin = ManifestPlugin(manifestConfig);

	// Create the dev server plugin
	const devServerPlugin = DevServerPlugin(devServerConfig);

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
