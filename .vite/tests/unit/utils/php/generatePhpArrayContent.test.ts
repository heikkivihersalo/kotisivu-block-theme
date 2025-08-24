import { describe, it, expect } from 'vitest';
import { generatePhpArrayContent } from '../../../../src/common/utils/php/generatePhpArrayContent.ts';

describe('generatePhpArrayContent', () => {
	it('should generate PHP file with header and array content', () => {
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
		const result = generatePhpArrayContent({});
		expect(result).toContain('<?php');
		expect(result).toContain('return [];');
	});

	it('should handle multiple blocks', () => {
		const blocks = {
			'theme/block1': { name: 'theme/block1' },
			'theme/block2': { name: 'theme/block2' },
		};

		const result = generatePhpArrayContent(blocks);
		expect(result).toContain("'theme/block1'");
		expect(result).toContain("'theme/block2'");
	});
});
