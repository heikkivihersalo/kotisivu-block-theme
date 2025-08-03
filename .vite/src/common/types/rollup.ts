import type { SourceMap } from 'node:module';

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
