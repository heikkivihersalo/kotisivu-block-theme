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

import type { UnifiedPluginConfig } from './src/common/types/unified-config.ts';

/**
 * Create a Vite plugin for multi-block Gutenberg builds
 *
 * This plugin uses a single unified configuration that all plugins share.
 * Each plugin extracts only the properties it needs from the shared config.
 *
 * @param {UnifiedPluginConfig} config - Unified configuration options for all plugins
 * @returns {Array} Array of Vite plugins
 */
export const wp = (config: UnifiedPluginConfig): Plugin[] => {
	// Require block paths for multi-block builds
	if (!config.blocksDir || Object.keys(config.blocksDir).length === 0) {
		throw new Error(
			'blocksDir is required for multi-block builds. This plugin does not support single block builds.'
		);
	}

	// Build ViteWordPressConfig for ConfigPlugin
	const viteWordPressConfig = {
		terserOptions: config.terserOptions,
		server: {
			host: config.host,
			port: config.port,
			strictPort: config.strictPort,
			cors: config.cors,
			https: config.https,
		},
		resolve: config.resolve,
		environment: config.environment,
		build: {
			outDir: config.outDir,
			sourcemap: config.sourcemap,
			minify: config.minify,
			target: config.target,
			cssCodeSplit: config.cssCodeSplit,
			dependencies: config.dependencies,
			watch: config.watch,
			assetsDir: config.assetsDir,
			blocksDir: config.blocksDir,
		},
	};

	// Create configuration plugin (must be first to set up build config)
	const configPlugin = ConfigPlugin(viteWordPressConfig);

	// Build ViteBlocksPluginConfig for BlocksPlugin
	const blocksConfig = {
		blocksDir: config.blocksDir,
		outDir: config.outDir,
		sourcemap: config.sourcemap,
		watch: config.watch,
		dependencies: config.dependencies,
		discoveredBlocks: config.discoveredBlocks,
	};

	// Create the blocks plugin
	const blocksPlugin = BlocksPlugin(blocksConfig);

	// Create the assets plugin (optional, only if assets are configured)
	const assetsPlugin =
		config.assetsDir && Object.keys(config.assetsDir).length > 0
			? AssetsPlugin({
					assetsDir: config.assetsDir,
					outDir: config.outDir,
					dependencies: config.dependencies,
					sourcemap: config.sourcemap,
				})
			: null;

	// Build ViteManifestPluginConfig for ManifestPlugin
	const manifestConfig = {
		outDir: config.outDir,
		generatePhpManifest: config.generatePhpManifest ?? true,
		publicPath: config.publicPath ?? '/',
		textDomain: config.textDomain,
	};

	// Create enhanced manifest plugin
	const manifestPlugin = ManifestPlugin(manifestConfig);

	// Build DevServerConfig for DevServerPlugin
	const devServerConfig = {
		host: config.host,
		port: config.port,
		base: config.base ?? '/',
		srcDir: config.srcDir ?? 'resources',
		outDir: config.outDir,
		css: config.css ?? 'css',
		manifest: config.manifest ?? true,
		devServerUrl: config.devServerUrl,
		inlineAssets: config.inlineAssets,
	};

	// Create DevServer plugin with inline assets HMR support
	const devServerPlugin = DevServerPlugin(devServerConfig);

	// Get additional plugins (React, static copy, etc.)
	const additionalPlugins = generatePlugins();

	// All plugins now support FileEmitter and can run in both dev and production
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
