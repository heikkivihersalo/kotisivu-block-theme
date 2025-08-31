/**
 * Unified Plugin Configuration System - Legacy Types
 *
 * This file contains utility types for extracting specific plugin configurations
 * from the unified PluginConfig. These types are derived from the main configuration
 * and should not be used as standalone configurations.
 */

/**
 * Internal dependencies
 */
import type { DirectoryMapping } from './paths.ts';
import type { PluginConfig } from './plugin-config.ts';

/**
 * Extract manifest plugin configuration from unified config
 */
export type ManifestPluginConfig = {
	outDir?: string;
	generatePhpManifest?: boolean;
	publicPath?: string;
	textDomain?: string;
};

/**
 * Extract blocks plugin configuration from unified config
 */
export type BlocksPluginConfig = {
	blocksDir: DirectoryMapping;
	outDir?: string;
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	hmr?: PluginConfig['hmr'];
	dependencies?: string[];
	discoveredBlocks?: import('./wordpress.ts').BlockInfo[];
};

/**
 * Extract assets plugin configuration from unified config
 */
export type AssetsPluginConfig = {
	assetsDir: DirectoryMapping;
	outDir?: string;
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	dependencies?: string[];
};

/**
 * Extract dev server configuration from unified config
 */
export type DevServerPluginConfig = {
	host?: string;
	port?: number;
	devServerUrl?: string;
	strictPort?: boolean;
	cors?: boolean;
	https?: boolean | { key: Buffer; cert: Buffer };
	base?: string;
	srcDir?: string;
	outDir?: string;
	css?: string;
	manifest?: boolean;
	inlineAssets?: PluginConfig['inlineAssets'];
};

/**
 * Asset processor configuration
 */
export type AssetProcessorConfig = {
	outputDirectory: string;
	dependencies?: string[];
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
};

/**
 * Utility functions to extract specific configurations from unified PluginConfig
 */

/**
 * Extract manifest plugin configuration from unified config
 */
export function extractManifestConfig(
	config: PluginConfig
): ManifestPluginConfig {
	return {
		outDir: config.build?.outDir,
		generatePhpManifest: config.build?.generatePhpManifest ?? true,
		publicPath: config.build?.publicPath ?? '/',
		textDomain: config.wordpress?.textDomain,
	};
}

/**
 * Extract blocks plugin configuration from unified config
 */
export function extractBlocksConfig(config: PluginConfig): BlocksPluginConfig {
	if (!config.paths?.blocksDir) {
		throw new Error('paths.blocksDir is required for blocks plugin');
	}

	return {
		blocksDir: config.paths.blocksDir,
		outDir: config.build?.outDir,
		sourcemap: config.build?.sourcemap,
		hmr: config.hmr,
		dependencies: config.wordpress?.dependencies,
		discoveredBlocks: config.wordpress?.discoveredBlocks,
	};
}

/**
 * Extract assets plugin configuration from unified config
 */
export function extractAssetsConfig(
	config: PluginConfig
): AssetsPluginConfig | null {
	if (
		!config.paths?.assetsDir ||
		Object.keys(config.paths.assetsDir).length === 0
	) {
		return null;
	}

	return {
		assetsDir: config.paths.assetsDir,
		outDir: config.build?.outDir,
		sourcemap: config.build?.sourcemap,
		dependencies: config.wordpress?.dependencies,
	};
}

/**
 * Extract dev server configuration from unified config
 */
export function extractDevServerConfig(
	config: PluginConfig
): DevServerPluginConfig {
	return {
		host: config.server?.host,
		port: config.server?.port,
		devServerUrl: config.server?.devServerUrl,
		strictPort: config.server?.strictPort,
		cors: config.server?.cors,
		https: config.server?.https,
		base: config.server?.base ?? '/',
		srcDir: config.paths?.srcDir ?? 'resources',
		outDir: config.build?.outDir ?? 'build',
		css: config.build?.css ?? 'css',
		manifest: config.build?.manifest ?? true,
		inlineAssets: config.inlineAssets,
	};
}
