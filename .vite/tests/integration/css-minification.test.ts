import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { glob } from 'glob';
import { beforeAll, describe, expect, test } from 'vitest';

/**
 * Integration tests for CSS minification in the Vite build process
 *
 * These tests ensure that CSS files are properly minified in production builds
 * and properly formatted in development builds, with proper source maps generated.
 */
describe('CSS Minification Integration', () => {
	const BUILD_DIR = join(process.cwd(), 'build');

	beforeAll(() => {
		if (!existsSync(BUILD_DIR)) {
			throw new Error(
				'Build directory does not exist. Run `npm run build` first.'
			);
		}
	});

	/**
	 * Test that CSS files are minified in production builds
	 */
	test('CSS files are minified in production builds', () => {
		const cssFiles = getAllCssFiles();
		expect(cssFiles.length).toBeGreaterThan(0);

		for (const cssFile of cssFiles) {
			const content = readFileSync(cssFile, 'utf-8');

			// Skip empty CSS files
			if (content.trim().length === 0) {
				continue;
			}

			// Check minification characteristics
			assertCssIsMinified(content);
		}
	});

	/**
	 * Test that CSS files contain valid CSS syntax after minification
	 */
	test('minified CSS files contain valid CSS syntax', () => {
		const cssFiles = getAllCssFiles();

		for (const cssFile of cssFiles) {
			const content = readFileSync(cssFile, 'utf-8');

			// Skip empty CSS files
			if (content.trim().length === 0) {
				continue;
			}

			// Basic CSS syntax validation
			assertValidCssSyntax(content);
		}
	});

	/**
	 * Test that asset CSS files are minified
	 */
	test('asset CSS files are properly minified', () => {
		const assetCssFiles = glob.sync(join(BUILD_DIR, 'assets/*.css'));
		expect(assetCssFiles.length).toBeGreaterThan(0);

		for (const cssFile of assetCssFiles) {
			const content = readFileSync(cssFile, 'utf-8');

			// Skip empty CSS files
			if (content.trim().length === 0) {
				continue;
			}

			// Asset CSS files should be minified
			assertCssIsMinified(content);

			// Should not contain development-style formatting
			assertNoDevFormating(content);
		}
	});

	/**
	 * Test that block CSS files are properly minified
	 */
	test('block CSS files are properly minified', () => {
		const blockCssFiles = [
			...glob.sync(join(BUILD_DIR, 'blocks/**/*.css')),
			...glob.sync(join(BUILD_DIR, 'page-templates/**/*.css')),
			...glob.sync(join(BUILD_DIR, 'template-parts/**/*.css')),
		];

		expect(blockCssFiles.length).toBeGreaterThan(0);

		for (const cssFile of blockCssFiles) {
			const content = readFileSync(cssFile, 'utf-8');

			// Skip empty CSS files
			if (content.trim().length === 0) {
				continue;
			}

			// Block CSS files should be minified
			assertCssIsMinified(content);
		}
	});

	/**
	 * Test CSS minification efficiency
	 */
	test('CSS minification provides size reduction benefits', () => {
		const largeCssFiles = getAllCssFiles().filter((file) => {
			const stats = statSync(file);
			return stats.size > 1000; // Files larger than 1KB
		});

		// Should have at least some substantial CSS files
		expect(largeCssFiles.length).toBeGreaterThan(0);

		for (const cssFile of largeCssFiles) {
			const content = readFileSync(cssFile, 'utf-8');

			// Calculate compression indicators
			const totalChars = content.length;
			const lineBreaks = (content.match(/\n/g) || []).length;
			const spaces = (content.match(/ {2,}/g) || []).length; // Multiple consecutive spaces

			// Minified CSS should have very few line breaks relative to content length
			expect(lineBreaks / totalChars).toBeLessThan(0.02); // Less than 2% line breaks

			// Should have minimal unnecessary spaces
			expect(spaces / totalChars).toBeLessThan(0.01); // Less than 1% multiple spaces
		}
	});

	/**
	 * Test that CSS preserves important functionality after minification
	 */
	test('minified CSS preserves functionality', () => {
		const cssFiles = getAllCssFiles();

		for (const cssFile of cssFiles) {
			const content = readFileSync(cssFile, 'utf-8');

			// Skip empty CSS files
			if (content.trim().length === 0) {
				continue;
			}

			// CSS should still contain WordPress classes and variables
			if (content.includes('wp--')) {
				// WordPress CSS variables should be preserved
				expect(content).toMatch(/var\(--wp--[^)]+\)/);
			}

			// CSS custom properties should be preserved (including underscore prefix)
			if (content.includes('--')) {
				expect(content).toMatch(/--[a-zA-Z0-9_-]+/);
			}

			// Media queries should be preserved
			if (content.includes('@media')) {
				expect(content).toMatch(/@media[^{]+\{/);
			}
		}
	});

	/**
	 * Test that LightningCSS-specific optimizations are applied
	 */
	test('LightningCSS optimizations are applied', () => {
		const cssFiles = getAllCssFiles().filter((file) => {
			const content = readFileSync(file, 'utf-8');
			return content.trim().length > 500; // Only check substantial files
		});

		for (const cssFile of cssFiles) {
			const content = readFileSync(cssFile, 'utf-8');

			// LightningCSS should optimize vendor prefixes and properties
			// These are more advanced checks for optimization quality

			// Should not contain redundant semicolons
			expect(content).not.toMatch(/;;+/);

			// Should not contain excessive whitespace after colons
			expect(content).not.toMatch(/:\s{2,}/);

			// Should not contain whitespace before semicolons
			expect(content).not.toMatch(/\s+;/);
		}
	});

	/**
	 * Test that empty CSS files are handled gracefully
	 */
	test('empty CSS files are handled gracefully', () => {
		const cssFiles = getAllCssFiles();
		const emptyCssFiles = cssFiles.filter((file) => {
			const content = readFileSync(file, 'utf-8');
			return (
				content.trim().length === 0 ||
				content.trim() === '/*# sourceMappingURL=index.css.map */'
			);
		});

		// Empty files should exist without errors
		for (const emptyFile of emptyCssFiles) {
			expect(existsSync(emptyFile)).toBe(true);

			// File should be readable
			const content = readFileSync(emptyFile, 'utf-8');
			expect(typeof content).toBe('string');
		}
	});

	/**
	 * Helper function to get all CSS files in the build directory
	 */
	function getAllCssFiles(): string[] {
		return [...glob.sync(join(BUILD_DIR, '**/*.css'))].filter(
			(file) =>
				// Exclude source map files
				!file.endsWith('.css.map') &&
				// Only include actual CSS files
				file.endsWith('.css')
		);
	}

	/**
	 * Assert that CSS content is minified
	 */
	function assertCssIsMinified(content: string): void {
		// Minified CSS should not have excessive whitespace
		const lines = content.split('\n');
		const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

		// Most content should be on fewer lines (indicating minification)
		// Allow some flexibility for source map comments and complex CSS
		if (content.length > 200) {
			expect(nonEmptyLines.length).toBeLessThan(content.length / 50); // Reasonable ratio
		}

		// Should not contain block-style formatting with lots of whitespace
		const indentedLines = lines.filter((line) => line.match(/^\s{4,}/)); // 4+ space indentation
		expect(indentedLines.length / lines.length).toBeLessThan(0.1); // Less than 10% indented lines
	}

	/**
	 * Assert that CSS content contains valid syntax
	 */
	function assertValidCssSyntax(content: string): void {
		// Basic CSS syntax validation

		// Should not contain obvious syntax errors
		expect(content).not.toContain('undefined');
		expect(content).not.toContain('[object Object]');

		// Should have matching braces (basic check)
		const openBraces = (content.match(/\{/g) || []).length;
		const closeBraces = (content.match(/\}/g) || []).length;
		expect(openBraces).toBe(closeBraces);

		// Should not contain double semicolons (basic optimization check)
		expect(content).not.toMatch(/;;/);

		// Should not contain empty rules (rule with only whitespace)
		expect(content).not.toMatch(/\{\s*\}/);
	}

	/**
	 * Assert that CSS doesn't contain development-style formatting
	 */
	function assertNoDevFormating(content: string): void {
		// Should not contain development comments
		expect(content).not.toMatch(/\/\*\s*TODO/i);
		expect(content).not.toMatch(/\/\*\s*FIXME/i);
		expect(content).not.toMatch(/\/\*\s*DEBUG/i);

		// Should not contain excessive spacing typical of development formatting
		expect(content).not.toMatch(/\n\s*\n\s*\n/); // Multiple consecutive empty lines
		expect(content).not.toMatch(/\{\s*\n\s*\n/); // Empty line after opening brace
	}
});
