/**
 * Build and compilation types
 */
export type {
	BuildEnvironmentConfig,
	DependencyConfig,
	BuildConfig,
	TerserConfig,
} from './build.ts';

/**
 * Bundler system types (Rollup/Vite)
 */
export type {
	BundlerEmittedAsset,
	BundlerAssetInfo,
	BundlerChunkInfo,
} from './bundler.ts';

/**
 * Type aliases for convenience
 */
export type { BundlerEmittedAsset as EmittedAsset } from './bundler.ts';
export type { BundlerAssetInfo as AssetInfo } from './bundler.ts';
export type { BundlerChunkInfo as ChunkInfo } from './bundler.ts';

/**
 * Asset and block discovery types
 */
export type { DiscoveredAsset, AssetProcessorConfig } from './discovery.ts';

/**
 * Asset processing and output types
 */
export type { DiscoveredAssetInfo, OutputConfig } from './assets.ts';

/**
 * Path and file system types
 */
export type {
	FilePathInfo,
	DiscoveredFilePathInfo,
	FileIdentifier,
	DirectoryMapping,
	OutputDirectoryConfig,
} from './paths.ts';

/**
 * Vite plugin configuration types
 */
export type {
	ViteWordPressConfig,
	ViteManifestPluginConfig,
	ViteCorePluginConfig,
	ViteBlocksPluginConfig,
	ViteAssetsPluginConfig,
} from './vite.ts';

/**
 * WordPress-specific types
 */
export type {
	WordPressBlockJSON,
	BlockInfo,
	ViteManifestChunk,
	ViteManifest,
	WordPressAssetManifest,
} from './wordpress.ts';

/**
 * Unified plugin configuration system
 */
export type { UnifiedPluginConfig } from './unified-config.ts';
