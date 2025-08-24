import { describe, it, expect } from 'vitest';
import { convertToPhpArray } from '../../../../src/common/utils/php/convertToPhpArray.ts';

describe('convertToPhpArray', () => {
	it('should convert primitive values', () => {
		expect(convertToPhpArray(null)).toBe('null');
		expect(convertToPhpArray(true)).toBe('true');
		expect(convertToPhpArray(false)).toBe('false');
		expect(convertToPhpArray(42)).toBe('42');
		expect(convertToPhpArray('hello')).toBe("'hello'");
		expect(convertToPhpArray("it's working")).toBe("'it\\'s working'");
		expect(convertToPhpArray('path\\to\\file')).toBe(
			"'path\\\\to\\\\file'"
		);
	});

	it('should convert arrays', () => {
		expect(convertToPhpArray([])).toBe('[]');

		const simpleArray = ['item1', 'item2', 'item3'];
		const expectedSimple = `[
\t'item1',
\t'item2',
\t'item3'
]`;
		expect(convertToPhpArray(simpleArray)).toBe(expectedSimple);

		const mixedArray = ['string', 42, true, null];
		const expectedMixed = `[
\t'string',
\t42,
\ttrue,
\tnull
]`;
		expect(convertToPhpArray(mixedArray)).toBe(expectedMixed);
	});

	it('should convert objects', () => {
		expect(convertToPhpArray({})).toBe('[]');

		const simpleObject = {
			name: 'test-block',
			version: '1.0.0',
			active: true,
		};
		const result = convertToPhpArray(simpleObject);
		expect(result).toContain("'name' => 'test-block'");
		expect(result).toContain("'version' => '1.0.0'");
		expect(result).toContain("'active' => true");
	});

	it('should handle nested structures', () => {
		const nested = {
			block: {
				name: 'test-block',
				settings: {
					color: 'blue',
					size: 'large',
				},
			},
		};
		const result = convertToPhpArray(nested);
		expect(result).toContain("'block' => [");
		expect(result).toContain("'name' => 'test-block'");
		expect(result).toContain("'settings' => [");
		expect(result).toContain("'color' => 'blue'");
	});

	it('should handle objects with array values', () => {
		const input = {
			scripts: ['script1.js', 'script2.js'],
			styles: ['style1.css'],
		};
		const result = convertToPhpArray(input);
		expect(result).toContain("'scripts' => [");
		expect(result).toContain("'script1.js'");
		expect(result).toContain("'script2.js'");
		expect(result).toContain("'styles' => [");
		expect(result).toContain("'style1.css'");
	});

	it('should handle undefined as null', () => {
		const input = {
			defined: 'value',
			undefined: undefined,
		};
		const result = convertToPhpArray(input);
		expect(result).toContain("'defined' => 'value'");
		expect(result).toContain("'undefined' => null");
	});
});
