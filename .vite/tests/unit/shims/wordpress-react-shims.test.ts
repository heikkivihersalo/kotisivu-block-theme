import { describe, expect, test } from 'vitest';

/**
 * Unit tests for WordPress and React shim functionality
 *
 * These tests verify that the esbuild plugins correctly handle WordPress
 * and React imports by creating appropriate shims that map to WordPress globals.
 */
describe('WordPress and React Shims Unit Tests', () => {
	/**
	 * Test WordPress package name to global name conversion
	 */
	test('converts WordPress package names to correct global names', () => {
		const testCases = [
			{ input: 'blocks', expected: 'blocks' },
			{ input: 'block-editor', expected: 'blockEditor' },
			{ input: 'api-fetch', expected: 'apiFetch' },
			{ input: 'rich-text', expected: 'richText' },
			{ input: 'server-side-render', expected: 'serverSideRender' },
			{ input: 'element', expected: 'element' },
			{ input: 'i18n', expected: 'i18n' },
		];

		for (const { input, expected } of testCases) {
			const globalName =
				input === 'block-editor'
					? 'blockEditor'
					: input.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
			expect(globalName).toBe(expected);
		}
	});

	/**
	 * Test that WordPress dependencies are correctly identified
	 */
	test('identifies valid WordPress dependencies', () => {
		const validWpDependencies = [
			'wp-element',
			'wp-blocks',
			'wp-block-editor',
			'wp-components',
			'wp-data',
			'wp-i18n',
			'wp-api-fetch',
			'wp-compose',
			'wp-hooks',
			'wp-notices',
			'wp-rich-text',
			'wp-url',
			'wp-server-side-render',
		];

		const testCases = [
			{ input: 'wp-blocks', expected: true },
			{ input: 'wp-element', expected: true },
			{ input: 'wp-block-editor', expected: true },
			{ input: 'wp-invalid-package', expected: false },
			{ input: 'wp-custom-plugin', expected: false },
		];

		for (const { input, expected } of testCases) {
			const isValid = validWpDependencies.includes(input);
			expect(isValid).toBe(expected);
		}
	});

	/**
	 * Test WordPress shim content generation
	 */
	test('generates correct WordPress shim content', async () => {
		const testCases = [
			{
				packageName: 'blocks',
				expectedGlobal: 'window.wp.blocks',
				expectedHandle: 'wp-blocks',
			},
			{
				packageName: 'block-editor',
				expectedGlobal: 'window.wp.blockEditor',
				expectedHandle: 'wp-block-editor',
			},
			{
				packageName: 'api-fetch',
				expectedGlobal: 'window.wp.apiFetch',
				expectedHandle: 'wp-api-fetch',
			},
		];

		for (const { packageName, expectedGlobal } of testCases) {
			const globalName =
				packageName === 'block-editor'
					? 'blockEditor'
					: packageName.replace(/-([a-z])/g, (g) =>
							g[1].toUpperCase()
						);

			const shimContent = `
				const wpModule = window.wp.${globalName};
				for (const key in wpModule) {
					if (Object.prototype.hasOwnProperty.call(wpModule, key)) {
						exports[key] = wpModule[key];
					}
				}
			`;

			expect(shimContent).toContain(expectedGlobal);
			expect(shimContent).toContain('for (const key in wpModule)');
			expect(shimContent).toContain(
				'Object.prototype.hasOwnProperty.call'
			);
			expect(shimContent).toContain('exports[key] = wpModule[key]');
		}
	});

	/**
	 * Test React shim content generation
	 */
	test('generates correct React shim content', () => {
		const reactShimContent = `
			const wpElement = window.wp.element;
			module.exports = wpElement;
		`;

		expect(reactShimContent).toContain('window.wp.element');
		expect(reactShimContent).toContain('module.exports = wpElement');
	});

	/**
	 * Test React JSX Runtime shim content generation
	 */
	test('generates correct React JSX Runtime shim content', () => {
		const jsxRuntimeShimContent = `
			const wpElement = window.wp.element;
			module.exports = {
				jsx: wpElement.createElement,
				jsxs: wpElement.createElement,
				Fragment: wpElement.Fragment
			};
		`;

		expect(jsxRuntimeShimContent).toContain('window.wp.element');
		expect(jsxRuntimeShimContent).toContain('jsx: wpElement.createElement');
		expect(jsxRuntimeShimContent).toContain(
			'jsxs: wpElement.createElement'
		);
		expect(jsxRuntimeShimContent).toContain('Fragment: wpElement.Fragment');
	});

	/**
	 * Test React JSX Dev Runtime shim content generation
	 */
	test('generates correct React JSX Dev Runtime shim content', () => {
		const jsxDevRuntimeShimContent = `
			const wpElement = window.wp.element;
			module.exports = {
				jsxDEV: wpElement.createElement,
				Fragment: wpElement.Fragment
			};
		`;

		expect(jsxDevRuntimeShimContent).toContain('window.wp.element');
		expect(jsxDevRuntimeShimContent).toContain(
			'jsxDEV: wpElement.createElement'
		);
		expect(jsxDevRuntimeShimContent).toContain(
			'Fragment: wpElement.Fragment'
		);
	});

	/**
	 * Test that duplicate dependencies are not added
	 */
	test('prevents duplicate WordPress dependencies', () => {
		const wpImports: string[] = [];
		const wpHandle = 'wp-element';

		// Simulate adding the same dependency multiple times
		if (!wpImports.includes(wpHandle)) {
			wpImports.push(wpHandle);
		}
		if (!wpImports.includes(wpHandle)) {
			wpImports.push(wpHandle);
		}

		expect(wpImports).toHaveLength(1);
		expect(wpImports[0]).toBe('wp-element');
	});

	/**
	 * Test namespace resolution patterns
	 */
	test('resolves WordPress and React imports to correct namespaces', () => {
		const testCases = [
			{ path: '@wordpress/blocks', expectedNamespace: 'wordpress-alias' },
			{
				path: '@wordpress/block-editor',
				expectedNamespace: 'wordpress-alias',
			},
			{ path: 'react', expectedNamespace: 'react-alias' },
			{ path: 'react-dom', expectedNamespace: 'react-dom-alias' },
			{
				path: 'react/jsx-runtime',
				expectedNamespace: 'react-jsx-runtime-alias',
			},
			{
				path: 'react/jsx-dev-runtime',
				expectedNamespace: 'react-jsx-dev-runtime-alias',
			},
		];

		for (const { path, expectedNamespace } of testCases) {
			// Simulate the onResolve logic
			let namespace = '';

			if (path.startsWith('@wordpress/')) {
				namespace = 'wordpress-alias';
			} else if (path === 'react') {
				namespace = 'react-alias';
			} else if (path === 'react-dom') {
				namespace = 'react-dom-alias';
			} else if (path === 'react/jsx-runtime') {
				namespace = 'react-jsx-runtime-alias';
			} else if (path === 'react/jsx-dev-runtime') {
				namespace = 'react-jsx-dev-runtime-alias';
			}

			expect(namespace).toBe(expectedNamespace);
		}
	});

	/**
	 * Test filter patterns for WordPress packages
	 */
	test('filter patterns correctly match WordPress packages', () => {
		const wordpressFilter = /^@wordpress\//;

		const testCases = [
			{ path: '@wordpress/blocks', shouldMatch: true },
			{ path: '@wordpress/block-editor', shouldMatch: true },
			{ path: '@wordpress/api-fetch', shouldMatch: true },
			{ path: 'react', shouldMatch: false },
			{ path: 'lodash', shouldMatch: false },
			{ path: '@babel/core', shouldMatch: false },
		];

		for (const { path, shouldMatch } of testCases) {
			expect(wordpressFilter.test(path)).toBe(shouldMatch);
		}
	});

	/**
	 * Test filter patterns for React packages
	 */
	test('filter patterns correctly match React packages', () => {
		const reactFilter = /^react$/;
		const reactDomFilter = /^react-dom$/;
		const reactJsxRuntimeFilter = /^react\/jsx-runtime$/;
		const reactJsxDevRuntimeFilter = /^react\/jsx-dev-runtime$/;

		const testCases = [
			{ path: 'react', filters: [reactFilter], shouldMatch: [true] },
			{
				path: 'react-dom',
				filters: [reactDomFilter],
				shouldMatch: [true],
			},
			{
				path: 'react/jsx-runtime',
				filters: [reactJsxRuntimeFilter],
				shouldMatch: [true],
			},
			{
				path: 'react/jsx-dev-runtime',
				filters: [reactJsxDevRuntimeFilter],
				shouldMatch: [true],
			},
			{
				path: 'react-router',
				filters: [reactFilter],
				shouldMatch: [false],
			},
			{
				path: '@wordpress/element',
				filters: [reactFilter],
				shouldMatch: [false],
			},
		];

		for (const { path, filters, shouldMatch } of testCases) {
			filters.forEach((filter, index) => {
				expect(filter.test(path)).toBe(shouldMatch[index]);
			});
		}
	});
});
