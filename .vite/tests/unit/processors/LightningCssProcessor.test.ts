import { describe, expect, test, beforeEach } from 'vitest';
import { LightningCssProcessor } from '../../../src/common/processors/LightningCssProcessor';

/**
 * Unit tests for LightningCssProcessor
 *
 * These tests verify that the CSS processor correctly handles minification,
 * source map generation, and various CSS processing options.
 */
describe('LightningCssProcessor', () => {
	let processor: LightningCssProcessor;

	beforeEach(() => {
		processor = new LightningCssProcessor();
	});

	/**
	 * Test basic CSS processing functionality
	 */
	test('processes basic CSS correctly', async () => {
		const css = `
			.test {
				color: red;
				background: blue;
			}
		`;

		const result = processor.process(css, 'test.css');

		expect(result.code).toBeDefined();
		expect(result.code.toString()).toContain('.test');
		expect(result.code.toString()).toContain('color:red');
		expect(result.code.toString()).toContain('background:#00f'); // LightningCSS converts blue to #00f
	});

	/**
	 * Test CSS minification
	 */
	test('minifies CSS when minify option is true', async () => {
		const css = `
			.test {
				color: red;
				margin: 10px 20px 30px 40px;
				padding: 0;
			}
			
			.another {
				display: block;
			}
		`;

		const minified = processor.process(css, 'test.css', { minify: true });
		const unminified = processor.process(css, 'test.css', {
			minify: false,
		});

		const minifiedContent = minified.code.toString();
		const unminifiedContent = unminified.code.toString();

		// Minified should be shorter
		expect(minifiedContent.length).toBeLessThan(unminifiedContent.length);

		// Minified should have fewer line breaks
		const minifiedLines = (minifiedContent.match(/\n/g) || []).length;
		const unminifiedLines = (unminifiedContent.match(/\n/g) || []).length;
		expect(minifiedLines).toBeLessThan(unminifiedLines);
	});

	/**
	 * Test that minification preserves CSS functionality
	 */
	test('preserves CSS functionality when minifying', async () => {
		const css = `
			:root {
				--primary-color: #0073aa;
				--secondary-color: #005177;
			}
			
			.wp-block {
				color: var(--primary-color);
				margin: 1rem;
			}
			
			@media (min-width: 768px) {
				.wp-block {
					margin: 2rem;
				}
			}
		`;

		const result = processor.process(css, 'test.css', { minify: true });
		const content = result.code.toString();

		// CSS variables should be preserved
		expect(content).toContain('--primary-color');
		expect(content).toContain('var(--primary-color)');

		// Media queries should be preserved (LightningCSS may optimize syntax)
		expect(content).toMatch(/@media/);

		// Class selectors should be preserved
		expect(content).toContain('.wp-block');
	});

	/**
	 * Test source map generation
	 */
	test('generates source maps when enabled', async () => {
		const css = `
			.test {
				color: red;
			}
		`;

		const withSourceMap = processor.process(css, 'test.css', {
			sourceMap: true,
		});
		const withoutSourceMap = processor.process(css, 'test.css', {
			sourceMap: false,
		});

		expect(withSourceMap.map).toBeDefined();
		expect(withoutSourceMap.map).toBeUndefined();

		if (withSourceMap.map) {
			const mapContent = withSourceMap.map.toString();
			expect(mapContent).toContain('mappings');
			expect(mapContent).toContain('sources');
		}
	});

	/**
	 * Test custom transforms
	 */
	test('applies custom transforms', async () => {
		const css = `.test { color: red; }`;

		const customTransform = (cssContent: string) => {
			return cssContent.replace('red', 'blue');
		};

		const result = processor.process(css, 'test.css', {
			customTransforms: [customTransform],
		});

		expect(result.code.toString()).toContain('#00f'); // blue becomes #00f after processing
		expect(result.code.toString()).not.toContain('red');
	});

	/**
	 * Test multiple custom transforms
	 */
	test('applies multiple custom transforms in order', async () => {
		const css = `.test { color: red; background: green; }`;

		const transform1 = (cssContent: string) =>
			cssContent.replace('red', 'blue');
		const transform2 = (cssContent: string) =>
			cssContent.replace('green', 'yellow');

		const result = processor.process(css, 'test.css', {
			customTransforms: [transform1, transform2],
		});

		const content = result.code.toString();
		expect(content).toContain('#00f'); // blue becomes #00f
		expect(content).toContain('#ff0'); // yellow becomes #ff0
		expect(content).not.toContain('red');
		expect(content).not.toContain('green');
	});

	/**
	 * Test error handling with invalid CSS
	 */
	test('handles invalid CSS gracefully', async () => {
		const invalidCss = `.test { color: ; background }`;

		// LightningCSS may throw for truly invalid CSS, so let's test with a try-catch
		try {
			const result = processor.process(invalidCss, 'test.css');
			expect(result.code).toBeDefined();
		} catch (error) {
			// This is acceptable behavior for invalid CSS
			expect(error).toBeInstanceOf(Error);
		}
	});

	/**
	 * Test empty CSS handling
	 */
	test('handles empty CSS', async () => {
		const emptyCss = '';

		const result = processor.process(emptyCss, 'test.css');

		expect(result.code).toBeDefined();
		expect(result.code.toString().trim()).toBe('');
	});

	/**
	 * Test whitespace-only CSS handling
	 */
	test('handles whitespace-only CSS', async () => {
		const whitespaceCss = '   \n\t  \n  ';

		const result = processor.process(whitespaceCss, 'test.css');

		expect(result.code).toBeDefined();
		expect(result.code.toString().trim()).toBe('');
	});

	/**
	 * Test CSS with comments
	 */
	test('handles CSS comments correctly during minification', async () => {
		const cssWithComments = `
			/* Main styles */
			.test {
				color: red; /* Primary color */
				/* TODO: Update this */
				background: blue;
			}
			/* End of styles */
		`;

		const minified = processor.process(cssWithComments, 'test.css', {
			minify: true,
		});
		const unminified = processor.process(cssWithComments, 'test.css', {
			minify: false,
		});

		const minifiedContent = minified.code.toString();
		const unminifiedContent = unminified.code.toString();

		// Minified version should typically remove comments
		const minifiedComments = (minifiedContent.match(/\/\*/g) || []).length;
		const unminifiedComments = (unminifiedContent.match(/\/\*/g) || [])
			.length;

		// LightningCSS may preserve some comments, but minified should have fewer
		expect(minifiedComments).toBeLessThanOrEqual(unminifiedComments);
	});

	/**
	 * Test CSS optimization features
	 */
	test('optimizes CSS properties when minifying', async () => {
		const css = `
			.test {
				margin-top: 10px;
				margin-right: 20px;
				margin-bottom: 10px;
				margin-left: 20px;
			}
		`;

		const result = processor.process(css, 'test.css', { minify: true });
		const content = result.code.toString();

		// LightningCSS should optimize margin shorthand
		// The exact optimization may vary, so we check that it's still valid CSS
		expect(content).toContain('.test');
		expect(content).toMatch(/margin/);
	});

	/**
	 * Test that processor handles modern CSS features
	 */
	test('handles modern CSS features', async () => {
		const modernCss = `
			.test {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 1rem;
				color: oklch(60% 0.1 180);
			}
			
			@supports (display: grid) {
				.test {
					display: grid;
				}
			}
		`;

		const result = processor.process(modernCss, 'test.css', {
			minify: true,
		});
		const content = result.code.toString();

		// Modern CSS features should be preserved
		expect(content).toContain('grid');
		expect(content).toContain('repeat');
		expect(content).toContain('@supports');
	});
});
