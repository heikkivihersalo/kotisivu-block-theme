import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { glob } from 'glob';
import { beforeAll, describe, expect, test } from 'vitest';

/**
 * Integration tests for WordPress and React shims in the build process
 *
 * These tests ensure that WordPress dependencies and React imports are correctly
 * shimmed to use WordPress globals (window.wp.*) instead of bundling the libraries.
 * This prevents "Dynamic require" errors and ensures proper WordPress integration.
 */
describe('WordPress and React Shims Integration', () => {
	const BUILD_DIR = join(process.cwd(), 'build');

	// WordPress packages that should be shimmed
	const WORDPRESS_PACKAGES = [
		'blocks',
		'block-editor',
		'element',
		'components',
		'data',
		'i18n',
		'api-fetch',
		'compose',
		'hooks',
		'notices',
		'rich-text',
		'url',
		'server-side-render',
	];

	// React imports that should be shimmed
	const REACT_IMPORTS = [
		'react',
		'react-dom',
		'react/jsx-runtime',
		'react/jsx-dev-runtime',
	];

	beforeAll(() => {
		if (!existsSync(BUILD_DIR)) {
			throw new Error(
				'Build directory does not exist. Run `npm run build` first.'
			);
		}
	});

	/**
	 * Test that WordPress dependencies are correctly shimmed in generated JS files
	 */
	test('WordPress dependencies are shimmed to window.wp globals', async () => {
		const jsFiles = await glob(join(BUILD_DIR, '**/*.js'));
		expect(jsFiles.length).toBeGreaterThan(0);

		// Test at least one representative file from each category
		const testFiles = jsFiles
			.filter(
				(file) =>
					file.includes('blocks/custom/') ||
					file.includes('blocks/parts/') ||
					file.includes('template-parts/') ||
					file.includes('page-templates/')
			)
			.slice(0, 5); // Test first 5 files to avoid long test times

		for (const jsFile of testFiles) {
			const content = readFileSync(jsFile, 'utf-8');

			// Check for WordPress package shims
			const wpShims =
				content.match(/wordpress-alias:@wordpress\/[\w-]+/g) || [];

			for (const shim of wpShims) {
				const packageName = shim.replace(
					'wordpress-alias:@wordpress/',
					''
				);

				// Verify the shim contains correct window.wp reference
				const expectedGlobalName =
					packageName === 'block-editor'
						? 'blockEditor'
						: packageName.replace(/-([a-z])/g, (_, letter) =>
								letter.toUpperCase()
							);

				expect(content).toContain(`window.wp.${expectedGlobalName}`);

				// Verify the shim exports all properties
				expect(content).toContain('for (const key in wpModule)');
				expect(content).toContain(
					'Object.prototype.hasOwnProperty.call(wpModule, key)'
				);
				expect(content).toContain('exports[key] = wpModule[key]');
			}
		}
	});

	/**
	 * Test that React imports are correctly shimmed to WordPress element
	 */
	test('React imports are shimmed to window.wp.element', async () => {
		const jsFiles = await glob(join(BUILD_DIR, '**/*.js'));

		const testFiles = jsFiles
			.filter(
				(file) =>
					file.includes('blocks/custom/') ||
					file.includes('blocks/parts/')
			)
			.slice(0, 3);

		for (const jsFile of testFiles) {
			const content = readFileSync(jsFile, 'utf-8');

			// Check for React shims
			if (content.includes('react-alias:react')) {
				expect(content).toContain('window.wp.element');
				expect(content).toContain('module.exports = wpElement');
			}

			// Check for React DOM shims
			if (content.includes('react-dom-alias:react-dom')) {
				expect(content).toContain('window.wp.element');
				expect(content).toContain('module.exports = wpElement');
			}

			// Check for React JSX Runtime shims
			if (content.includes('react-jsx-runtime-alias:react/jsx-runtime')) {
				expect(content).toContain('window.wp.element');
				expect(content).toContain('jsx: wpElement.createElement');
				expect(content).toContain('jsxs: wpElement.createElement');
				expect(content).toContain('Fragment: wpElement.Fragment');
			}

			// Check for React JSX Dev Runtime shims
			if (
				content.includes(
					'react-jsx-dev-runtime-alias:react/jsx-dev-runtime'
				)
			) {
				expect(content).toContain('window.wp.element');
				expect(content).toContain('jsxDEV: wpElement.createElement');
				expect(content).toContain('Fragment: wpElement.Fragment');
			}
		}
	});

	/**
	 * Test that WordPress dependencies are correctly tracked in asset files
	 */
	test('WordPress dependencies are tracked in PHP asset files', async () => {
		const assetFiles = await glob(join(BUILD_DIR, '**/*.asset.php'));
		expect(assetFiles.length).toBeGreaterThan(0);

		for (const assetFile of assetFiles) {
			const content = readFileSync(assetFile, 'utf-8');

			// Parse the PHP array to get dependencies
			const dependenciesMatch = content.match(
				/"dependencies" => \[(.*?)\]/
			);
			if (dependenciesMatch) {
				const dependenciesStr = dependenciesMatch[1];

				// Check for common WordPress dependencies
				if (dependenciesStr.includes('wp-blocks')) {
					expect(dependenciesStr).toMatch(/["']wp-blocks["']/);
				}
				if (dependenciesStr.includes('wp-element')) {
					expect(dependenciesStr).toMatch(/["']wp-element["']/);
				}
				if (dependenciesStr.includes('wp-block-editor')) {
					expect(dependenciesStr).toMatch(/["']wp-block-editor["']/);
				}

				// Ensure no invalid dependencies
				expect(dependenciesStr).not.toContain('undefined');
				expect(dependenciesStr).not.toContain('null');

				// Check for empty dependency values (but allow empty dependency arrays)
				if (dependenciesStr.trim() !== '') {
					const deps = dependenciesStr
						.split(',')
						.map((d) => d.trim())
						.filter((d) => d !== '');
					for (const dep of deps) {
						expect(dep).toMatch(/^["'][^"']+["']$/); // Should be quoted non-empty string
					}
				}
			}
		}
	});

	/**
	 * Test that no dynamic require errors exist in generated code
	 */
	test('generated code does not contain dynamic require statements', async () => {
		const jsFiles = await glob(join(BUILD_DIR, '**/*.js'));

		for (const jsFile of jsFiles) {
			const content = readFileSync(jsFile, 'utf-8');

			// Check that there are no dynamic require statements for WordPress packages
			for (const pkg of WORDPRESS_PACKAGES) {
				expect(content).not.toContain(`require('@wordpress/${pkg}')`);
				expect(content).not.toContain(`import('@wordpress/${pkg}')`);
			}

			// Check that there are no dynamic require statements for React
			for (const reactImport of REACT_IMPORTS) {
				expect(content).not.toContain(`require('${reactImport}')`);
				expect(content).not.toContain(`import('${reactImport}')`);
			}
		}
	});

	/**
	 * Test that block-editor is correctly mapped to blockEditor camelCase
	 */
	test('block-editor package is correctly mapped to window.wp.blockEditor', async () => {
		const jsFiles = await glob(join(BUILD_DIR, '**/*.js'));

		for (const jsFile of jsFiles) {
			const content = readFileSync(jsFile, 'utf-8');

			if (content.includes('wordpress-alias:@wordpress/block-editor')) {
				// Should use camelCase blockEditor, not kebab-case
				expect(content).toContain('window.wp.blockEditor');
				expect(content).not.toContain('window.wp.block-editor');
			}
		}
	});

	/**
	 * Test that all WordPress shims follow consistent patterns
	 */
	test('WordPress shims follow consistent export patterns', async () => {
		const jsFiles = await glob(join(BUILD_DIR, '**/*.js'));

		const testFiles = jsFiles
			.filter((file) => file.includes('blocks/custom/'))
			.slice(0, 3);

		for (const jsFile of testFiles) {
			const content = readFileSync(jsFile, 'utf-8');

			// Find all WordPress shims
			const wpShimMatches =
				content.match(/wordpress-alias:@wordpress\/[\w-]+[^}]+}/gs) ||
				[];

			for (const shimMatch of wpShimMatches) {
				// Each shim should follow the pattern:
				// 1. Get wpModule from window.wp.*
				// 2. Loop through properties with hasOwnProperty check
				// 3. Export all properties
				expect(shimMatch).toContain('var wpModule = window.wp.');
				expect(shimMatch).toContain('for (const key in wpModule)');
				expect(shimMatch).toContain(
					'Object.prototype.hasOwnProperty.call(wpModule, key)'
				);
				expect(shimMatch).toContain('exports[key] = wpModule[key]');
			}
		}
	});

	/**
	 * Test that React shims provide correct JSX functions
	 */
	test('React JSX shims provide correct function mappings', async () => {
		const jsFiles = await glob(join(BUILD_DIR, '**/*.js'));

		for (const jsFile of jsFiles) {
			const content = readFileSync(jsFile, 'utf-8');

			// Test JSX runtime shim
			if (content.includes('react-jsx-runtime-alias')) {
				const jsxRuntimeMatch = content.match(
					/react-jsx-runtime-alias[^}]+}/s
				);
				if (jsxRuntimeMatch) {
					const shimContent = jsxRuntimeMatch[0];
					expect(shimContent).toContain(
						'jsx: wpElement.createElement'
					);
					expect(shimContent).toContain(
						'jsxs: wpElement.createElement'
					);
					expect(shimContent).toContain(
						'Fragment: wpElement.Fragment'
					);
				}
			}

			// Test JSX dev runtime shim
			if (content.includes('react-jsx-dev-runtime-alias')) {
				const jsxDevRuntimeMatch = content.match(
					/react-jsx-dev-runtime-alias[^}]+}/s
				);
				if (jsxDevRuntimeMatch) {
					const shimContent = jsxDevRuntimeMatch[0];
					expect(shimContent).toContain(
						'jsxDEV: wpElement.createElement'
					);
					expect(shimContent).toContain(
						'Fragment: wpElement.Fragment'
					);
				}
			}
		}
	});

	/**
	 * Test that build outputs have reasonable file sizes (indicating successful shimming)
	 */
	test('build outputs have reasonable file sizes indicating successful shimming', async () => {
		const jsFiles = await glob(join(BUILD_DIR, 'blocks/**/*.js'));

		for (const jsFile of jsFiles) {
			const stats = await import('node:fs').then((fs) =>
				fs.statSync(jsFile)
			);

			// Files should be relatively small since React/WordPress are shimmed, not bundled
			// Typical block files should be under 200KB when properly shimmed
			expect(stats.size).toBeLessThan(200 * 1024); // 200KB limit

			// Files should not be tiny (under 1KB) as they should contain actual block code
			expect(stats.size).toBeGreaterThan(1024); // 1KB minimum
		}
	});

	/**
	 * Test version hashes are properly generated for assets
	 */
	test('asset files contain valid version hashes', async () => {
		const assetFiles = await glob(join(BUILD_DIR, '**/*.asset.php'));

		for (const assetFile of assetFiles) {
			const content = readFileSync(assetFile, 'utf-8');

			// Should contain a version hash
			const versionMatch = content.match(/"version" => "([a-f0-9]+)"/);
			expect(versionMatch).toBeTruthy();

			if (versionMatch) {
				const hash = versionMatch[1];
				// Hash should be 32 characters (MD5) or 40 characters (SHA-1)
				expect(hash.length).toBeGreaterThanOrEqual(32);
				expect(hash).toMatch(/^[a-f0-9]+$/);
			}
		}
	});
});
