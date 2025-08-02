/**
 * External dependencies
 */
import type { Plugin } from 'vite';

/**
 * Internal dependencies
 */
import {
	BlocksPlugin,
	AssetsPlugin,
	CorePlugin,
	ConfigPlugin,
	generatePlugins,
} from './src/plugins/index.js';

import type { PluginConfig } from './src/common/types/index.js';

/**
 * Create a Vite plugin for multi-block Gutenberg builds
 *
 * This plugin is designed exclusively for building multiple WordPress blocks
 * from organized directory structures using path mappings. Path mappings are
 * mandatory and the plugin will throw an error if they are not configured.
 * Single block builds are not supported.
 *
 * @param {PluginConfig} pluginConfig - Configuration options for the plugin (pathMappings required)
 * @returns {Array} Array of Vite plugins
 */
export const wp = (pluginConfig = {} as PluginConfig): Plugin[] => {
	const {
		dependencies = [],
		terserOptions = {},
		build: {
			outDir,
			assetsDir = {},
			blocksDir = {},
			watch = [],
			minify = true,
			sourcemap = false,
		} = {},
	} = pluginConfig;

	// Require block paths for multi-block builds
	if (!blocksDir || Object.keys(blocksDir).length === 0) {
		throw new Error(
			'build.blocksDir are required for multi-block builds. This plugin does not support single block builds.'
		);
	}

	// Create configuration plugin (must be first to set up build config)
	const configPlugin = ConfigPlugin({
		outDir,
		minify,
		sourcemap,
		terserOptions,
	});

	// Create the blocks plugin
	const blocksPlugin = BlocksPlugin({
		blocksDir,
		outDir,
		sourcemap,
		watch,
	});

	// Create the assets plugin (optional, only if assets are configured)
	const assetsPlugin = AssetsPlugin({
		assetsDir,
		outDir,
		dependencies,
		sourcemap,
	});

	// Create the core plugin with discovered blocks
	const corePlugin = CorePlugin({
		dependencies,
		// Pass discovered blocks from the blocks plugin API
		discoveredBlocks: blocksPlugin.api?.getDiscoveredBlocks() || [],
	});

	// Get additional plugins (React, static copy, etc.)
	const additionalPlugins = generatePlugins({
		discoveredBlocks: blocksPlugin.api?.getDiscoveredBlocks() || [],
	});

	return [
		configPlugin,
		corePlugin,
		blocksPlugin,
		assetsPlugin,
		...additionalPlugins,
	] as Plugin[];
};
