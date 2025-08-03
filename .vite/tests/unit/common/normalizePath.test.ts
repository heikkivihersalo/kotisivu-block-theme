import { sep } from 'node:path';
import { describe, expect, it } from 'vitest';
import { normalizePath } from '../../../src/common/utils/lib/normalizePath';

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
		const path = '/home/user/documents';
		const result = normalizePath(path);
		expect(result).toBe(path + sep);
	});

	it('should not modify path that already ends with separator', () => {
		const path = `/home/user/documents${sep}`;
		const result = normalizePath(path);
		expect(result).toBe(path);
	});

	it('should handle empty string', () => {
		const result = normalizePath('');
		expect(result).toBe(sep);
	});

	it('should handle root path', () => {
		const result = normalizePath('/');
		// On Unix systems, '/' already ends with separator
		// On Windows, this would be different
		if (sep === '/') {
			expect(result).toBe('/');
		} else {
			expect(result).toBe('/' + sep);
		}
	});

	it('should handle Windows-style paths', () => {
		// Test with backslash separator (Windows-style)
		const path = 'C:\\Users\\Documents';
		const result = normalizePath(path);

		if (sep === '\\') {
			expect(result).toBe(path + '\\');
		} else {
			// On Unix systems, backslash is not a separator
			expect(result).toBe(path + sep);
		}
	});

	it('should handle Unix-style paths', () => {
		const path = '/home/user/documents';
		const result = normalizePath(path);
		expect(result).toBe(path + sep);
	});

	it('should handle relative paths', () => {
		const path = './src/components';
		const result = normalizePath(path);
		expect(result).toBe(path + sep);
	});

	it('should handle paths with double separators', () => {
		const path = `/home/user//documents${sep}`;
		const result = normalizePath(path);
		expect(result).toBe(path); // Already ends with separator
	});

	it('should handle single character paths', () => {
		const path = 'a';
		const result = normalizePath(path);
		expect(result).toBe(path + sep);
	});

	it('should handle paths with special characters', () => {
		const path = '/home/user/my-folder_123';
		const result = normalizePath(path);
		expect(result).toBe(path + sep);
	});

	it('should handle paths with spaces', () => {
		const path = '/home/user/My Documents';
		const result = normalizePath(path);
		expect(result).toBe(path + sep);
	});

	it('should handle paths with Unicode characters', () => {
		const path = '/home/用户/文档';
		const result = normalizePath(path);
		expect(result).toBe(path + sep);
	});

	it('should preserve multiple trailing separators', () => {
		const path = `/home/user/documents${sep}${sep}`;
		const result = normalizePath(path);
		expect(result).toBe(path); // Already ends with separator
	});

	it('should handle current directory path', () => {
		const path = '.';
		const result = normalizePath(path);
		expect(result).toBe(path + sep);
	});

	it('should handle parent directory path', () => {
		const path = '..';
		const result = normalizePath(path);
		expect(result).toBe(path + sep);
	});

	it('should handle network paths (UNC paths)', () => {
		const path = '//server/share/folder';
		const result = normalizePath(path);
		expect(result).toBe(path + sep);
	});

	it('should be consistent with repeated calls', () => {
		const path = '/home/user/documents';
		const result1 = normalizePath(path);
		const result2 = normalizePath(result1);

		expect(result1).toBe(result2);
	});
});
