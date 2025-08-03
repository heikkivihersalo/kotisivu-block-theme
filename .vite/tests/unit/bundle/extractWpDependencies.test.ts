/**
 * External dependencies
 */
import { describe, expect, it } from 'vitest';

/**
 * Internal dependencies
 */
import { extractWpDependencies } from '../../../src/common/utils';

describe('extractWpDependencies', () => {
	it('should extract WordPress dependencies from bundle files', () => {
		const bundle = {
			'chunk1.js': {
				code: 'import { createElement } from "@wordpress/element";',
				imports: ['@wordpress/element', '@wordpress/blocks'],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual(['wp-element', 'wp-blocks']);
	});

	it('should extract WordPress dependencies from asset files', () => {
		const bundle = {
			'style.css': {
				code: 'import { registerBlockType } from "@wordpress/blocks";',
				imports: ['@wordpress/blocks', '@wordpress/i18n'],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual(['wp-blocks', 'wp-i18n']);
	});

	it('should handle mixed chunk and asset files', () => {
		const bundle = {
			'chunk1.js': {
				code: 'console.log("chunk");',
				imports: ['@wordpress/element'],
			},
			'style.css': {
				code: 'console.log("asset");',
				imports: ['@wordpress/blocks'],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual(['wp-element', 'wp-blocks']);
	});

	it('should return unique dependencies when duplicates exist', () => {
		const bundle = {
			'chunk1.js': {
				code: 'console.log("chunk1");',
				imports: ['@wordpress/element', '@wordpress/blocks'],
			},
			'chunk2.js': {
				code: 'console.log("chunk2");',
				imports: ['@wordpress/element', '@wordpress/i18n'],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toHaveLength(3);
		expect(result).toContain('wp-element');
		expect(result).toContain('wp-blocks');
		expect(result).toContain('wp-i18n');
	});

	it('should handle files without code', () => {
		const bundle = {
			'empty.js': {
				imports: ['@wordpress/element'],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual([]);
	});

	it('should handle empty bundle', () => {
		const bundle = {};
		const result = extractWpDependencies(bundle);
		expect(result).toEqual([]);
	});

	it('should handle files with no WordPress imports', () => {
		const bundle = {
			'regular.js': {
				code: 'import React from "react";',
				imports: ['react', 'lodash'],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual(['react', 'lodash']);
	});

	it('should handle mixed WordPress and non-WordPress imports', () => {
		const bundle = {
			'mixed.js': {
				code: 'import { createElement } from "@wordpress/element";',
				imports: [
					'@wordpress/element',
					'react',
					'@wordpress/blocks',
					'lodash',
					'@wordpress/i18n',
				],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual([
			'wp-element',
			'react',
			'wp-blocks',
			'lodash',
			'wp-i18n',
		]);
	});

	it('should handle complex WordPress package names', () => {
		const bundle = {
			'complex.js': {
				code: 'import something from "@wordpress/rich-text";',
				imports: [
					'@wordpress/rich-text',
					'@wordpress/block-editor',
					'@wordpress/server-side-render',
				],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual([
			'wp-rich-text',
			'wp-block-editor',
			'wp-server-side-render',
		]);
	});

	it('should handle empty imports array', () => {
		const bundle = {
			'no-imports.js': {
				code: 'console.log("no imports");',
				imports: [],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual([]);
	});

	it('should preserve original order when no duplicates', () => {
		const bundle = {
			'ordered.js': {
				code: 'console.log("ordered");',
				imports: [
					'@wordpress/element',
					'@wordpress/blocks',
					'@wordpress/i18n',
					'@wordpress/data',
				],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual([
			'wp-element',
			'wp-blocks',
			'wp-i18n',
			'wp-data',
		]);
	});

	it('should handle malformed imports gracefully', () => {
		const bundle = {
			'malformed.js': {
				code: 'console.log("malformed");',
				imports: [
					'@wordpress/',
					'@wordpress',
					'@wordpress/element',
					'',
				],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toContain('wp-element');
		expect(result).toContain('wp-');
		expect(result).toContain('@wordpress');
		expect(result).toContain('');
	});

	it('should handle files with undefined code property', () => {
		const bundle = {
			'undefined-code.js': {
				imports: ['@wordpress/element'],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual([]);
	});

	it('should handle files with null code property', () => {
		const bundle = {
			'null-code.js': {
				code: null,
				imports: ['@wordpress/element'],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual([]);
	});

	it('should handle files with empty string code', () => {
		const bundle = {
			'empty-code.js': {
				code: '',
				imports: ['@wordpress/element'],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual([]);
	});

	it('should handle multiple file types together', () => {
		const bundle = {
			'chunk1.js': {
				code: 'console.log("chunk1");',
				imports: ['@wordpress/element'],
			},
			'asset1.css': {
				code: 'body { margin: 0; }',
				imports: ['@wordpress/blocks'],
			},
			'empty.js': {
				imports: ['@wordpress/i18n'],
			},
			'no-wp.js': {
				code: 'console.log("no wp");',
				imports: ['react', 'lodash'],
			},
		} as any;

		const result = extractWpDependencies(bundle);
		expect(result).toEqual(['wp-element', 'wp-blocks', 'react', 'lodash']);
	});
});
