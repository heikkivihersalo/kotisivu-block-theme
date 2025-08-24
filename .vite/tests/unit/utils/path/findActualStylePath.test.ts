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
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'css content');

		const result = findActualStylePath(tempDir, fileName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should return null if no file exists with any extension', () => {
		const fileName = 'non-existing-style';
		const result = findActualStylePath(tempDir, fileName);
		expect(result).toBeNull();
	});

	it('should find .css file when searching by name without extension', () => {
		const baseName = 'main';
		const fileName = `${baseName}.css`;
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'css content');

		const result = findActualStylePath(tempDir, baseName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should find .scss file when searching by name without extension', () => {
		const baseName = 'variables';
		const fileName = `${baseName}.scss`;
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'scss content');

		const result = findActualStylePath(tempDir, baseName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should find .sass file when searching by name without extension', () => {
		const baseName = 'mixins';
		const fileName = `${baseName}.sass`;
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'sass content');

		const result = findActualStylePath(tempDir, baseName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should find .less file when searching by name without extension', () => {
		const baseName = 'theme';
		const fileName = `${baseName}.less`;
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'less content');

		const result = findActualStylePath(tempDir, baseName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should prefer the first found extension in order (.css, .scss, .sass, .less)', () => {
		const baseName = 'multi-style';

		// Create files with multiple extensions
		writeFileSync(join(tempDir, `${baseName}.scss`), 'scss content');
		writeFileSync(join(tempDir, `${baseName}.less`), 'less content');
		writeFileSync(join(tempDir, `${baseName}.css`), 'css content');

		const result = findActualStylePath(tempDir, baseName);
		// Should find .css first as it comes first in FILE_EXTENSIONS.STYLES
		expect(result).toBe(resolve(tempDir, `${baseName}.css`));
	});

	it('should find editor styles when searching for index.css', () => {
		const editorFile = 'editor.scss';
		writeFileSync(join(tempDir, editorFile), 'editor styles');

		const result = findActualStylePath(tempDir, 'index.css');
		expect(result).toBe(resolve(tempDir, editorFile));
	});

	it('should find style files when searching for style-index.css', () => {
		const styleFile = 'style.scss';
		writeFileSync(join(tempDir, styleFile), 'frontend styles');

		const result = findActualStylePath(tempDir, 'style-index.css');
		expect(result).toBe(resolve(tempDir, styleFile));
	});

	it('should prioritize exact filename match over pattern matching', () => {
		// Create both exact match and pattern match
		writeFileSync(join(tempDir, 'index.css'), 'exact match');
		writeFileSync(join(tempDir, 'editor.scss'), 'pattern match');

		const result = findActualStylePath(tempDir, 'index.css');
		expect(result).toBe(resolve(tempDir, 'index.css'));
	});

	it('should try multiple extensions for WordPress patterns', () => {
		// Only create editor with different extension
		const editorFile = 'editor.less';
		writeFileSync(join(tempDir, editorFile), 'editor less styles');

		const result = findActualStylePath(tempDir, 'index.css');
		expect(result).toBe(resolve(tempDir, editorFile));
	});

	it('should strip existing extension and try alternatives', () => {
		const baseName = 'component';
		const scssFile = `${baseName}.scss`;
		writeFileSync(join(tempDir, scssFile), 'scss content');

		// Search for .css file but find .scss instead
		const result = findActualStylePath(tempDir, `${baseName}.css`);
		expect(result).toBe(resolve(tempDir, scssFile));
	});

	it('should handle files with multiple dots in filename', () => {
		const complexName = 'my.component.styles';
		const fileName = `${complexName}.css`;
		writeFileSync(join(tempDir, fileName), 'complex name styles');

		const result = findActualStylePath(tempDir, complexName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should handle nested directory paths', () => {
		const subDir = 'styles';
		const subDirPath = join(tempDir, subDir);
		mkdirSync(subDirPath, { recursive: true }); // Create the directory structure

		const baseName = 'button';
		const fileName = `${baseName}.scss`;
		const nestedFile = join(subDir, fileName);
		writeFileSync(join(tempDir, nestedFile), 'nested styles');

		const result = findActualStylePath(tempDir, nestedFile);
		expect(result).toBe(resolve(tempDir, nestedFile));
	});

	it('should return null when no patterns match', () => {
		// Create a style file that doesn't match any patterns
		writeFileSync(join(tempDir, 'random.scss'), 'random styles');

		const result = findActualStylePath(tempDir, 'index.css');
		expect(result).toBeNull();
	});

	it('should handle case where file extension does not match style extensions', () => {
		const fileName = 'script.js';
		writeFileSync(join(tempDir, fileName), 'js content');

		// Should return the original path since it exists
		const result = findActualStylePath(tempDir, fileName);
		expect(result).toBe(resolve(tempDir, fileName));
	});
});
