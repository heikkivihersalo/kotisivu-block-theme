import { describe, it, expect } from 'vitest';
import { generateVersionHash } from '../../../../src/common/utils/version/generateVersionHash.ts';
import type {
	BundlerAssetInfo,
	BundlerChunkInfo,
} from '../../../../src/common/types/index.ts';

describe('generateVersionHash', () => {
	it('should generate hash from first file with code', () => {
		const bundle = {
			'chunk1.js': {
				code: 'console.log("hello world");',
				imports: [],
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
			} satisfies BundlerChunkInfo,
		};

		const result = generateVersionHash(bundle);
		expect(result).toHaveLength(32);
		expect(result).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should return empty string for bundle with no code', () => {
		const bundle = {
			'style.css': {
				fileName: 'style.css',
				name: 'style',
				needsCodeReference: false,
				source: 'body { margin: 0; }',
				type: 'asset' as const,
				code: '', // Empty code
				imports: [],
			} satisfies BundlerAssetInfo,
		};

		const result = generateVersionHash(bundle);
		expect(result).toBe('');
	});

	it('should return empty string for empty bundle', () => {
		const bundle = {};
		const result = generateVersionHash(bundle);
		expect(result).toBe('');
	});

	it('should generate hash from first file with non-empty code', () => {
		const bundle = {
			'empty.js': {
				code: '', // Empty code
				imports: [],
				type: 'chunk' as const,
				fileName: 'empty.js',
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
				name: 'empty',
				preliminaryFileName: 'empty.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
			'main.js': {
				code: 'const x = 42;',
				imports: [],
				type: 'chunk' as const,
				fileName: 'main.js',
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

	it('should generate consistent hash for same code content', () => {
		const code = 'function test() { return true; }';

		const bundle1 = {
			'test1.js': {
				code,
				imports: [],
				type: 'chunk' as const,
				fileName: 'test1.js',
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
				name: 'test1',
				preliminaryFileName: 'test1.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
		};

		const bundle2 = {
			'test2.js': {
				code,
				imports: [],
				type: 'chunk' as const,
				fileName: 'test2.js',
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
				name: 'test2',
				preliminaryFileName: 'test2.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
		};

		const hash1 = generateVersionHash(bundle1);
		const hash2 = generateVersionHash(bundle2);

		expect(hash1).toBe(hash2);
	});

	it('should generate different hashes for different code content', () => {
		const bundle1 = {
			'file1.js': {
				code: 'console.log("hello");',
				imports: [],
				type: 'chunk' as const,
				fileName: 'file1.js',
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
				name: 'file1',
				preliminaryFileName: 'file1.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
		};

		const bundle2 = {
			'file2.js': {
				code: 'console.log("world");',
				imports: [],
				type: 'chunk' as const,
				fileName: 'file2.js',
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
				name: 'file2',
				preliminaryFileName: 'file2.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
		};

		const hash1 = generateVersionHash(bundle1);
		const hash2 = generateVersionHash(bundle2);

		expect(hash1).not.toBe(hash2);
	});

	it('should handle mixed asset and chunk types', () => {
		const bundle = {
			'styles.css': {
				fileName: 'styles.css',
				name: 'styles',
				needsCodeReference: false,
				source: 'css content',
				type: 'asset' as const,
				code: '', // Asset with no code
				imports: [],
			} satisfies BundlerAssetInfo,
			'main.js': {
				code: 'export const main = true;',
				imports: [],
				type: 'chunk' as const,
				fileName: 'main.js',
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

	it('should handle bundle with only assets (no chunks with code)', () => {
		const bundle = {
			'image.png': {
				fileName: 'image.png',
				name: 'image',
				needsCodeReference: false,
				source: new Uint8Array([137, 80, 78, 71]), // PNG header
				type: 'asset' as const,
				code: '',
				imports: [],
			} satisfies BundlerAssetInfo,
			'font.woff2': {
				fileName: 'font.woff2',
				name: 'font',
				needsCodeReference: false,
				source: 'font data',
				type: 'asset' as const,
				code: '',
				imports: [],
			} satisfies BundlerAssetInfo,
		};

		const result = generateVersionHash(bundle);
		expect(result).toBe('');
	});

	it('should use object iteration order to find first file with code', () => {
		const bundle = {
			'second.js': {
				code: 'console.log("second");',
				imports: [],
				type: 'chunk' as const,
				fileName: 'second.js',
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
				name: 'second',
				preliminaryFileName: 'second.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
			'first.js': {
				code: 'console.log("first");',
				imports: [],
				type: 'chunk' as const,
				fileName: 'first.js',
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
				name: 'first',
				preliminaryFileName: 'first.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
		};

		const result = generateVersionHash(bundle);

		// Should use the first file encountered (object iteration order)
		// In modern JavaScript, insertion order is preserved for string keys
		expect(result).toHaveLength(32);
		expect(result).toMatch(/^[a-f0-9]{32}$/);
	});
});
