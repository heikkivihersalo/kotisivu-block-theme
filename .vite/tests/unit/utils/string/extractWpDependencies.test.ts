import { describe, it, expect } from 'vitest';
import { extractWpDependencies } from '../../../../src/common/utils/extractWpDependencies.ts';
import type {
	AssetInfo,
	ChunkInfo,
} from '../../../../src/common/types/index.ts';

describe('extractWpDependencies', () => {
	it('should handle array of import strings and transform WordPress namespaces', () => {
		const imports = [
			'@wordpress/element',
			'@wordpress/blocks',
			'react',
			'lodash',
		];
		const result = extractWpDependencies(imports);
		expect(result).toEqual(['wp-element', 'wp-blocks', 'react', 'lodash']);
	});

	it('should handle empty and undefined inputs', () => {
		// Undefined input
		expect(extractWpDependencies(undefined)).toEqual([]);

		// Empty array
		expect(extractWpDependencies([])).toEqual([]);

		// Empty bundle object
		expect(extractWpDependencies({})).toEqual([]);
	});

	it('should transform complex WordPress package names and remove duplicates', () => {
		const imports = [
			'@wordpress/block-editor',
			'@wordpress/server-side-render',
			'@wordpress/api-fetch',
			'@wordpress/element',
			'react',
			'@wordpress/element', // duplicate
			'wp-element', // already transformed duplicate
			'react', // duplicate
		];
		const result = extractWpDependencies(imports);
		expect(result).toEqual([
			'wp-block-editor',
			'wp-server-side-render',
			'wp-api-fetch',
			'wp-element',
			'react',
		]);
	});

	it('should handle bundle object with chunk and asset info', () => {
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
			'style.css': {
				fileName: 'style.css',
				name: 'style',
				needsCodeReference: false,
				source: 'css content',
				type: 'asset' as const,
				code: '', // No code = should be filtered out
				imports: ['@wordpress/should-be-ignored'],
			} satisfies AssetInfo,
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
});
