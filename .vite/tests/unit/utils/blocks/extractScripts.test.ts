import { describe, it, expect } from 'vitest';
import { extractScripts } from '../../../../src/common/utils/blocks/extractScripts.ts';

describe('extractScripts', () => {
	it('should extract file scripts from block.json', () => {
		const blockJson = {
			viewScript: 'file:./view.js',
			script: 'file:./index.js',
			editorScript: 'file:./editor.js',
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['view.js', 'index.js', 'editor.js']);
	});

	it('should handle arrays of scripts', () => {
		const blockJson = {
			viewScript: ['file:./view.js', 'file:./utils.js'],
			script: 'file:./index.js',
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['view.js', 'utils.js', 'index.js']);
	});

	it('should filter out non-file scripts', () => {
		const blockJson = {
			viewScript: ['file:./view.js', 'wp-blocks'],
			script: 'lodash',
			editorScript: 'file:./editor.js',
		};
		const result = extractScripts(blockJson);
		expect(result).toEqual(['view.js', 'editor.js']);
	});

	it('should handle empty block.json', () => {
		const result = extractScripts({});
		expect(result).toEqual([]);
	});
});
