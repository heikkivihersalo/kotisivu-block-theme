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
import {
	getBuildConfig,
	getServerConfig,
	getPathsConfig,
	getWordPressConfig,
	getEnvironmentConfig,
} from './src/common/utils/config-helpers.ts';

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
	// Extract categorized configs
	const buildConfig = getBuildConfig(config);
	const serverConfig = getServerConfig(config);
	const pathsConfig = getPathsConfig(config);
	const wordpressConfig = getWordPressConfig(config);
	const environmentConfig = getEnvironmentConfig(config);

	// Require block paths for multi-block builds
	if (
		!pathsConfig.blocksDir ||
		Object.keys(pathsConfig.blocksDir).length === 0
	) {
		throw new Error(
			'paths.blocksDir is required for multi-block builds. This plugin does not support single block builds.'
		);
	}

	// Build ViteWordPressConfig for ConfigPlugin
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
		build: {
			outDir: buildConfig.outDir,
			sourcemap: buildConfig.sourcemap,
			minify: buildConfig.minify,
			target: buildConfig.target,
			cssCodeSplit: buildConfig.cssCodeSplit,
			dependencies: wordpressConfig.dependencies,
			watch: environmentConfig.watch,
			assetsDir: pathsConfig.assetsDir,
			blocksDir: pathsConfig.blocksDir,
		},
	};

	// Create configuration plugin (must be first to set up build config)
	const configPlugin = ConfigPlugin(viteWordPressConfig);

	// Build ViteBlocksPluginConfig for BlocksPlugin
	const blocksConfig = {
		blocksDir: pathsConfig.blocksDir!,
		outDir: buildConfig.outDir,
		sourcemap: buildConfig.sourcemap,
		watch: environmentConfig.watch,
		dependencies: wordpressConfig.dependencies,
		discoveredBlocks: wordpressConfig.discoveredBlocks,
	};

	// Create the blocks plugin
	const blocksPlugin = BlocksPlugin(blocksConfig);

	// Create the assets plugin (optional, only if assets are configured)
	const assetsPlugin =
		pathsConfig.assetsDir && Object.keys(pathsConfig.assetsDir).length > 0
			? AssetsPlugin({
					assetsDir: pathsConfig.assetsDir,
					outDir: buildConfig.outDir,
					dependencies: wordpressConfig.dependencies,
					sourcemap: buildConfig.sourcemap,
				})
			: null;

	// Build ViteManifestPluginConfig for ManifestPlugin
	const manifestConfig = {
		outDir: buildConfig.outDir,
		generatePhpManifest: buildConfig.generatePhpManifest ?? true,
		publicPath: buildConfig.publicPath ?? '/',
		textDomain: wordpressConfig.textDomain,
	};

	// Create enhanced manifest plugin
	const manifestPlugin = ManifestPlugin(manifestConfig);

	// Build DevServerConfig for DevServerPlugin
	const devServerConfig = {
		host: serverConfig.host,
		port: serverConfig.port,
		base: serverConfig.base ?? '/',
		srcDir: pathsConfig.srcDir ?? 'resources',
		outDir: buildConfig.outDir,
		css: buildConfig.css ?? 'css',
		manifest: buildConfig.manifest ?? true,
		devServerUrl: serverConfig.devServerUrl,
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
