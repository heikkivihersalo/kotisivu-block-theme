import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { parseBlockJson } from '../../../src/common/discovery/utils/parseBlockJson';

describe('parseBlockJson', () => {
	let testDir: string;

	beforeEach(() => {
		// Create a temporary directory for testing
		testDir = join(tmpdir(), `test-${Date.now()}-${Math.random()}`);
		mkdirSync(testDir, { recursive: true });
	});

	afterEach(() => {
		// Clean up test directory
		try {
			rmSync(testDir, { recursive: true, force: true });
		} catch (error) {
			// Ignore cleanup errors
		}
	});

	it('should successfully parse valid block.json file', () => {
		const validBlockJson = {
			name: 'test/example-block',
			title: 'Example Block',
			description: 'A test block',
			category: 'widgets',
			apiVersion: 3,
			supports: {
				className: false,
			},
		};

		const filePath = join(testDir, 'block.json');
		writeFileSync(filePath, JSON.stringify(validBlockJson, null, 2));

		const result = parseBlockJson(filePath);

		expect(result.error).toBeNull();
		expect(result.blockJson).toEqual(validBlockJson);
		expect(result.blockJson?.name).toBe('test/example-block');
		expect(result.blockJson?.title).toBe('Example Block');
	});

	it('should handle minimal valid block.json', () => {
		const minimalBlockJson = {
			name: 'test/minimal-block',
		};

		const filePath = join(testDir, 'block.json');
		writeFileSync(filePath, JSON.stringify(minimalBlockJson));

		const result = parseBlockJson(filePath);

		expect(result.error).toBeNull();
		expect(result.blockJson).toEqual(minimalBlockJson);
	});

	it('should handle block.json with all WordPress properties', () => {
		const fullBlockJson = {
			$schema: 'https://schemas.wp.org/trunk/block.json',
			apiVersion: 3,
			name: 'test/full-block',
			title: 'Full Block',
			description: 'A block with all properties',
			category: 'design',
			icon: 'layout',
			keywords: ['test', 'example'],
			textdomain: 'test-theme',
			supports: {
				className: false,
				anchor: true,
				html: true,
			},
			attributes: {
				content: {
					type: 'string',
					source: 'html',
					selector: 'p',
				},
			},
			style: 'file:./style-index.css',
			editorStyle: 'file:./index.css',
			editorScript: 'file:./index.js',
			viewScript: 'file:./view.js',
		};

		const filePath = join(testDir, 'block.json');
		writeFileSync(filePath, JSON.stringify(fullBlockJson, null, 2));

		const result = parseBlockJson(filePath);

		expect(result.error).toBeNull();
		expect(result.blockJson).toEqual(fullBlockJson);
		expect(result.blockJson?.supports?.className).toBe(false);
		expect(result.blockJson?.attributes?.content?.type).toBe('string');
	});

	it('should return error for non-existent file', () => {
		const nonExistentPath = join(testDir, 'does-not-exist.json');
		const result = parseBlockJson(nonExistentPath);

		expect(result.blockJson).toBeNull();
		expect(result.error).not.toBeNull();
		expect(result.error).toContain('Failed to parse block.json');
	});

	it('should return error for invalid JSON syntax', () => {
		const filePath = join(testDir, 'invalid.json');
		writeFileSync(filePath, '{ invalid json syntax }');

		const result = parseBlockJson(filePath);

		expect(result.blockJson).toBeNull();
		expect(result.error).not.toBeNull();
		expect(result.error).toContain('Failed to parse block.json');
	});

	it('should accept array JSON as valid (since arrays are objects)', () => {
		const filePath = join(testDir, 'array.json');
		writeFileSync(filePath, '["not", "an", "object"]');

		const result = parseBlockJson(filePath);

		expect(result.error).toBeNull();
		expect(result.blockJson).toEqual(['not', 'an', 'object']);
	});

	it('should return error for null JSON', () => {
		const filePath = join(testDir, 'null.json');
		writeFileSync(filePath, 'null');

		const result = parseBlockJson(filePath);

		expect(result.blockJson).toBeNull();
		expect(result.error).not.toBeNull();
		expect(result.error).toContain('Invalid block.json structure');
	});

	it('should return error for primitive JSON values', () => {
		const primitiveValues = ['42', '"string"', 'true', 'false'];

		primitiveValues.forEach((value, index) => {
			const filePath = join(testDir, `primitive-${index}.json`);
			writeFileSync(filePath, value);

			const result = parseBlockJson(filePath);

			expect(result.blockJson).toBeNull();
			expect(result.error).not.toBeNull();
			expect(result.error).toContain('Invalid block.json structure');
		});
	});

	it('should handle empty JSON object', () => {
		const filePath = join(testDir, 'empty.json');
		writeFileSync(filePath, '{}');

		const result = parseBlockJson(filePath);

		expect(result.error).toBeNull();
		expect(result.blockJson).toEqual({});
	});

	it('should handle block.json with nested objects', () => {
		const nestedBlockJson = {
			name: 'test/nested-block',
			supports: {
				color: {
					text: true,
					background: true,
					gradients: false,
				},
				spacing: {
					margin: ['top', 'bottom'],
					padding: true,
				},
			},
			attributes: {
				complexAttribute: {
					type: 'object',
					default: {
						nested: {
							value: 'test',
						},
					},
				},
			},
		};

		const filePath = join(testDir, 'nested.json');
		writeFileSync(filePath, JSON.stringify(nestedBlockJson, null, 2));

		const result = parseBlockJson(filePath);

		expect(result.error).toBeNull();
		expect(result.blockJson).toEqual(nestedBlockJson);
		expect(result.blockJson?.supports?.color?.text).toBe(true);
		expect(
			result.blockJson?.attributes?.complexAttribute?.default?.nested
				?.value
		).toBe('test');
	});

	it('should handle block.json with Unicode characters', () => {
		const unicodeBlockJson = {
			name: 'test/unicode-block',
			title: 'Тест 测试 🚀',
			description: 'Block with Unicode characters',
			keywords: ['测试', 'тест', '🎯'],
		};

		const filePath = join(testDir, 'unicode.json');
		writeFileSync(
			filePath,
			JSON.stringify(unicodeBlockJson, null, 2),
			'utf-8'
		);

		const result = parseBlockJson(filePath);

		expect(result.error).toBeNull();
		expect(result.blockJson).toEqual(unicodeBlockJson);
		expect(result.blockJson?.title).toBe('Тест 测试 🚀');
	});

	it('should handle large block.json files', () => {
		const largeBlockJson = {
			name: 'test/large-block',
			title: 'Large Block',
			attributes: {},
		};

		// Add many attributes to create a large file
		for (let i = 0; i < 1000; i++) {
			(largeBlockJson.attributes as any)[`attribute${i}`] = {
				type: 'string',
				default: `value${i}`.repeat(10),
			};
		}

		const filePath = join(testDir, 'large.json');
		writeFileSync(filePath, JSON.stringify(largeBlockJson, null, 2));

		const result = parseBlockJson(filePath);

		expect(result.error).toBeNull();
		expect(result.blockJson?.name).toBe('test/large-block');
		expect(Object.keys(result.blockJson?.attributes || {})).toHaveLength(
			1000
		);
	});

	it('should handle block.json with special characters in strings', () => {
		const specialCharBlockJson = {
			name: 'test/special-char-block',
			title: 'Block with "quotes" and \\backslashes\\',
			description: 'Contains\nnewlines\tand\ttabs',
			keywords: ['quote"test', 'backslash\\test', 'newline\ntest'],
		};

		const filePath = join(testDir, 'special-chars.json');
		writeFileSync(filePath, JSON.stringify(specialCharBlockJson, null, 2));

		const result = parseBlockJson(filePath);

		expect(result.error).toBeNull();
		expect(result.blockJson).toEqual(specialCharBlockJson);
		expect(result.blockJson?.title).toContain('"quotes"');
		expect(result.blockJson?.description).toContain('\n');
	});

	it('should handle block.json with additional unknown properties', () => {
		const extendedBlockJson = {
			name: 'test/extended-block',
			title: 'Extended Block',
			customProperty: 'custom value',
			anotherCustom: {
				nested: true,
				value: 42,
			},
		};

		const filePath = join(testDir, 'extended.json');
		writeFileSync(filePath, JSON.stringify(extendedBlockJson, null, 2));

		const result = parseBlockJson(filePath);

		expect(result.error).toBeNull();
		expect(result.blockJson).toEqual(extendedBlockJson);
		expect((result.blockJson as any)?.customProperty).toBe('custom value');
		expect((result.blockJson as any)?.anotherCustom?.nested).toBe(true);
	});
});
