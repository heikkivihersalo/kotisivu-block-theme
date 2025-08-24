import { describe, it, expect } from 'vitest';
import { trimSlashes } from '../../../../src/common/utils/path/trimSlashes.ts';

describe('trimSlashes', () => {
	it('should remove leading and trailing slashes', () => {
		expect(trimSlashes('/index.js')).toBe('index.js');
		expect(trimSlashes('index.js/')).toBe('index.js');
		expect(trimSlashes('/index.js/')).toBe('index.js');
		expect(trimSlashes('\\index.js\\')).toBe('index.js');
	});

	it('should remove multiple leading/trailing slashes', () => {
		expect(trimSlashes('///index.js')).toBe('index.js');
		expect(trimSlashes('index.js///')).toBe('index.js');
		expect(trimSlashes('///\\\\index.js\\\\///')).toBe('index.js');
	});

	it('should preserve internal slashes', () => {
		expect(trimSlashes('/path/to/index.js/')).toBe('path/to/index.js');
		expect(trimSlashes('\\path\\to\\index.js\\')).toBe(
			'path\\to\\index.js'
		);
	});

	it('should handle edge cases', () => {
		expect(trimSlashes('index.js')).toBe('index.js');
		expect(trimSlashes('')).toBe('');
		expect(trimSlashes('///')).toBe('');
		expect(trimSlashes('/')).toBe('');
		expect(trimSlashes('\\')).toBe('');
	});
});
