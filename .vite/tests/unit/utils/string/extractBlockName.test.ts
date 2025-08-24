import { describe, it, expect } from 'vitest';
import { extractBlockName } from '../../../../src/common/utils/string/extractBlockName.ts';

describe('extractBlockName', () => {
	it('should extract block name from Unix-style path', () => {
		const dirPath = '/path/to/blocks/my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should extract block name from Windows-style path', () => {
		const dirPath = 'C:\\path\\to\\blocks\\my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should extract block name from mixed path separators', () => {
		const dirPath = '/path\\to/blocks\\my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should handle single directory name', () => {
		const dirPath = 'my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should handle path with trailing slash', () => {
		const dirPath = '/path/to/blocks/my-block/';
		const result = extractBlockName(dirPath);
		expect(result).toBe('unknown');
	});

	it('should handle path with trailing backslash', () => {
		const dirPath = 'C:\\path\\to\\blocks\\my-block\\';
		const result = extractBlockName(dirPath);
		expect(result).toBe('unknown');
	});

	it('should return "unknown" for empty string', () => {
		const dirPath = '';
		const result = extractBlockName(dirPath);
		expect(result).toBe('unknown');
	});

	it('should return "unknown" for root path', () => {
		const dirPath = '/';
		const result = extractBlockName(dirPath);
		expect(result).toBe('unknown');
	});

	it('should return "unknown" for Windows root path', () => {
		const dirPath = 'C:\\';
		const result = extractBlockName(dirPath);
		expect(result).toBe('unknown');
	});

	it('should handle complex block names with hyphens and numbers', () => {
		const dirPath = '/src/blocks/custom-block-123';
		const result = extractBlockName(dirPath);
		expect(result).toBe('custom-block-123');
	});

	it('should handle deep nested paths', () => {
		const dirPath =
			'/very/deep/nested/path/to/blocks/subfolder/my-awesome-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-awesome-block');
	});

	it('should handle paths with spaces in directory names', () => {
		const dirPath = '/path/to/my block with spaces';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my block with spaces');
	});
});
