/**
 * External dependencies
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * Internal dependencies
 */
import { generateVersionHash } from '../../../src/bundle/utils/generateVersionHash';
import * as commonUtils from '../../../src/common/index';

// Mock the generateFileHash function
vi.mock('../../../src/common/index', () => ({
	generateFileHash: vi.fn(),
}));

describe('generateVersionHash', () => {
	const mockGenerateFileHash = vi.mocked(commonUtils.generateFileHash);

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should generate hash from first file with code', () => {
		mockGenerateFileHash.mockReturnValue('abc123hash');

		const bundle = {
			'chunk1.js': {
				code: 'console.log("hello");',
				imports: [],
			},
			'chunk2.js': {
				code: 'console.log("world");',
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('abc123hash');
		expect(mockGenerateFileHash).toHaveBeenCalledWith(
			'console.log("hello");'
		);
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});

	it('should skip files without code and use first file with code', () => {
		mockGenerateFileHash.mockReturnValue('def456hash');

		const bundle = {
			'empty1.js': {
				imports: [],
			},
			'empty2.js': {
				imports: [],
			},
			'withcode.js': {
				code: 'const x = 1;',
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('def456hash');
		expect(mockGenerateFileHash).toHaveBeenCalledWith('const x = 1;');
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});

	it('should return empty string when no files have code', () => {
		const bundle = {
			'empty1.js': {
				imports: [],
			},
			'empty2.js': {
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('');
		expect(mockGenerateFileHash).not.toHaveBeenCalled();
	});

	it('should return empty string for empty bundle', () => {
		const bundle = {};

		const result = generateVersionHash(bundle);

		expect(result).toBe('');
		expect(mockGenerateFileHash).not.toHaveBeenCalled();
	});

	it('should handle files with null code', () => {
		mockGenerateFileHash.mockReturnValue('nulltest123');

		const bundle = {
			'nullcode.js': {
				code: null,
				imports: [],
			},
			'validcode.js': {
				code: 'valid code here',
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('nulltest123');
		expect(mockGenerateFileHash).toHaveBeenCalledWith('valid code here');
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});

	it('should handle files with undefined code', () => {
		mockGenerateFileHash.mockReturnValue('undefinedtest456');

		const bundle = {
			'undefinedcode.js': {
				code: undefined,
				imports: [],
			},
			'validcode.js': {
				code: 'another valid code',
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('undefinedtest456');
		expect(mockGenerateFileHash).toHaveBeenCalledWith('another valid code');
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});

	it('should handle files with empty string code', () => {
		mockGenerateFileHash.mockReturnValue('emptytest789');

		const bundle = {
			'emptycode.js': {
				code: '',
				imports: [],
			},
			'validcode.js': {
				code: 'non-empty code',
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('emptytest789');
		expect(mockGenerateFileHash).toHaveBeenCalledWith('non-empty code');
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});

	it('should use first truthy code value', () => {
		mockGenerateFileHash.mockReturnValue('firsttruthy123');

		const bundle = {
			'file1.js': {
				code: null,
				imports: [],
			},
			'file2.js': {
				code: undefined,
				imports: [],
			},
			'file3.js': {
				code: '',
				imports: [],
			},
			'file4.js': {
				code: 'first truthy code',
				imports: [],
			},
			'file5.js': {
				code: 'second truthy code',
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('firsttruthy123');
		expect(mockGenerateFileHash).toHaveBeenCalledWith('first truthy code');
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});

	it('should handle complex bundle with mixed file types', () => {
		mockGenerateFileHash.mockReturnValue('complex123');

		const bundle = {
			'chunk.js': {
				code: 'chunk code content',
				imports: ['@wordpress/element'],
			},
			'asset.css': {
				code: 'asset code content',
				imports: ['@wordpress/blocks'],
			},
			'empty.js': {
				imports: ['react'],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('complex123');
		expect(mockGenerateFileHash).toHaveBeenCalledWith('chunk code content');
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});

	it('should handle whitespace-only code as truthy', () => {
		mockGenerateFileHash.mockReturnValue('whitespace123');

		const bundle = {
			'whitespace.js': {
				code: '   \n\t  ',
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('whitespace123');
		expect(mockGenerateFileHash).toHaveBeenCalledWith('   \n\t  ');
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});

	it('should handle single character code', () => {
		mockGenerateFileHash.mockReturnValue('single123');

		const bundle = {
			'single.js': {
				code: 'x',
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('single123');
		expect(mockGenerateFileHash).toHaveBeenCalledWith('x');
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});

	it('should handle very long code content', () => {
		const longCode = 'a'.repeat(10000);
		mockGenerateFileHash.mockReturnValue('longcode123');

		const bundle = {
			'longfile.js': {
				code: longCode,
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('longcode123');
		expect(mockGenerateFileHash).toHaveBeenCalledWith(longCode);
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});

	it('should handle special characters in code', () => {
		const specialCode = '特殊文字 ñ áéíóú 🚀 \u0000 \uFFFF';
		mockGenerateFileHash.mockReturnValue('special123');

		const bundle = {
			'special.js': {
				code: specialCode,
				imports: [],
			},
		} as any;

		const result = generateVersionHash(bundle);

		expect(result).toBe('special123');
		expect(mockGenerateFileHash).toHaveBeenCalledWith(specialCode);
		expect(mockGenerateFileHash).toHaveBeenCalledTimes(1);
	});
});
