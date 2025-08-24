import { describe, it, expect } from 'vitest';
import { extractStyles } from '../../../../src/common/utils/blocks/extractStyles.ts';

describe('extractStyles', () => {
	it('should extract editorStyle from block.json', () => {
		const blockJson = {
			editorStyle: 'file:./editor.css',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['editor.css']);
	});

	it('should extract style from block.json', () => {
		const blockJson = {
			style: 'file:./style.css',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['style.css']);
	});

	it('should extract viewStyle from block.json', () => {
		const blockJson = {
			viewStyle: 'file:./view.css',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['view.css']);
	});

	it('should extract multiple styles from arrays', () => {
		const blockJson = {
			editorStyle: ['file:./editor.css', 'file:./editor-theme.css'],
			style: 'file:./style.css',
			viewStyle: ['file:./view.css'],
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual([
			'editor.css',
			'editor-theme.css',
			'style.css',
			'view.css',
		]);
	});

	it('should filter out non-file styles', () => {
		const blockJson = {
			editorStyle: [
				'file:./editor.css',
				'wp-edit-blocks',
				'file:./custom.css',
			],
			style: 'wp-blocks',
			viewStyle: 'file:./view.css',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['editor.css', 'custom.css', 'view.css']);
	});

	it('should handle empty block.json', () => {
		const blockJson = {};
		const result = extractStyles(blockJson);
		expect(result).toEqual([]);
	});

	it('should handle null/undefined values', () => {
		const blockJson = {
			editorStyle: null,
			style: undefined,
			viewStyle: [],
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual([]);
	});

	it('should remove file:./ prefix correctly', () => {
		const blockJson = {
			editorStyle: 'file:./assets/editor.scss',
			style: 'file:./build/style.css',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['assets/editor.scss', 'build/style.css']);
	});

	it('should handle mixed data types in arrays', () => {
		const blockJson = {
			editorStyle: [
				'file:./editor.css',
				123,
				null,
				'file:./theme.css',
				true,
			],
			style: [null, 'file:./style.css', undefined],
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['editor.css', 'theme.css', 'style.css']);
	});

	it('should handle styles without file prefix', () => {
		const blockJson = {
			editorStyle: [
				'file:./editor.css',
				'./no-prefix.css',
				'file:./theme.css',
			],
			style: 'no-prefix-single.css',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['editor.css', 'theme.css']); // Only file: prefixed styles
	});

	it('should handle SCSS and SASS files', () => {
		const blockJson = {
			editorStyle: 'file:./editor.scss',
			style: 'file:./style.sass',
			viewStyle: 'file:./view.less',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['editor.scss', 'style.sass', 'view.less']);
	});

	it('should handle complex nested paths', () => {
		const blockJson = {
			editorStyle: 'file:./src/blocks/button/editor.scss',
			style: 'file:./dist/assets/main.bundle.css',
			viewStyle: 'file:./components/styles/view.css',
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual([
			'src/blocks/button/editor.scss',
			'dist/assets/main.bundle.css',
			'components/styles/view.css',
		]);
	});

	it('should handle WordPress core styles mixed with file styles', () => {
		const blockJson = {
			editorStyle: ['wp-edit-blocks', 'file:./editor.css'],
			style: ['wp-blocks', 'wp-components', 'file:./style.css'],
			viewStyle: [
				'wp-block-library',
				'file:./view.css',
				'wp-theme-styles',
			],
		};
		const result = extractStyles(blockJson);
		expect(result).toEqual(['editor.css', 'style.css', 'view.css']);
	});
});
