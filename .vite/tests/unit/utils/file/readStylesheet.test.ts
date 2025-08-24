import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { readStylesheet } from '../../../../src/common/utils/file/readStylesheet.ts';

describe('readStylesheet', () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'readStylesheet-test-'));
	});

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true });
	});

	it('should read and return CSS file content as-is', () => {
		const cssContent = `
			body {
				margin: 0;
				padding: 0;
				font-family: Arial, sans-serif;
			}
			
			.container {
				max-width: 1200px;
				margin: 0 auto;
			}
		`;

		const cssFile = join(tempDir, 'styles.css');
		writeFileSync(cssFile, cssContent);

		const result = readStylesheet(cssFile);
		expect(result).toBe(cssContent);
	});

	it('should compile SCSS file and return CSS', () => {
		const scssContent = `
			$primary-color: #3498db;
			$margin: 1rem;
			
			.header {
				color: $primary-color;
				margin: $margin;
				
				&:hover {
					color: darken($primary-color, 10%);
				}
			}
		`;

		const scssFile = join(tempDir, 'styles.scss');
		writeFileSync(scssFile, scssContent);

		const result = readStylesheet(scssFile);

		// Check that it returns compiled CSS (contains the compiled output)
		expect(result).toContain('.header');
		expect(result).toContain('color: #3498db');
		expect(result).toContain('margin: 1rem');
		expect(result).toContain('.header:hover');
		// SCSS variables and nesting should be compiled away
		expect(result).not.toContain('$primary-color');
		expect(result).not.toContain('&:hover');
	});

	it('should compile SASS file (indented syntax) and return CSS', () => {
		const sassContent = `$primary-color: #e74c3c
$padding: 2rem

.sidebar
  background-color: $primary-color
  padding: $padding
  
  .nav-item
    list-style: none
    margin-bottom: 0.5rem`;

		const sassFile = join(tempDir, 'styles.sass');
		writeFileSync(sassFile, sassContent);

		const result = readStylesheet(sassFile);

		// Check that it returns compiled CSS
		expect(result).toContain('.sidebar');
		expect(result).toContain('background-color: #e74c3c');
		expect(result).toContain('padding: 2rem');
		expect(result).toContain('.sidebar .nav-item');
		// SASS variables and indentation should be compiled away
		expect(result).not.toContain('$primary-color');
	});

	it('should handle CSS with comments', () => {
		const cssContent = `
			/* Main styles */
			body {
				margin: 0; /* Remove default margin */
			}
			
			/* Component styles */
			.button {
				padding: 10px 20px;
				border: none; // Modern browsers
			}
		`;

		const cssFile = join(tempDir, 'commented.css');
		writeFileSync(cssFile, cssContent);

		const result = readStylesheet(cssFile);
		expect(result).toBe(cssContent);
	});

	it('should handle SCSS with imports and mixins', () => {
		// Create a mixin file
		const mixinsContent = `
			@mixin button-style($bg-color: #007cba) {
				background-color: $bg-color;
				color: white;
				border: none;
				padding: 0.5rem 1rem;
				border-radius: 4px;
			}
		`;
		const mixinsFile = join(tempDir, '_mixins.scss');
		writeFileSync(mixinsFile, mixinsContent);

		const scssContent = `
			@import 'mixins';
			
			.primary-button {
				@include button-style(#3498db);
			}
			
			.secondary-button {
				@include button-style(#95a5a6);
			}
		`;

		const scssFile = join(tempDir, 'buttons.scss');
		writeFileSync(scssFile, scssContent);

		const result = readStylesheet(scssFile);

		// Check that mixins were applied
		expect(result).toContain('.primary-button');
		expect(result).toContain('.secondary-button');
		expect(result).toContain('background-color: #3498db');
		expect(result).toContain('background-color: #95a5a6');
		expect(result).toContain('color: white');
		expect(result).toContain('border: none');
		// Mixin definitions and imports should be compiled away
		expect(result).not.toContain('@import');
		expect(result).not.toContain('@mixin');
		expect(result).not.toContain('@include');
	});

	it('should handle empty CSS file', () => {
		const cssFile = join(tempDir, 'empty.css');
		writeFileSync(cssFile, '');

		const result = readStylesheet(cssFile);
		expect(result).toBe('');
	});

	it('should handle empty SCSS file', () => {
		const scssFile = join(tempDir, 'empty.scss');
		writeFileSync(scssFile, '');

		const result = readStylesheet(scssFile);
		expect(result).toBe('');
	});

	it('should handle CSS with special characters and unicode', () => {
		const cssContent = `
			.unicode-content::before {
				content: "★ ❤ ✓ → ← ↑ ↓";
			}
			
			.chinese {
				font-family: "微软雅黑", "Microsoft YaHei";
			}
			
			.emoji::after {
				content: "🎉 🎊 🎈";
			}
		`;

		const cssFile = join(tempDir, 'unicode.css');
		writeFileSync(cssFile, cssContent);

		const result = readStylesheet(cssFile);
		expect(result).toBe(cssContent);
	});

	it('should handle SCSS with nested selectors and variables', () => {
		const scssContent = `
			$base-font-size: 16px;
			$line-height: 1.5;
			
			.article {
				font-size: $base-font-size;
				line-height: $line-height;
				
				h1, h2, h3 {
					margin-top: 0;
					margin-bottom: $base-font-size * 0.5;
				}
				
				p {
					margin-bottom: $base-font-size;
					
					&.lead {
						font-size: $base-font-size * 1.25;
					}
				}
			}
		`;

		const scssFile = join(tempDir, 'article.scss');
		writeFileSync(scssFile, scssContent);

		const result = readStylesheet(scssFile);

		// Check compiled output
		expect(result).toContain('.article');
		expect(result).toContain('font-size: 16px');
		expect(result).toContain('line-height: 1.5');
		expect(result).toContain('.article h1, .article h2, .article h3');
		expect(result).toContain('.article p');
		expect(result).toContain('.article p.lead');
		expect(result).toContain('font-size: 20px'); // 16px * 1.25
		// Variables should be compiled away
		expect(result).not.toContain('$base-font-size');
		expect(result).not.toContain('$line-height');
	});
});
