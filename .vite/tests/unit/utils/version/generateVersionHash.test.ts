import { describe, it, expect } from 'vitest';
import { generateVersionHash } from '../../../../src/common/utils/version/generateVersionHash.ts';
import type {
	BundlerAssetInfo,
	BundlerChunkInfo,
} from '../../../../src/common/types/index.ts';

describe('generateVersionHash', () => {
	it('should generate hash from file content', () => {
		const bundle = {
			'chunk1.js': {
				code: 'console.log("hello world");',
				type: 'chunk' as const,
				fileName: 'chunk1.js',
				imports: [],
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
			} satisfies BundlerChunkInfo,
			'style.css': {
				fileName: 'style.css',
				name: 'style',
				needsCodeReference: false,
				source: 'body { margin: 0; }',
				type: 'asset' as const,
				code: '',
				imports: [],
			} satisfies BundlerAssetInfo,
		};

		const result = generateVersionHash(bundle);
		expect(result).toHaveLength(32);
		expect(result).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should return a consistent hash for an empty bundle', () => {
		const bundle = {};
		const result = generateVersionHash(bundle);
		expect(result).toBe('d41d8cd98f00b204e9800998ecf8427e'); // MD5 of empty string
	});

	it('should generate consistent hash for same content regardless of filename', () => {
		const createBundle = (
			code: string,
			source: string,
			fileName1: string,
			fileName2: string
		) => ({
			[fileName1]: {
				code,
				type: 'chunk' as const,
				fileName: fileName1,
				imports: [],
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
				name: fileName1.replace('.js', ''),
				preliminaryFileName: fileName1,
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
			[fileName2]: {
				source,
				type: 'asset' as const,
				fileName: fileName2,
				name: fileName2.replace('.css', ''),
				needsCodeReference: false,
				code: '',
				imports: [],
			} satisfies BundlerAssetInfo,
		});

		const bundle1 = createBundle(
			'console.log("hello");',
			'body { color: red; }',
			'a.js',
			'b.css'
		);
		const bundle2 = createBundle(
			'console.log("hello");',
			'body { color: red; }',
			'c.js',
			'd.css'
		);

		const hash1 = generateVersionHash(bundle1);
		const hash2 = generateVersionHash(bundle2);

		expect(hash1).toBe(hash2);
	});

	it('should generate different hashes for different content', () => {
		const createBundle = (code: string, source: string) => ({
			'file.js': {
				code,
				type: 'chunk' as const,
				fileName: 'file.js',
				imports: [],
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
				name: 'file',
				preliminaryFileName: 'file.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
			'style.css': {
				source,
				type: 'asset' as const,
				fileName: 'style.css',
				name: 'style',
				needsCodeReference: false,
				code: '',
				imports: [],
			} satisfies BundlerAssetInfo,
		});

		const hash1 = generateVersionHash(
			createBundle('console.log("hello");', 'body { color: red; }')
		);
		const hash2 = generateVersionHash(
			createBundle('console.log("world");', 'body { color: blue; }')
		);

		expect(hash1).not.toBe(hash2);
	});

	it('should handle files without code or source gracefully', () => {
		const bundle = {
			'empty-chunk.js': {
				code: '',
				type: 'chunk' as const,
				fileName: 'empty-chunk.js',
				imports: [],
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
				name: 'empty-chunk',
				preliminaryFileName: 'empty-chunk.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
			'empty-asset.css': {
				source: '',
				type: 'asset' as const,
				fileName: 'empty-asset.css',
				name: 'empty-asset',
				needsCodeReference: false,
				code: '',
				imports: [],
			} satisfies BundlerAssetInfo,
			'main.js': {
				code: 'const x = 42;',
				type: 'chunk' as const,
				fileName: 'main.js',
				imports: [],
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
				name: 'main',
				preliminaryFileName: 'main.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
		};

		const result = generateVersionHash(bundle);
		expect(result).toHaveLength(32);
		expect(result).toMatch(/^[a-f0-9]{32}$/);
	});
});
