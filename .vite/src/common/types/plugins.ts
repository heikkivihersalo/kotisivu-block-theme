/**
 * Internal dependencies
 */
import type { BasePluginConfig, DirectoryMapping } from './base.ts';

/**
 * Manifest plugin configuration
 */
export type ManifestPluginConfig = {
	outDir?: string;
	generatePhpManifest?: boolean;
	publicPath?: string;
	textDomain?: string;
};

/**
 * Core plugin configuration
 */
export type CorePluginConfig = {
	dependencies?: string[];
	discoveredBlocks?: import('./wordpress.ts').BlockInfo[];
};

/**
 * Blocks plugin configuration
 */
export type BlocksPluginConfig = BasePluginConfig & {
	blocksDir: DirectoryMapping;
};

/**
 * Assets plugin configuration
 */
export type AssetsPluginConfig = BasePluginConfig & {
	assetsDir: DirectoryMapping;
};

/**
 * Asset processor configuration
 */
export type AssetProcessorConfig = {
	outputDirectory: string;
	dependencies?: string[];
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
};
