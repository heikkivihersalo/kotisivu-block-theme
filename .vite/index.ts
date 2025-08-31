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
 * The ConfigPlugin serves as the single source of truth and all other plugins
 * access configuration through it, ensuring consistency and avoiding duplication.
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

	// Create configuration plugin (must be first to set up unified config)
	// This plugin serves as the single source of truth for all configuration
	const configPlugin = ConfigPlugin(config);

	// Create other plugins (they get their config from ConfigPlugin)
	const blocksPlugin = BlocksPlugin();

	// Create the assets plugin (optional, only if assets are configured)
	// The plugin itself will check if assets are configured and apply conditionally
	const assetsPlugin = AssetsPlugin();

	// Create the manifest plugin
	const manifestPlugin = ManifestPlugin();

	// Create the dev server plugin
	const devServerPlugin = DevServerPlugin();

	// Get additional plugins (React, static copy, etc.)
	const additionalPlugins = generatePlugins();

	// Return array of plugins
	// ConfigPlugin must be first so other plugins can access the unified config
	const plugins = [
		configPlugin,
		blocksPlugin,
		assetsPlugin,
		manifestPlugin,
		devServerPlugin,
		...additionalPlugins,
	] as Plugin[];

	return plugins;
};
