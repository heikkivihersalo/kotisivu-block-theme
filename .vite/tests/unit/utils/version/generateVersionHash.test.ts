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
				code: '',
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

	it('should generate consistent hash for same code content', () => {
		const code = 'function test() { return true; }';

		const createBundle = (fileName: string) => ({
			[fileName]: {
				code,
				type: 'chunk' as const,
				fileName,
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
				name: fileName.replace('.js', ''),
				preliminaryFileName: fileName,
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
		});

		const hash1 = generateVersionHash(createBundle('test1.js'));
		const hash2 = generateVersionHash(createBundle('test2.js'));

		expect(hash1).toBe(hash2);
	});

	it('should generate different hashes for different code content', () => {
		const createBundle = (code: string, fileName: string) => ({
			[fileName]: {
				code,
				type: 'chunk' as const,
				fileName,
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
				name: fileName.replace('.js', ''),
				preliminaryFileName: fileName,
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
		});

		const hash1 = generateVersionHash(
			createBundle('console.log("hello");', 'file1.js')
		);
		const hash2 = generateVersionHash(
			createBundle('console.log("world");', 'file2.js')
		);

		expect(hash1).not.toBe(hash2);
	});

	it('should skip files without code and use first file with code', () => {
		const bundle = {
			'empty.js': {
				code: '',
				type: 'chunk' as const,
				fileName: 'empty.js',
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
				name: 'empty',
				preliminaryFileName: 'empty.js',
				referencedFiles: [],
			} satisfies BundlerChunkInfo,
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
