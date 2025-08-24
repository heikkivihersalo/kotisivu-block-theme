import { describe, it, expect } from 'vitest';
import { extractStyles } from '../../../../src/common/utils/blocks/extractStyles.ts';

describe('extractStyles', () => {
	it('should extract file styles from block.json', () => {
		const blockJson = {
			editorStyle: 'file:./editor.css',
			style: 'file:./style.css',
			viewStyle: 'file:./view.css',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['editor.css', 'style.css', 'view.css']);
	});

	it('should handle arrays of styles', () => {
		const blockJson = {
			editorStyle: ['file:./editor.css', 'file:./theme.css'],
			style: 'file:./style.css',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['editor.css', 'theme.css', 'style.css']);
	});

	it('should filter out non-file styles', () => {
		const blockJson = {
			editorStyle: ['file:./editor.css', 'wp-edit-blocks'],
			style: 'wp-blocks',
			viewStyle: 'file:./view.css',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['editor.css', 'view.css']);
	});

	it('should handle empty block.json', () => {
		const result = extractStyles({});
		expect(result).toEqual([]);
	});
});
