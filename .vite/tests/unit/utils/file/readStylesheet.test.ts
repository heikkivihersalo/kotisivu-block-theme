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

	it('should read CSS file content as-is', () => {
		const cssContent = `body { margin: 0; font-family: Arial; }`;
		const cssFile = join(tempDir, 'styles.css');
		writeFileSync(cssFile, cssContent);

		const result = readStylesheet(cssFile);
		expect(result).toBe(cssContent);
	});

	it('should compile SCSS file and return CSS', () => {
		const scssContent = `
			@use "sass:color";
			$primary-color: #3498db;
			.header {
				color: $primary-color;
				&:hover { color: color.adjust($primary-color, $lightness: -10%); }
			}
		`;
		const scssFile = join(tempDir, 'styles.scss');
		writeFileSync(scssFile, scssContent);

		const result = readStylesheet(scssFile);
		expect(result).toContain('.header');
		expect(result).toContain('color: #3498db');
		expect(result).not.toContain('$primary-color');
	});

	it('should compile SASS file (indented syntax)', () => {
		const sassContent = `$color: #e74c3c
.sidebar
  background-color: $color`;
		const sassFile = join(tempDir, 'styles.sass');
		writeFileSync(sassFile, sassContent);

		const result = readStylesheet(sassFile);
		expect(result).toContain('.sidebar');
		expect(result).toContain('background-color: #e74c3c');
		expect(result).not.toContain('$color');
	});

	it('should handle empty files', () => {
		const emptyFile = join(tempDir, 'empty.css');
		writeFileSync(emptyFile, '');

		const result = readStylesheet(emptyFile);
		expect(result).toBe('');
	});
});
