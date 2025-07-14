/**
 * Main type exports for the Gutenberg Blocks plugin
 * Re-exports all types from their respective category files
 */

// Plugin configuration types
export type { ChunkConfig, PluginOptions } from './lib/plugin.js';

// WordPress-specific types
export type {
	BlockPatterns,
	WordPressFileOutput,
	AssetFolders,
} from './lib/wordpress.js';

// Vite-specific types
export type {
	ViteInput,
	AssetInfo,
	ChunkInfo,
	PluginContext,
	Bundle,
	ManualChunksFunction,
	ChunkFileNamingInfo,
	ChunkFileNamesFunction,
} from './lib/vite.js';

// Manifest types
export type {
	ManifestBlock,
	ManifestAsset,
	BlockManifest,
	AssetChunk,
	ManifestAssets,
} from './lib/manifest.js';

// External dependencies types
export type { ExternalFunction, GlobalsMapping } from './lib/externals.js';
