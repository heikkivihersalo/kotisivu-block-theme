import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { findActualStylePath } from '../../../../src/common/utils/path/findActualStylePath.ts';

describe('findActualStylePath', () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'findActualStylePath-test-'));
	});

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true });
	});

	it('should return the original path if file exists as specified', () => {
		const fileName = 'existing-style.css';
		writeFileSync(join(tempDir, fileName), 'css content');

		const result = findActualStylePath(tempDir, fileName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should return null if no file exists with any extension', () => {
		const result = findActualStylePath(tempDir, 'non-existing-style');
		expect(result).toBeNull();
	});

	it('should find style files with different extensions when searching without extension', () => {
		// Test multiple extensions in a single test
		const testCases = [
			{ baseName: 'main', ext: '.css' },
			{ baseName: 'variables', ext: '.scss' },
			{ baseName: 'mixins', ext: '.sass' },
			{ baseName: 'theme', ext: '.less' },
		];

		testCases.forEach(({ baseName, ext }) => {
			const fileName = baseName + ext;
			writeFileSync(join(tempDir, fileName), 'content');

			const result = findActualStylePath(tempDir, baseName);
			expect(result).toBe(resolve(tempDir, fileName));

			// Clean up for next iteration
			rmSync(join(tempDir, fileName));
		});
	});

	it('should prefer extensions in order (.css, .scss, .sass, .less)', () => {
		const baseName = 'multi-style';

		// Create files with multiple extensions (intentionally out of order)
		writeFileSync(join(tempDir, `${baseName}.less`), 'less content');
		writeFileSync(join(tempDir, `${baseName}.scss`), 'scss content');
		writeFileSync(join(tempDir, `${baseName}.css`), 'css content');

		const result = findActualStylePath(tempDir, baseName);
		expect(result).toBe(resolve(tempDir, `${baseName}.css`));
	});

	it('should handle WordPress-specific filename patterns', () => {
		// Test index.css → editor pattern
		writeFileSync(join(tempDir, 'editor.scss'), 'editor styles');
		let result = findActualStylePath(tempDir, 'index.css');
		expect(result).toBe(resolve(tempDir, 'editor.scss'));

		// Clean up
		rmSync(join(tempDir, 'editor.scss'));

		// Test style-index.css → style pattern
		writeFileSync(join(tempDir, 'style.scss'), 'frontend styles');
		result = findActualStylePath(tempDir, 'style-index.css');
		expect(result).toBe(resolve(tempDir, 'style.scss'));
	});

	it('should prioritize exact filename match over pattern matching', () => {
		// Create both exact match and pattern match
		writeFileSync(join(tempDir, 'index.css'), 'exact match');
		writeFileSync(join(tempDir, 'editor.scss'), 'pattern match');

		const result = findActualStylePath(tempDir, 'index.css');
		expect(result).toBe(resolve(tempDir, 'index.css'));
	});

	it('should strip existing extension and try alternatives', () => {
		const baseName = 'component';
		const scssFile = `${baseName}.scss`;
		writeFileSync(join(tempDir, scssFile), 'scss content');

		// Search for .css file but find .scss instead
		const result = findActualStylePath(tempDir, `${baseName}.css`);
		expect(result).toBe(resolve(tempDir, scssFile));
	});

	it('should handle nested directory paths', () => {
		const subDir = 'styles';
		mkdirSync(join(tempDir, subDir), { recursive: true });

		const nestedFile = join(subDir, 'button.scss');
		writeFileSync(join(tempDir, nestedFile), 'nested styles');

		const result = findActualStylePath(tempDir, nestedFile);
		expect(result).toBe(resolve(tempDir, nestedFile));
	});

	it('should return original path for non-style files that exist', () => {
		const fileName = 'script.js';
		writeFileSync(join(tempDir, fileName), 'js content');

		const result = findActualStylePath(tempDir, fileName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should return null when no patterns match', () => {
		// Create a style file that doesn't match any patterns
		writeFileSync(join(tempDir, 'random.scss'), 'random styles');

		const result = findActualStylePath(tempDir, 'index.css');
		expect(result).toBeNull();
	});
});
