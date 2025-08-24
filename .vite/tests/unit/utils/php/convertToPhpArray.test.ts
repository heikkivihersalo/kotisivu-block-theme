import { describe, it, expect } from 'vitest';
import { convertToPhpArray } from '../../../../src/common/utils/php/convertToPhpArray.ts';

describe('convertToPhpArray', () => {
	it('should convert null to PHP null', () => {
		const result = convertToPhpArray(null);
		expect(result).toBe('null');
	});

	it('should convert boolean true to PHP true', () => {
		const result = convertToPhpArray(true);
		expect(result).toBe('true');
	});

	it('should convert boolean false to PHP false', () => {
		const result = convertToPhpArray(false);
		expect(result).toBe('false');
	});

	it('should convert numbers to strings', () => {
		expect(convertToPhpArray(42)).toBe('42');
		expect(convertToPhpArray(3.14)).toBe('3.14');
		expect(convertToPhpArray(-10)).toBe('-10');
		expect(convertToPhpArray(0)).toBe('0');
	});

	it('should convert strings with proper escaping', () => {
		expect(convertToPhpArray('hello')).toBe("'hello'");
		expect(convertToPhpArray("it's working")).toBe("'it\\'s working'");
		expect(convertToPhpArray('path\\to\\file')).toBe(
			"'path\\\\to\\\\file'"
		);
		expect(convertToPhpArray('')).toBe("''");
	});

	it('should convert empty arrays', () => {
		const result = convertToPhpArray([]);
		expect(result).toBe('[]');
	});

	it('should convert simple arrays', () => {
		const input = ['item1', 'item2', 'item3'];
		const result = convertToPhpArray(input);
		const expected = `[
\t'item1',
\t'item2',
\t'item3'
]`;
		expect(result).toBe(expected);
	});

	it('should convert mixed type arrays', () => {
		const input = ['string', 42, true, null];
		const result = convertToPhpArray(input);
		const expected = `[
\t'string',
\t42,
\ttrue,
\tnull
]`;
		expect(result).toBe(expected);
	});

	it('should convert empty objects', () => {
		const result = convertToPhpArray({});
		expect(result).toBe('[]');
	});

	it('should convert simple objects', () => {
		const input = {
			name: 'test-block',
			version: '1.0.0',
			active: true,
		};
		const result = convertToPhpArray(input);
		const expected = `[
\t'name' => 'test-block',
\t'version' => '1.0.0',
\t'active' => true
]`;
		expect(result).toBe(expected);
	});

	it('should convert nested objects', () => {
		const input = {
			block: {
				name: 'test-block',
				settings: {
					color: 'blue',
					size: 'large',
				},
			},
		};
		const result = convertToPhpArray(input);
		const expected = `[
\t'block' => [
\t\t'name' => 'test-block',
\t\t'settings' => [
\t\t\t'color' => 'blue',
\t\t\t'size' => 'large'
\t\t]
\t]
]`;
		expect(result).toBe(expected);
	});

	it('should convert nested arrays', () => {
		const input = [
			['item1', 'item2'],
			['item3', 'item4'],
		];
		const result = convertToPhpArray(input);
		const expected = `[
\t[
\t\t'item1',
\t\t'item2'
\t],
\t[
\t\t'item3',
\t\t'item4'
\t]
]`;
		expect(result).toBe(expected);
	});

	it('should convert objects with array values', () => {
		const input = {
			scripts: ['script1.js', 'script2.js'],
			styles: ['style1.css'],
		};
		const result = convertToPhpArray(input);
		const expected = `[
\t'scripts' => [
\t\t'script1.js',
\t\t'script2.js'
\t],
\t'styles' => [
\t\t'style1.css'
\t]
]`;
		expect(result).toBe(expected);
	});

	it('should handle complex block.json structure', () => {
		const input = {
			name: 'test-theme/button',
			title: 'Button Block',
			attributes: {
				text: {
					type: 'string',
					default: 'Click me',
				},
				size: {
					type: 'string',
					enum: ['small', 'medium', 'large'],
				},
			},
			supports: {
				html: false,
				color: true,
			},
		};
		const result = convertToPhpArray(input);

		expect(result).toContain("'name' => 'test-theme/button'");
		expect(result).toContain("'title' => 'Button Block'");
		expect(result).toContain("'attributes' => [");
		expect(result).toContain("'supports' => [");
		expect(result).toContain("'html' => false");
		expect(result).toContain("'color' => true");
	});

	it('should handle special characters in strings', () => {
		const input = {
			description:
				'This is a "quoted" string with special chars: @#$%^&*()',
			path: '/path/with/special-chars_123',
		};
		const result = convertToPhpArray(input);

		expect(result).toContain(
			'\'This is a "quoted" string with special chars: @#$%^&*()\''
		);
		expect(result).toContain("'/path/with/special-chars_123'");
	});

	it('should maintain proper indentation for deep nesting', () => {
		const input = {
			level1: {
				level2: {
					level3: {
						value: 'deep',
					},
				},
			},
		};
		const result = convertToPhpArray(input);

		expect(result).toContain("\t\t\t\t'value' => 'deep'");
	});

	it('should handle undefined values as null', () => {
		const input = {
			defined: 'value',
			undefined: undefined,
		};
		const result = convertToPhpArray(input);

		expect(result).toContain("'defined' => 'value'");
		expect(result).toContain("'undefined' => null");
	});
});
