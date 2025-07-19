import type { SourceMap } from 'node:module';

/**
 * WordPress Block JSON configuration
 */
export type WordpressBlockJson = {
	style?: string | string[];
	editorStyle?: string | string[];
	viewStyle?: string | string[];
	viewScript?: string | string[];
	script?: string | string[];
	editorScript?: string | string[];
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
 * Plugin configuration options
 */
export type PluginConfig = {
	watch?: string[];
	outDir?: string;
	dependencies?: string[];
	blockFolders?: string[];
	// New path mapping support
	pathMappings?: Record<string, string>;
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
