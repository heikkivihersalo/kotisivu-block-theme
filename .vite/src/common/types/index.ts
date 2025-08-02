import type { SourceMap } from 'node:module';

/**
 * WordPress Block JSON configuration
 */
export type WordpressBlockJson = {
	name?: string;
	title?: string;
	description?: string;
	category?: string;
	icon?: string;
	keywords?: string[];
	textdomain?: string;
	apiVersion?: number;
	$schema?: string;
	supports?: Record<string, any>;
	attributes?: Record<string, any>;
	style?: string | string[];
	editorStyle?: string | string[];
	viewStyle?: string | string[];
	viewScript?: string | string[];
	script?: string | string[];
	editorScript?: string | string[];
	[key: string]: any; // Allow additional properties
};

/**
 * Block discovery information
 */
export type BlockInfo = {
	path: string;
	blockJson: WordpressBlockJson;
	name: string;
	outputPath?: string; // Custom output path for path mappings
};

/**
 * Asset discovery information
 */
export type DiscoveredAssetInfo = {
	name: string;
	sourcePath: string;
	outputPath: string;
	relativePath: string;
};

/**
 * Plugin configuration options for multi-block builds
 */
export type PluginConfig = {
	dependencies?: string[];
	terserOptions?: {
		compress?: Record<string, any>;
		mangle?: Record<string, any>;
		format?: Record<string, any>;
		output?: Record<string, any>; // Alias for format (legacy support)
	};
	build: {
		outDir?: string;
		minify?: boolean | 'esbuild' | 'terser';
		sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
		assetsDir: Record<string, string>;
		blocksDir: Record<string, string>;
		watch?: string[];
	};
};

/**
 * Rollup emitted asset
 */
export type EmittedAsset = {
	type: 'asset';
	name?: string;
	needsCodeReference?: boolean;
	fileName?: string;
	source?: string | Uint8Array;
};

/**
 * Rollup asset info
 */
export type AssetInfo = {
	fileName: string;
	name?: string;
	needsCodeReference: boolean;
	source: string | Uint8Array;
	type: 'asset';
	code: string;
	imports: string[];
};

/**
 * Rollup chunk info
 */
export type ChunkInfo = {
	code: string;
	dynamicImports: string[];
	exports: string[];
	facadeModuleId: string | null;
	fileName: string;
	implicitlyLoadedBefore: string[];
	imports: string[];
	importedBindings: { [imported: string]: string[] };
	isDynamicEntry: boolean;
	isEntry: boolean;
	isImplicitEntry: boolean;
	map: SourceMap | null;
	modules: {
		[id: string]: {
			renderedExports: string[];
			removedExports: string[];
			renderedLength: number;
			originalLength: number;
			code: string | null;
		};
	};
	moduleIds: string[];
	name: string;
	preliminaryFileName: string;
	referencedFiles: string[];
	type: 'chunk';
};
