import { describe, it, expect } from 'vitest';
import { extractWpDependencies } from '../../../../src/common/utils/string/extractWpDependencies.ts';
import type {
	AssetInfo,
	ChunkInfo,
} from '../../../../src/common/types/index.ts';

describe('extractWpDependencies', () => {
	it('should return empty array for undefined input', () => {
		const result = extractWpDependencies(undefined);
		expect(result).toEqual([]);
	});

	it('should handle array of import strings', () => {
		const imports = ['@wordpress/element', '@wordpress/blocks', 'react'];
		const result = extractWpDependencies(imports);
		expect(result).toEqual(['wp-element', 'wp-blocks', 'react']);
	});

	it('should handle empty array of imports', () => {
		const imports: string[] = [];
		const result = extractWpDependencies(imports);
		expect(result).toEqual([]);
	});

	it('should transform @wordpress namespace imports to wp- format', () => {
		const imports = [
			'@wordpress/element',
			'@wordpress/block-editor',
			'@wordpress/components',
			'@wordpress/data',
		];
		const result = extractWpDependencies(imports);
		expect(result).toEqual([
			'wp-element',
			'wp-block-editor',
			'wp-components',
			'wp-data',
		]);
	});

	it('should preserve non-WordPress imports', () => {
		const imports = ['react', 'lodash', 'jquery', '@wordpress/element'];
		const result = extractWpDependencies(imports);
		expect(result).toEqual(['react', 'lodash', 'jquery', 'wp-element']);
	});

	it('should remove duplicate imports', () => {
		const imports = [
			'@wordpress/element',
			'react',
			'@wordpress/element',
			'wp-element',
			'react',
		];
		const result = extractWpDependencies(imports);
		expect(result).toEqual(['wp-element', 'react']);
	});

	it('should handle bundle object with chunk info', () => {
		const bundle = {
			'chunk1.js': {
				code: 'some code',
				imports: ['@wordpress/element', '@wordpress/blocks'],
				type: 'chunk' as const,
				fileName: 'chunk1.js',
				dynamicImports: [],
				exports: [],
				facadeModuleId: null,
				implicitlyLoadedBefore: [],
				importedBindings: {},
				isDynamicEntry: false,
				isEntry: true,
				isImplicitEntry: false,
				map: null,
				modules: {},
				moduleIds: [],
				name: 'chunk1',
				preliminaryFileName: 'chunk1.js',
				referencedFiles: [],
			} satisfies ChunkInfo,
			'chunk2.js': {
				code: 'more code',
				imports: ['react', '@wordpress/components'],
				type: 'chunk' as const,
				fileName: 'chunk2.js',
				dynamicImports: [],
				exports: [],
				facadeModuleId: null,
				implicitlyLoadedBefore: [],
				importedBindings: {},
				isDynamicEntry: false,
				isEntry: false,
				isImplicitEntry: false,
				map: null,
				modules: {},
				moduleIds: [],
				name: 'chunk2',
				preliminaryFileName: 'chunk2.js',
				referencedFiles: [],
			} satisfies ChunkInfo,
		};

		const result = extractWpDependencies(bundle);
		expect(result).toEqual([
			'wp-element',
			'wp-blocks',
			'react',
			'wp-components',
		]);
	});

	it('should handle bundle with asset info that has no code', () => {
		const bundle = {
			'style.css': {
				fileName: 'style.css',
				name: 'style',
				needsCodeReference: false,
				source: 'css content',
				type: 'asset' as const,
				code: '',
				imports: [],
			} satisfies AssetInfo,
			'script.js': {
				code: 'js code',
				imports: ['@wordpress/element'],
				type: 'chunk' as const,
				fileName: 'script.js',
				dynamicImports: [],
				exports: [],
				facadeModuleId: null,
				implicitlyLoadedBefore: [],
				importedBindings: {},
				isDynamicEntry: false,
				isEntry: true,
				isImplicitEntry: false,
				map: null,
				modules: {},
				moduleIds: [],
				name: 'script',
				preliminaryFileName: 'script.js',
				referencedFiles: [],
			} satisfies ChunkInfo,
		};

		const result = extractWpDependencies(bundle);
		expect(result).toEqual(['wp-element']);
	});

	it('should handle empty bundle object', () => {
		const bundle = {};
		const result = extractWpDependencies(bundle);
		expect(result).toEqual([]);
	});

	it('should handle complex WordPress package names', () => {
		const imports = [
			'@wordpress/block-editor',
			'@wordpress/server-side-render',
			'@wordpress/api-fetch',
			'@wordpress/rich-text',
		];
		const result = extractWpDependencies(imports);
		expect(result).toEqual([
			'wp-block-editor',
			'wp-server-side-render',
			'wp-api-fetch',
			'wp-rich-text',
		]);
	});
});
