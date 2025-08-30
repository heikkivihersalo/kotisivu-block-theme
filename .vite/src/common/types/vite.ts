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
 * Server configuration for development
 */
export type ServerConfig = {
	host?: string;
	port?: number;
	strictPort?: boolean;
	cors?: boolean;
	https?:
		| boolean
		| {
				key: Buffer;
				cert: Buffer;
		  };
	fs?: {
		allow: string[];
	};
	hmr?: {
		protocol?: 'ws' | 'wss';
		host?: string;
		port?: number;
	};
};

/**
 * Resolve configuration for module resolution
 */
export type ResolveConfig = {
	extensions?: string[];
	alias?: Record<string, string>;
};

/**
 * Environment configuration for handling environment variables
 */
export type EnvironmentConfig = {
	mode?: string;
	env?: Record<string, string>;
};

/**
 * Main Vite plugin configuration for WordPress development
 */
export type ViteWordPressConfig = {
	terserOptions?: TerserConfig;
	server?: ServerConfig;
	resolve?: ResolveConfig;
	environment?: EnvironmentConfig;
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
