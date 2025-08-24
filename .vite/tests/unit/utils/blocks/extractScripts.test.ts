import { describe, it, expect } from 'vitest';
import { extractScripts } from '../../../../src/common/utils/blocks/extractScripts.ts';

describe('extractScripts', () => {
	it('should extract viewScript from block.json', () => {
		const blockJson = {
			viewScript: 'file:./view.js',
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['view.js']);
	});

	it('should extract script from block.json', () => {
		const blockJson = {
			script: 'file:./index.js',
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['index.js']);
	});

	it('should extract editorScript from block.json', () => {
		const blockJson = {
			editorScript: 'file:./editor.js',
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['editor.js']);
	});

	it('should extract multiple scripts from arrays', () => {
		const blockJson = {
			viewScript: ['file:./view.js', 'file:./utils.js'],
			script: 'file:./index.js',
			editorScript: ['file:./editor.js'],
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual([
			'view.js',
			'utils.js',
			'index.js',
			'editor.js',
		]);
	});

	it('should filter out non-file scripts', () => {
		const blockJson = {
			viewScript: ['file:./view.js', 'wp-blocks', 'file:./utils.js'],
			script: 'lodash',
			editorScript: 'file:./editor.js',
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['view.js', 'utils.js', 'editor.js']);
	});

	it('should handle empty block.json', () => {
		const blockJson = {};
		const result = extractScripts(blockJson);
		expect(result).toEqual([]);
	});

	it('should handle null/undefined values', () => {
		const blockJson = {
			viewScript: null,
			script: undefined,
			editorScript: [],
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual([]);
	});

	it('should remove file:./ prefix correctly', () => {
		const blockJson = {
			viewScript: 'file:./assets/view.js',
			script: 'file:./build/index.js',
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['assets/view.js', 'build/index.js']);
	});

	it('should handle mixed data types in arrays', () => {
		const blockJson = {
			viewScript: ['file:./view.js', 123, null, 'file:./utils.js', true],
			script: [null, 'file:./index.js', undefined],
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['view.js', 'utils.js', 'index.js']);
	});

	it('should handle scripts without file prefix', () => {
		const blockJson = {
			viewScript: ['file:./view.js', './no-prefix.js', 'file:./utils.js'],
			script: 'no-prefix-single.js',
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['view.js', 'utils.js']); // Only file: prefixed scripts
	});

	it('should handle complex nested paths', () => {
		const blockJson = {
			viewScript: 'file:./src/blocks/button/view.js',
			script: 'file:./dist/assets/main.bundle.js',
			editorScript: 'file:./components/editor/index.js',
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual([
			'src/blocks/button/view.js',
			'dist/assets/main.bundle.js',
			'components/editor/index.js',
		]);
	});

	it('should handle WordPress core scripts mixed with file scripts', () => {
		const blockJson = {
			viewScript: ['wp-dom-ready', 'file:./view.js'],
			script: ['wp-blocks', 'wp-element', 'file:./index.js'],
			editorScript: ['wp-editor', 'file:./editor.js', 'wp-components'],
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['view.js', 'index.js', 'editor.js']);
	});
});
