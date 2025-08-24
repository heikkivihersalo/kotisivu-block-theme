import { describe, it, expect } from 'vitest';
import { generatePhpArrayContent } from '../../../../src/common/utils/php/generatePhpArrayContent.ts';

describe('generatePhpArrayContent', () => {
	it('should generate basic PHP array content', () => {
		const blocks = {
			'test-theme/button': {
				name: 'test-theme/button',
				title: 'Button Block',
			},
		};

		const result = generatePhpArrayContent(blocks);

		expect(result).toContain('<?php');
		expect(result).toContain('Block Manifest');
		expect(result).toContain('Generated on:');
		expect(result).toContain('return [');
		expect(result).toContain("'test-theme/button' => [");
		expect(result).toContain("'name' => 'test-theme/button'");
		expect(result).toContain("'title' => 'Button Block'");
		expect(result.endsWith(';\n')).toBe(true);
	});

	it('should handle empty blocks object', () => {
		const blocks = {};
		const result = generatePhpArrayContent(blocks);

		expect(result).toContain('<?php');
		expect(result).toContain('return [];');
		expect(result.endsWith(';\n')).toBe(true);
	});

	it('should handle multiple blocks', () => {
		const blocks = {
			'test-theme/button': {
				name: 'test-theme/button',
				title: 'Button Block',
			},
			'test-theme/card': {
				name: 'test-theme/card',
				title: 'Card Block',
			},
		};

		const result = generatePhpArrayContent(blocks);

		expect(result).toContain("'test-theme/button' => [");
		expect(result).toContain("'test-theme/card' => [");
		expect(result).toContain("'title' => 'Button Block'");
		expect(result).toContain("'title' => 'Card Block'");
	});

	it('should include auto-generated comment with timestamp', () => {
		const blocks = { 'test-theme/button': { name: 'test-theme/button' } };
		const result = generatePhpArrayContent(blocks);

		expect(result).toContain('Auto-generated block manifest');
		expect(result).toContain('Generated on:');
		expect(result).toMatch(
			/Generated on: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
		);
	});

	it('should handle complex block configurations', () => {
		const blocks = {
			'test-theme/advanced-block': {
				name: 'test-theme/advanced-block',
				title: 'Advanced Block',
				attributes: {
					content: {
						type: 'string',
						default: 'Default content',
					},
					alignment: {
						type: 'string',
						enum: ['left', 'center', 'right'],
					},
				},
				supports: {
					html: false,
					color: {
						background: true,
						text: true,
					},
				},
				scripts: ['view.js', 'editor.js'],
				styles: ['style.css', 'editor.css'],
			},
		};

		const result = generatePhpArrayContent(blocks);

		expect(result).toContain("'attributes' => [");
		expect(result).toContain("'supports' => [");
		expect(result).toContain("'scripts' => [");
		expect(result).toContain("'styles' => [");
		expect(result).toContain("'view.js'");
		expect(result).toContain("'editor.js'");
		expect(result).toContain("'style.css'");
	});

	it('should handle special characters in block data', () => {
		const blocks = {
			'test-theme/special-block': {
				name: 'test-theme/special-block',
				title: 'Block with "quotes" and special chars',
				description:
					"It's a block with apostrophes and \\backslashes\\",
				keywords: ['keyword1', 'keyword-2', 'keyword_3'],
			},
		};

		const result = generatePhpArrayContent(blocks);

		expect(result).toContain('"quotes"');
		expect(result).toContain("\\'s a block");
		expect(result).toContain('\\\\backslashes\\\\');
		expect(result).toContain("'keyword1'");
		expect(result).toContain("'keyword-2'");
		expect(result).toContain("'keyword_3'");
	});

	it('should maintain proper PHP syntax', () => {
		const blocks = {
			'test-theme/syntax-test': {
				name: 'test-theme/syntax-test',
				active: true,
				deprecated: false,
				version: 1.5,
				config: null,
			},
		};

		const result = generatePhpArrayContent(blocks);

		expect(result).toContain("'active' => true");
		expect(result).toContain("'deprecated' => false");
		expect(result).toContain("'version' => 1.5");
		expect(result).toContain("'config' => null");
	});

	it('should generate valid PHP file structure', () => {
		const blocks = {
			'test-theme/test': {
				name: 'test-theme/test',
			},
		};

		const result = generatePhpArrayContent(blocks);

		// Check basic PHP file structure
		expect(result.startsWith('<?php')).toBe(true);
		expect(result).toContain('/**');
		expect(result).toContain(' */');
		expect(result).toContain('return [');
		expect(result.endsWith(';\n')).toBe(true);
	});

	it('should handle nested arrays and objects correctly', () => {
		const blocks = {
			'test-theme/nested': {
				metadata: {
					categories: ['text', 'design'],
					supports: {
						anchor: true,
						customClassName: false,
						spacing: {
							margin: true,
							padding: ['top', 'bottom'],
						},
					},
				},
			},
		};

		const result = generatePhpArrayContent(blocks);

		expect(result).toContain("'categories' => [");
		expect(result).toContain("'text'");
		expect(result).toContain("'design'");
		expect(result).toContain("'supports' => [");
		expect(result).toContain("'spacing' => [");
		expect(result).toContain("'padding' => [");
		expect(result).toContain("'top'");
		expect(result).toContain("'bottom'");
	});
});
