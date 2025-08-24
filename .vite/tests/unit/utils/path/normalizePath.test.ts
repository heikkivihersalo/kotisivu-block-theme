import { describe, it, expect } from 'vitest';
import { sep } from 'node:path';
import { normalizePath } from '../../../../src/common/utils/path/normalizePath.ts';

describe('normalizePath', () => {
	it('should return null for null input', () => {
		const result = normalizePath(null);
		expect(result).toBeNull();
	});

	it('should return null for undefined input', () => {
		const result = normalizePath(undefined);
		expect(result).toBeNull();
	});

	it('should add separator to path without trailing separator', () => {
		const path = '/path/to/directory';
		const result = normalizePath(path);
		expect(result).toBe(`/path/to/directory${sep}`);
	});

	it('should return path unchanged if it already ends with separator', () => {
		const path = `/path/to/directory${sep}`;
		const result = normalizePath(path);
		expect(result).toBe(path);
	});

	it('should handle empty string', () => {
		const path = '';
		const result = normalizePath(path);
		expect(result).toBe(sep);
	});

	it('should handle root path', () => {
		const path = '/';
		const result = normalizePath(path);
		// On Unix systems, sep is '/', so it should remain unchanged
		// On Windows, sep is '\', so it would become '/\'
		expect(result).toBe(path.endsWith(sep) ? path : path + sep);
	});

	it('should handle Windows-style paths', () => {
		const path = 'C:\\Users\\test';
		const result = normalizePath(path);
		expect(result).toBe(`C:\\Users\\test${sep}`);
	});

	it('should handle relative paths', () => {
		const path = './src/components';
		const result = normalizePath(path);
		expect(result).toBe(`./src/components${sep}`);
	});

	it('should handle parent directory paths', () => {
		const path = '../utils';
		const result = normalizePath(path);
		expect(result).toBe(`../utils${sep}`);
	});

	it('should handle single character paths', () => {
		const path = 'a';
		const result = normalizePath(path);
		expect(result).toBe(`a${sep}`);
	});

	it('should handle paths with spaces', () => {
		const path = '/path/with spaces/directory';
		const result = normalizePath(path);
		expect(result).toBe(`/path/with spaces/directory${sep}`);
	});

	it('should handle already normalized paths with correct separator', () => {
		const path = `/already/normalized${sep}`;
		const result = normalizePath(path);
		expect(result).toBe(path);
	});
});
