import { describe, it, expect } from 'vitest';
import { trimSlashes } from '../../../../src/common/utils/path/trimSlashes.ts';

describe('trimSlashes', () => {
	it('should remove leading forward slash', () => {
		const filename = '/index.js';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should remove trailing forward slash', () => {
		const filename = 'index.js/';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should remove leading backslash', () => {
		const filename = '\\index.js';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should remove trailing backslash', () => {
		const filename = 'index.js\\';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should remove both leading and trailing slashes', () => {
		const filename = '/index.js/';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should remove both leading and trailing backslashes', () => {
		const filename = '\\index.js\\';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should remove mixed leading and trailing slashes', () => {
		const filename = '/index.js\\';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should remove multiple leading slashes', () => {
		const filename = '///index.js';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should remove multiple trailing slashes', () => {
		const filename = 'index.js///';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should remove multiple mixed slashes', () => {
		const filename = '///\\\\index.js\\\\///';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should not affect internal slashes', () => {
		const filename = '/path/to/index.js/';
		const result = trimSlashes(filename);
		expect(result).toBe('path/to/index.js');
	});

	it('should not affect internal backslashes', () => {
		const filename = '\\path\\to\\index.js\\';
		const result = trimSlashes(filename);
		expect(result).toBe('path\\to\\index.js');
	});

	it('should handle filename without slashes', () => {
		const filename = 'index.js';
		const result = trimSlashes(filename);
		expect(result).toBe('index.js');
	});

	it('should handle empty string', () => {
		const filename = '';
		const result = trimSlashes(filename);
		expect(result).toBe('');
	});

	it('should handle string with only slashes', () => {
		const filename = '///\\\\\\';
		const result = trimSlashes(filename);
		expect(result).toBe('');
	});

	it('should handle single slash', () => {
		const filename = '/';
		const result = trimSlashes(filename);
		expect(result).toBe('');
	});

	it('should handle single backslash', () => {
		const filename = '\\';
		const result = trimSlashes(filename);
		expect(result).toBe('');
	});
});
