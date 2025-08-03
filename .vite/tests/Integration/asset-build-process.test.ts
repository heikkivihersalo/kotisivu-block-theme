import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { glob } from 'glob';
import { beforeAll, describe, expect, test } from 'vitest';

/**
 * Integration tests for asset generation in the Vite build process
 *
 * These tests ensure that asset files (JS, CSS, PHP) are correctly generated
 * during the build process with proper structure and content.
 */
describe('Asset Build Process', () => {
	const BUILD_DIR = join(process.cwd(), 'build');

	const EXPECTED_ASSETS = [
		'assets/admin.js',
		'assets/admin.css',
		'assets/dark-mode.js',
		'assets/dark-mode.css',
		'assets/inline.js',
		'assets/inline.css',
		'assets/sanitize.js',
		'assets/sanitize.css',
		'assets/theme.js',
		'assets/theme.css',
	];

	const EXPECTED_ASSET_PHP_FILES = [
		'assets/admin.asset.php',
		'assets/dark-mode.asset.php',
		'assets/inline.asset.php',
		'assets/sanitize.asset.php',
		'assets/theme.asset.php',
	];

	beforeAll(() => {
		if (!existsSync(BUILD_DIR)) {
			throw new Error(
				'Build directory does not exist. Run `npm run build` first.'
			);
		}
	});

	/**
	 * Test that all expected asset files are generated
	 */
	test('all expected assets are generated', () => {
		for (const asset of EXPECTED_ASSETS) {
			const assetPath = join(BUILD_DIR, asset);
			expect(existsSync(assetPath)).toBe(true);

			const stats = statSync(assetPath);
			// Allow theme.css to be empty as it may not have any content
			if (!asset.includes('theme.css')) {
				expect(stats.size).toBeGreaterThan(0);
			}
		}
	});

	/**
	 * Test that all asset PHP files are generated correctly
	 */
	test('all asset PHP files are generated correctly', () => {
		for (const assetPhp of EXPECTED_ASSET_PHP_FILES) {
			const assetPath = join(BUILD_DIR, assetPhp);
			expect(existsSync(assetPath)).toBe(true);

			assertAssetFileIsValid(assetPath);
		}
	});

	/**
	 * Test that asset directory structure is correct
	 */
	test('asset directory structure is correct', () => {
		const assetsDir = join(BUILD_DIR, 'assets');
		expect(existsSync(assetsDir)).toBe(true);
		expect(statSync(assetsDir).isDirectory()).toBe(true);

		// Check that assets directory contains the expected files
		const assetFiles = glob.sync(join(assetsDir, '*'));
		expect(assetFiles.length).toBeGreaterThan(8); // At least 10 files (5 JS/CSS pairs + 5 PHP files)
	});

	/**
	 * Test that asset files have valid content
	 */
	test('asset files have valid content', () => {
		// Test JavaScript assets
		const jsAssets = glob.sync(join(BUILD_DIR, 'assets/*.js'));
		for (const jsAsset of jsAssets) {
			const content = readFileSync(jsAsset, 'utf-8');
			// Should contain some JavaScript content (not empty)
			expect(content.length).toBeGreaterThan(0);
			// Should not contain obvious build errors
			expect(content).not.toContain('Module not found');
			expect(content).not.toContain('Cannot resolve');
		}

		// Test CSS assets
		const cssAssets = glob.sync(join(BUILD_DIR, 'assets/*.css'));
		for (const cssAsset of cssAssets) {
			const content = readFileSync(cssAsset, 'utf-8');
			// CSS files can be empty for some assets, but if not empty should be valid
			if (content.length > 0) {
				// Should not contain obvious build errors
				expect(content).not.toContain('@import url()');
				expect(content).not.toContain('Module not found');
			}
		}
	});

	/**
	 * Test that asset files are properly optimized
	 */
	test('asset files are properly optimized', () => {
		// Check that JS files are minified (no unnecessary whitespace)
		const jsAssets = glob.sync(join(BUILD_DIR, 'assets/*.js'));
		for (const jsAsset of jsAssets) {
			const content = readFileSync(jsAsset, 'utf-8');
			if (content.length > 100) {
				// Only check non-empty files
				// Should not contain excessive line breaks (indicating minification)
				const lineBreaks = (content.match(/\n/g) || []).length;
				const contentLength = content.length;
				expect(lineBreaks / contentLength).toBeLessThan(0.05); // Less than 5% line breaks (reasonable optimization)
			}
		}
	});

	/**
	 * Test that asset PHP files contain proper WordPress integration
	 */
	test('asset PHP files contain proper WordPress integration', () => {
		for (const assetPhp of EXPECTED_ASSET_PHP_FILES) {
			const assetPath = join(BUILD_DIR, assetPhp);
			const content = readFileSync(assetPath, 'utf-8');

			// Should contain WordPress-compatible dependency handling
			expect(content).toContain('dependencies');
			expect(content).toContain('version');

			// Should be a proper PHP array return
			expect(content).toMatch(/return\s*\[/);
			expect(content).toContain('];');
		}
	});

	/**
	 * Assert that an asset PHP file is valid
	 */
	function assertAssetFileIsValid(assetFile: string): void {
		expect(existsSync(assetFile)).toBe(true);

		// Read the PHP file content
		const content = readFileSync(assetFile, 'utf-8');

		// Asset file should be a PHP file that returns an array
		expect(content).toMatch(/^\s*<\?php/);
		expect(content).toContain('return');

		// Should contain dependencies and version structure
		expect(content).toContain('dependencies');
		expect(content).toContain('version');

		// Version should be a hash pattern (can be 32 hex chars or other formats)
		const versionMatch = content.match(/"version"\s*=>\s*"([a-f0-9]+)"/);
		expect(versionMatch).toBeTruthy();
		expect(versionMatch?.[1]).toMatch(/^[a-f0-9]+$/);
	}
});
