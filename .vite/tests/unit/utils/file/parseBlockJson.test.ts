import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { parseBlockJson } from '../../../../src/common/utils/file/parseBlockJson.ts';
import type { WordPressBlockJSON } from '../../../../src/common/types/wordpress.ts';

describe('parseBlockJson', () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'parseBlockJson-test-'));
	});

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true });
	});

	it('should parse valid block.json file', () => {
		const blockData: WordPressBlockJSON = {
			name: 'my-theme/custom-block',
			title: 'Custom Block',
			description: 'A custom block for testing',
			category: 'widgets',
			icon: 'admin-customizer',
			keywords: ['custom', 'test'],
			apiVersion: 2,
		};

		const filePath = join(tempDir, 'block.json');
		writeFileSync(filePath, JSON.stringify(blockData, null, 2));

		const result = parseBlockJson(filePath);
		expect(result).toEqual(blockData);
	});

	it('should return null for non-existent file', () => {
		const filePath = join(tempDir, 'non-existent.json');
		const result = parseBlockJson(filePath);
		expect(result).toBeNull();
	});

	it('should return null for invalid JSON', () => {
		const filePath = join(tempDir, 'invalid.json');
		writeFileSync(filePath, '{ invalid json content');

		const result = parseBlockJson(filePath);
		expect(result).toBeNull();
	});

	it('should parse minimal block.json', () => {
		const blockData: WordPressBlockJSON = {
			name: 'my-theme/minimal-block',
		};

		const filePath = join(tempDir, 'minimal-block.json');
		writeFileSync(filePath, JSON.stringify(blockData));

		const result = parseBlockJson(filePath);
		expect(result).toEqual(blockData);
	});

	it('should parse block.json with all WordPress properties', () => {
		const blockData: WordPressBlockJSON = {
			$schema: 'https://schemas.wp.org/trunk/block.json',
			name: 'my-theme/full-block',
			title: 'Full Featured Block',
			description: 'A block with all possible properties',
			category: 'text',
			icon: 'editor-paragraph',
			keywords: ['full', 'featured', 'comprehensive'],
			textdomain: 'my-theme',
			apiVersion: 3,
			supports: {
				html: false,
				align: ['left', 'center', 'right'],
				color: {
					background: true,
					text: true,
				},
			},
			attributes: {
				content: {
					type: 'string',
					default: '',
				},
				alignment: {
					type: 'string',
					default: 'left',
				},
			},
			style: 'block-style',
			editorStyle: 'block-editor-style',
			viewStyle: 'block-view-style',
			script: 'block-script',
			editorScript: 'block-editor-script',
			viewScript: 'block-view-script',
		};

		const filePath = join(tempDir, 'full-block.json');
		writeFileSync(filePath, JSON.stringify(blockData, null, 2));

		const result = parseBlockJson(filePath);
		expect(result).toEqual(blockData);
	});

	it('should parse block.json with custom properties', () => {
		const blockData: WordPressBlockJSON = {
			name: 'my-theme/custom-props-block',
			title: 'Block with Custom Properties',
			customProperty: 'custom value',
			nested: {
				custom: {
					property: 'value',
				},
			},
			arrayProperty: ['item1', 'item2', 'item3'],
		};

		const filePath = join(tempDir, 'custom-props-block.json');
		writeFileSync(filePath, JSON.stringify(blockData));

		const result = parseBlockJson(filePath);
		expect(result).toEqual(blockData);
	});

	it('should handle empty JSON object', () => {
		const blockData = {};
		const filePath = join(tempDir, 'empty-block.json');
		writeFileSync(filePath, JSON.stringify(blockData));

		const result = parseBlockJson(filePath);
		expect(result).toEqual(blockData);
	});

	it('should handle JSON with special characters', () => {
		const blockData: WordPressBlockJSON = {
			name: 'my-theme/special-chars-block',
			title: 'Block with Special Characters: éñ中文🎉',
			description: 'Contains "quotes", \'apostrophes\', and\nnewlines',
		};

		const filePath = join(tempDir, 'special-chars-block.json');
		writeFileSync(filePath, JSON.stringify(blockData));

		const result = parseBlockJson(filePath);
		expect(result).toEqual(blockData);
	});

	it('should return null for empty file', () => {
		const filePath = join(tempDir, 'empty-file.json');
		writeFileSync(filePath, '');

		const result = parseBlockJson(filePath);
		expect(result).toBeNull();
	});

	it('should return null for file with only whitespace', () => {
		const filePath = join(tempDir, 'whitespace.json');
		writeFileSync(filePath, '   \n\t  ');

		const result = parseBlockJson(filePath);
		expect(result).toBeNull();
	});

	it('should handle nested objects and arrays', () => {
		const blockData: WordPressBlockJSON = {
			name: 'my-theme/complex-block',
			supports: {
				color: {
					background: true,
					text: true,
					gradients: true,
					palette: ['#000000', '#ffffff', '#ff0000'],
				},
				spacing: {
					margin: ['top', 'bottom'],
					padding: true,
				},
			},
			attributes: {
				items: {
					type: 'array',
					default: [],
					items: {
						type: 'object',
						properties: {
							id: { type: 'string' },
							value: { type: 'number' },
						},
					},
				},
			},
		};

		const filePath = join(tempDir, 'complex-block.json');
		writeFileSync(filePath, JSON.stringify(blockData, null, 2));

		const result = parseBlockJson(filePath);
		expect(result).toEqual(blockData);
	});
});
