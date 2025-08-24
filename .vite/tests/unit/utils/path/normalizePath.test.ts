import { describe, it, expect } from 'vitest';
import { sep } from 'node:path';
import { normalizePath } from '../../../../src/common/utils/path/normalizePath.ts';

describe('normalizePath', () => {
	it('should return null for null/undefined input', () => {
		expect(normalizePath(null)).toBeNull();
		expect(normalizePath(undefined)).toBeNull();
	});

	it('should add separator to paths without trailing separator', () => {
		expect(normalizePath('/path/to/directory')).toBe(
			`/path/to/directory${sep}`
		);
		expect(normalizePath('C:\\Users\\test')).toBe(`C:\\Users\\test${sep}`);
		expect(normalizePath('./src/components')).toBe(
			`./src/components${sep}`
		);
		expect(normalizePath('')).toBe(sep);
	});

	it('should return path unchanged if it already ends with separator', () => {
		const pathWithSep = `/path/to/directory${sep}`;
		expect(normalizePath(pathWithSep)).toBe(pathWithSep);
	});
});
