/**
 * Type definitions for the Gutenberg Blocks plugin
 */

// Plugin configuration types
export interface ChunkConfig {
	frontend: string[];
	editor: string[];
	common: string[];
}

export interface PluginOptions {
	input: Record<string, string>;
	output?: string;
	chunks?: ChunkConfig;
}

// Block patterns and file extensions
export interface BlockPatterns {
	BLOCK_JSON: string;
	SCRIPT_EXTENSIONS: readonly string[];
	STYLE_EXTENSIONS: readonly string[];
}

// WordPress file output conventions
export interface WordPressFileOutput {
	EDITOR_SCRIPT: string;
	EDITOR_STYLE: string;
	STYLE: string;
	VIEW_SCRIPT: string;
	RENDER: string;
	BLOCK_JSON: string;
}

// Asset folder structure
export interface AssetFolders {
	COMMON: string;
	FRONTEND: string;
	EDITOR: string;
}

// Vite input configuration
export interface ViteInput {
	[key: string]: string;
}

// Bundle manifest types
export interface AssetInfo {
	fileName: string;
	name?: string;
	source?: string;
	type: 'asset' | 'chunk';
	originalFileName?: string;
	needsCodeReference?: boolean;
	referenceId?: string;
	preliminaryFileName?: string;
	sourcemapFileName?: string | null;
	viteMetadata?: {
		importedAssets: Set<string>;
		importedCss: Set<string>;
	};
}

export interface ChunkInfo {
	fileName: string;
	name?: string;
	type: 'chunk';
	isEntry: boolean;
	isDynamicEntry: boolean;
	facadeModuleId: string | null;
	moduleIds: string[];
	exports: string[];
	imports: string[];
	dynamicImports: string[];
	implicitlyLoadedBefore: string[];
	importedBindings: Record<string, string[]>;
	modules: Record<string, any>;
	referencedFiles: string[];
	viteMetadata?: {
		importedAssets: Set<string>;
		importedCss: Set<string>;
	};
}

export interface ManifestBlock {
	editorScript?: string;
	editorStyle?: string;
	script?: string;
	style?: string;
	render?: string;
	blockJson?: string;
	dependencies?: string[];
}

export interface ManifestAsset {
	fileName: string;
	type: 'chunk' | 'asset';
	isEntry?: boolean;
	dependencies?: string[];
	imports?: string[];
	css?: string[];
}

export interface ManifestStructure {
	blocks: Record<string, Record<string, ManifestBlock>>;
	assets: Record<string, ManifestAsset>;
}

// External dependencies types
export type ExternalFunction = (id: string) => boolean;
export type GlobalsMapping = Record<string, string>;
