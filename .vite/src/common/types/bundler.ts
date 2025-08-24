import type { SourceMap } from 'node:module';

/**
 * Bundler and build system types for Rollup/Vite operations
 */

/**
 * Asset emitted by the bundler
 */
export type BundlerEmittedAsset = {
	type: 'asset';
	name?: string;
	needsCodeReference?: boolean;
	fileName?: string;
	source?: string | Uint8Array;
};

/**
 * Bundler asset information
 */
export type BundlerAssetInfo = {
	fileName: string;
	name?: string;
	needsCodeReference: boolean;
	source: string | Uint8Array;
	type: 'asset';
	code: string;
	imports: string[];
};

/**
 * Bundler chunk information
 */
export type BundlerChunkInfo = {
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
