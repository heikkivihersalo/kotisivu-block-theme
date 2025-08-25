import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

/**
 * Tests to validate that the WordPress and React shims are correctly implemented
 * in the refactored structure. These tests ensure the processors use the Reac		// Should handle asset emission - either through fileEmitter or FileEmitter
		const hasFileEmitterUsage = content.includes('fileEmitter.emitFile');
		const hasDevFileEmitterUsage = content.includes('FileEmitter.safeEmitFile');
		const hasContextAddWatchFile = content.includes('context.addWatchFile');
		
		expect(hasFileEmitterUsage || hasDevFileEmitterUsage).toBe(true);
		expect(hasContextAddWatchFile).toBe(true);himPlugin
 * and that the plugin contains the expected shim logic.
 */
describe('Processor Shim Implementation Validation', () => {
	const PROCESSOR_FILES = [
		'.vite/src/common/processors/scriptProcessor.ts',
		'.vite/src/plugins/assets-plugin/processor.ts',
	];

	const SHIM_PLUGIN_FILE = '.vite/src/common/plugins/reactShimPlugin.ts';
	const SHIM_FUNCTIONS_FILE = '.vite/src/common/shims.ts';

	/**
	 * Test that all processors use ReactShimPlugin
	 */
	test('processors use ReactShimPlugin for WordPress and React shims', () => {
		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Check that processors import ReactShimPlugin
			expect(content).toContain('ReactShimPlugin');
			expect(
				content.includes("from '../plugins/reactShimPlugin.ts'") ||
					content.includes(
						"from '../../common/plugins/reactShimPlugin.ts'"
					)
			).toBe(true);

			// Check that ReactShimPlugin is used in esbuild plugins
			expect(content).toContain('ReactShimPlugin(wpImports)');
			expect(content).toContain(
				'plugins: [scssPlugin, ReactShimPlugin(wpImports)]'
			);
		}
	});

	/**
	 * Test that ReactShimPlugin contains WordPress dependency shim logic
	 */
	test('ReactShimPlugin contains WordPress dependency shim logic', () => {
		const filePath = join(process.cwd(), SHIM_PLUGIN_FILE);
		const content = readFileSync(filePath, 'utf-8');

		// Check for WordPress onResolve handler
		expect(content).toContain('@wordpress/');
		expect(content).toContain('wordpress-alias');

		// Check for valid WordPress dependencies list
		expect(content).toContain('wp-element');
		expect(content).toContain('wp-blocks');
		expect(content).toContain('wp-block-editor');
		expect(content).toContain('wp-components');

		// Check for wpImports tracking
		expect(content).toContain('wpImports');
		expect(content).toContain('!wpImports.includes');
		expect(content).toContain('wpImports.push');
	});

	/**
	 * Test that ReactShimPlugin contains React dependency shim logic
	 */
	test('ReactShimPlugin contains React dependency shim logic', () => {
		const filePath = join(process.cwd(), SHIM_PLUGIN_FILE);
		const content = readFileSync(filePath, 'utf-8');

		// Check for React onResolve handler
		expect(content).toContain('filter: /^react$/');
		expect(content).toContain('react-alias');

		// Check for React DOM shim
		expect(content).toContain('filter: /^react-dom$/');
		expect(content).toContain('react-dom-alias');

		// Check for wp-element dependency tracking for React
		expect(content).toContain("wpImports.includes('wp-element')");
		expect(content).toContain("wpImports.push('wp-element')");
	});

	/**
	 * Test that ReactShimPlugin contains React JSX Runtime shim logic
	 */
	test('ReactShimPlugin contains React JSX Runtime shim logic', () => {
		const filePath = join(process.cwd(), SHIM_PLUGIN_FILE);
		const content = readFileSync(filePath, 'utf-8');

		// Check for JSX Runtime onResolve handler
		expect(content).toContain('filter: /^react\\/jsx-runtime$/');
		expect(content).toContain('react-jsx-runtime-alias');

		// Check for JSX Dev Runtime
		expect(content).toContain('filter: /^react\\/jsx-dev-runtime$/');
		expect(content).toContain('react-jsx-dev-runtime-alias');
	});

	/**
	 * Test that processors properly pass wpImports array to ReactShimPlugin
	 */
	test('processors track WordPress dependencies correctly', () => {
		for (const processorFile of PROCESSOR_FILES) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Check for wpImports array usage in processors
			expect(content).toContain('wpImports');
			expect(content).toContain('const wpImports: string[] = []');
			expect(content).toContain('ReactShimPlugin(wpImports)');
		}
	});

	/**
	 * Test that ReactShimPlugin uses consistent camelCase conversion
	 */
	test('ReactShimPlugin uses consistent camelCase conversion for WordPress globals', () => {
		const filePath = join(process.cwd(), SHIM_PLUGIN_FILE);
		const content = readFileSync(filePath, 'utf-8');

		// Check for specific block-editor to blockEditor conversion logic
		expect(content).toContain('block-editor');
		expect(content).toContain('blockEditor');

		// Check for general kebab-case to camelCase conversion pattern
		expect(content).toContain('/-([a-z])/g');
		expect(content).toContain('g[1].toUpperCase()');
	});

	/**
	 * Test that ReactShimPlugin contains valid WordPress dependency lists
	 */
	test('ReactShimPlugin contains comprehensive WordPress dependency lists', () => {
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

		const filePath = join(process.cwd(), SHIM_PLUGIN_FILE);
		const content = readFileSync(filePath, 'utf-8');

		for (const dependency of requiredDependencies) {
			expect(content).toContain(`'${dependency}'`);
		}
	});

	/**
	 * Test that ReactShimPlugin doesn't contain problematic patterns
	 */
	test('ReactShimPlugin avoids problematic shim patterns', () => {
		const filePath = join(process.cwd(), SHIM_PLUGIN_FILE);
		const content = readFileSync(filePath, 'utf-8');

		// Should not use direct require() calls for WordPress packages
		expect(content).not.toContain("require('@wordpress/");

		// Should not use incorrect window.wp property names
		expect(content).not.toContain('window.wp.block-editor');
		expect(content).not.toContain('window.wp.api-fetch');
		expect(content).not.toContain('window.wp.rich-text');

		// Should not have hardcoded module names in window.wp calls
		expect(content).not.toContain('window.wp.${moduleName}');
	});

	/**
	 * Test that ReactShimPlugin handles namespace resolution consistently
	 */
	test('ReactShimPlugin handles namespace resolution consistently', () => {
		const expectedNamespaces = [
			'wordpress-alias',
			'react-alias',
			'react-dom-alias',
			'react-jsx-runtime-alias',
			'react-jsx-dev-runtime-alias',
		];

		const filePath = join(process.cwd(), SHIM_PLUGIN_FILE);
		const content = readFileSync(filePath, 'utf-8');

		for (const namespace of expectedNamespaces) {
			expect(content).toContain(`namespace: '${namespace}'`);
		}
	});

	/**
	 * Test that ReactShimPlugin contains proper esbuild plugin structure
	 */
	test('ReactShimPlugin contains proper esbuild plugin structure', () => {
		const filePath = join(process.cwd(), SHIM_PLUGIN_FILE);
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
	});

	/**
	 * Test that shim functions contain proper WordPress and React shim logic
	 */
	test('shim functions contain proper WordPress and React shim logic', () => {
		const filePath = join(process.cwd(), SHIM_FUNCTIONS_FILE);
		const content = readFileSync(filePath, 'utf-8');

		// Check for React element shim
		expect(content).toContain('window.wp.element');
		expect(content).toContain('module.exports = wpElement');

		// Check for JSX Runtime shim with correct exports
		expect(content).toContain('jsx: wpElement.createElement');
		expect(content).toContain('jsxs: wpElement.createElement');
		expect(content).toContain('Fragment: wpElement.Fragment');

		// Check for JSX Dev Runtime shim
		expect(content).toContain('jsxDEV: wpElement.createElement');

		// Check for WordPress module shim with correct logic
		expect(content).toContain('window.wp.');
		expect(content).toContain('for (const key in wpModule)');
		expect(content).toContain(
			'Object.prototype.hasOwnProperty.call(wpModule, key)'
		);
		expect(content).toContain('exports[key] = wpModule[key]');
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
			'.vite/src/plugins/assets-plugin/processor.ts',
		];

		for (const processorFile of assetProcessorPaths) {
			const filePath = join(process.cwd(), processorFile);
			const content = readFileSync(filePath, 'utf-8');

			// Should handle CSS extraction
			expect(content).toContain('outExtension');

			// Should include SCSS plugin
			expect(content).toContain('scssPlugin');

			// Should handle asset emission - either through fileEmitter or FileEmitter
			const hasFileEmitterUsage = content.includes(
				'fileEmitter.emitFile'
			);
			const hasDevFileEmitterUsage = content.includes(
				'FileEmitter.safeEmitFile'
			);
			const hasContextAddWatchFile = content.includes(
				'context.addWatchFile'
			);

			expect(hasFileEmitterUsage || hasDevFileEmitterUsage).toBe(true);
			expect(hasContextAddWatchFile).toBe(true);
		}
	});
});
