import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

/**
 * Tests to validate that the WordPress and React shims are correctly implemented
 * in the actual processor files. These tests ensure the processors contain the
 * expected shim logic and prevent regressions.
 */
describe('Processor Shim Implementation Validation', () => {
	const PROCESSOR_FILES = [
		'.vite/src/common/processors/scriptProcessor.ts',
		'.vite/src/plugins/blocks-plugin/sideload/processors/assetProcessor.ts',
		'.vite/src/plugins/assets-plugin/sideload/processors/assetProcessor.ts',
	];

	/**
	 * Test that all processors contain WordPress shim logic
	 */
	test('processors contain WordPress dependency shim logic', () => {
		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Check for WordPress onResolve handler
			expect(content).toContain('@wordpress/');
			expect(content).toContain('wordpress-alias');

			// Check for WordPress onLoad handler with correct logic
			expect(content).toContain('window.wp.');
			expect(content).toContain('for (const key in wpModule)');
			expect(content).toContain(
				'Object.prototype.hasOwnProperty.call(wpModule, key)'
			);
			expect(content).toContain('exports[key] = wpModule[key]');

			// Check for block-editor special case handling
			expect(content).toContain('block-editor');
			expect(content).toContain('blockEditor');

			// Check for valid WordPress dependencies list
			expect(content).toContain('wp-element');
			expect(content).toContain('wp-blocks');
			expect(content).toContain('wp-block-editor');
			expect(content).toContain('wp-components');
		}
	});

	/**
	 * Test that all processors contain React shim logic
	 */
	test('processors contain React dependency shim logic', () => {
		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Check for React onResolve handler
			expect(content).toContain('filter: /^react$/');
			expect(content).toContain('react-alias');

			// Check for React onLoad handler
			expect(content).toContain('window.wp.element');
			expect(content).toContain('module.exports = wpElement');

			// Check for React DOM shim
			expect(content).toContain('filter: /^react-dom$/');
			expect(content).toContain('react-dom-alias');
		}
	});

	/**
	 * Test that all processors contain React JSX Runtime shim logic
	 */
	test('processors contain React JSX Runtime shim logic', () => {
		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Check for JSX Runtime onResolve handler
			expect(content).toContain('filter: /^react\\/jsx-runtime$/');
			expect(content).toContain('react-jsx-runtime-alias');

			// Check for JSX Runtime onLoad handler with correct exports
			expect(content).toContain('jsx: wpElement.createElement');
			expect(content).toContain('jsxs: wpElement.createElement');
			expect(content).toContain('Fragment: wpElement.Fragment');

			// Check for JSX Dev Runtime
			expect(content).toContain('filter: /^react\\/jsx-dev-runtime$/');
			expect(content).toContain('react-jsx-dev-runtime-alias');
			expect(content).toContain('jsxDEV: wpElement.createElement');
		}
	});

	/**
	 * Test that processors properly track WordPress dependencies
	 */
	test('processors track WordPress dependencies correctly', () => {
		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Check for wpImports array usage
			expect(content).toContain('wpImports');
			expect(content).toContain('!wpImports.includes');
			expect(content).toContain('wpImports.push');

			// Check for wp-element dependency tracking for React
			expect(content).toContain("wpImports.includes('wp-element')");
			expect(content).toContain("wpImports.push('wp-element')");
		}
	});

	/**
	 * Test that processors use consistent camelCase conversion
	 */
	test('processors use consistent camelCase conversion for WordPress globals', () => {
		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Check for specific block-editor to blockEditor conversion logic
			expect(content).toContain('block-editor');
			expect(content).toContain('blockEditor');

			// Check for general kebab-case to camelCase conversion pattern
			expect(content).toContain('/-([a-z])/g');
			expect(content).toContain('g[1].toUpperCase()');
		}
	});

	/**
	 * Test that processors contain valid WordPress dependency lists
	 */
	test('processors contain comprehensive WordPress dependency lists', () => {
		const requiredDependencies = [
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

		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			for (const dependency of requiredDependencies) {
				expect(content).toContain(`'${dependency}'`);
			}
		}
	});

	/**
	 * Test that processors don't contain problematic patterns
	 */
	test('processors avoid problematic shim patterns', () => {
		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Should not use direct require() calls for WordPress packages
			expect(content).not.toContain("require('@wordpress/");

			// Should not use incorrect window.wp property names
			expect(content).not.toContain('window.wp.block-editor');
			expect(content).not.toContain('window.wp.api-fetch');
			expect(content).not.toContain('window.wp.rich-text');

			// Should not have hardcoded module names in window.wp calls
			expect(content).not.toContain('window.wp.${moduleName}');
		}
	});

	/**
	 * Test that all processors handle namespace resolution consistently
	 */
	test('processors handle namespace resolution consistently', () => {
		const expectedNamespaces = [
			'wordpress-alias',
			'react-alias',
			'react-dom-alias',
			'react-jsx-runtime-alias',
			'react-jsx-dev-runtime-alias',
		];

		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			for (const namespace of expectedNamespaces) {
				expect(content).toContain(`namespace: '${namespace}'`);
			}
		}
	});

	/**
	 * Test that processors contain proper esbuild plugin structure
	 */
	test('processors contain proper esbuild plugin structure', () => {
		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Check for plugin name
			expect(content).toContain('alias-wordpress-and-react');

			// Check for setup function
			expect(content).toContain('setup(build)');

			// Check for onResolve and onLoad handlers
			expect(content).toContain('build.onResolve');
			expect(content).toContain('build.onLoad');

			// Check for proper return structure
			expect(content).toContain('return {');
			expect(content).toContain("loader: 'js'");
		}
	});

	/**
	 * Test script processor specific requirements
	 */
	test('script processor contains specific implementation details', () => {
		const scriptProcessorPath = join(
			process.cwd(),
			'.vite/src/common/processors/scriptProcessor.ts'
		);
		const content = readFileSync(scriptProcessorPath, 'utf-8');

		// Should be part of esbuild plugins array
		expect(content).toContain('plugins: [');

		// Should handle sourcemap configuration
		expect(content).toContain('sourcemap');

		// Should use ESBUILD_CONFIG constants
		expect(content).toContain('ESBUILD_CONFIG');
	});

	/**
	 * Test asset processor specific requirements
	 */
	test('asset processors contain specific implementation details', () => {
		const assetProcessorPaths = [
			'.vite/src/plugins/blocks-plugin/sideload/processors/assetProcessor.ts',
			'.vite/src/plugins/assets-plugin/sideload/processors/assetProcessor.ts',
		];

		for (const processorFile of assetProcessorPaths) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Should handle CSS extraction
			expect(content).toContain('outExtension');

			// Should include SCSS plugin
			expect(content).toContain('scssPlugin');

			// Should handle asset emission
			expect(content).toContain('context.emitFile');
		}
	});
});
