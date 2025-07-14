/**
 * Vite-specific types and configurations
 */

// Vite input configuration
export type ViteInput = {
	[key: string]: string;
};

// Bundle manifest types
export type AssetInfo = {
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
};

export type ChunkInfo = {
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
};

// Rollup plugin context types
export type PluginContext = {
	emitFile: (file: {
		type: 'asset';
		fileName: string;
		source: string;
	}) => void;
};

// Bundle type definition
export type Bundle = Record<string, AssetInfo | ChunkInfo>;

// Rollup function types for chunking
export type ManualChunksFunction = (id: string) => string | undefined;

// Chunk info for file naming (simplified version)
export type ChunkFileNamingInfo = {
	name: string;
	[key: string]: any;
};

export type ChunkFileNamesFunction = (chunkInfo: ChunkFileNamingInfo) => string;
