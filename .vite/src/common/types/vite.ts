/**
 * Vite plugin and configuration types
 */

/**
 * Internal dependencies
 */
import type { BuildConfig, TerserConfig } from './build.ts';
import type { DirectoryMapping } from './paths.ts';
import type { BlockInfo } from './wordpress.ts';

/**
 * Main Vite plugin configuration for WordPress development
 */
export type ViteWordPressConfig = {
	terserOptions?: TerserConfig;
	build: BuildConfig & {
		assetsDir?: DirectoryMapping;
		blocksDir?: DirectoryMapping;
	};
};

/**
 * Manifest generation plugin configuration
 */
export type ViteManifestPluginConfig = {
	outDir?: string;
	generatePhpManifest?: boolean;
	publicPath?: string;
	textDomain?: string;
};

/**
 * Core WordPress plugin configuration
 */
export type ViteCorePluginConfig = {
	dependencies?: string[];
	discoveredBlocks?: BlockInfo[];
};

/**
 * Blocks processing plugin configuration
 */
export type ViteBlocksPluginConfig = BuildConfig & {
	blocksDir: DirectoryMapping;
};

/**
 * Assets processing plugin configuration
 */
export type ViteAssetsPluginConfig = BuildConfig & {
	assetsDir: DirectoryMapping;
};
