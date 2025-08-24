import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { findActualFilePath } from '../../../../src/common/utils/path/findActualFilePath.ts';

describe('findActualFilePath', () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'findActualFilePath-test-'));
	});

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true });
	});

	it('should return the original path if file exists as specified', () => {
		const fileName = 'existing-file.js';
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'test content');

		const result = findActualFilePath(tempDir, fileName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should return null if no file exists with any extension', () => {
		const fileName = 'non-existing-file';
		const result = findActualFilePath(tempDir, fileName);
		expect(result).toBeNull();
	});

	it('should find .js file when searching by name without extension', () => {
		const baseName = 'test-file';
		const fileName = `${baseName}.js`;
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'js content');

		const result = findActualFilePath(tempDir, baseName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should find .jsx file when searching by name without extension', () => {
		const baseName = 'test-component';
		const fileName = `${baseName}.jsx`;
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'jsx content');

		const result = findActualFilePath(tempDir, baseName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should find .ts file when searching by name without extension', () => {
		const baseName = 'test-types';
		const fileName = `${baseName}.ts`;
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'ts content');

		const result = findActualFilePath(tempDir, baseName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should find .tsx file when searching by name without extension', () => {
		const baseName = 'test-component';
		const fileName = `${baseName}.tsx`;
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'tsx content');

		const result = findActualFilePath(tempDir, baseName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should prefer the first found extension in order (.js, .jsx, .ts, .tsx)', () => {
		const baseName = 'multi-extension-file';

		// Create files with multiple extensions
		writeFileSync(join(tempDir, `${baseName}.jsx`), 'jsx content');
		writeFileSync(join(tempDir, `${baseName}.ts`), 'ts content');
		writeFileSync(join(tempDir, `${baseName}.js`), 'js content');

		const result = findActualFilePath(tempDir, baseName);
		// Should find .js first as it comes first in FILE_EXTENSIONS.SCRIPTS
		expect(result).toBe(resolve(tempDir, `${baseName}.js`));
	});

	it('should strip existing extension and try alternatives', () => {
		const baseName = 'component';
		const tsxFile = `${baseName}.tsx`;
		writeFileSync(join(tempDir, tsxFile), 'tsx content');

		// Search for .js file but find .tsx instead
		const result = findActualFilePath(tempDir, `${baseName}.js`);
		expect(result).toBe(resolve(tempDir, tsxFile));
	});

	it('should handle files with multiple dots in filename', () => {
		const complexName = 'my.component.test';
		const fileName = `${complexName}.js`;
		writeFileSync(join(tempDir, fileName), 'complex name content');

		const result = findActualFilePath(tempDir, complexName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should handle nested directory paths', () => {
		const subDir = 'components';
		const subDirPath = join(tempDir, subDir);
		mkdirSync(subDirPath, { recursive: true }); // Create the directory structure

		const baseName = 'Button';
		const fileName = `${baseName}.jsx`;
		const nestedFile = join(subDir, fileName);
		writeFileSync(join(tempDir, nestedFile), 'nested component');

		const result = findActualFilePath(tempDir, nestedFile);
		expect(result).toBe(resolve(tempDir, nestedFile));
	});
	it('should return original path for files that exist with full extension', () => {
		const fileName = 'index.tsx';
		writeFileSync(join(tempDir, fileName), 'index content');

		const result = findActualFilePath(tempDir, fileName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should handle case where file extension does not match script extensions', () => {
		const fileName = 'styles.css';
		writeFileSync(join(tempDir, fileName), 'css content');

		// Should return the original path since it exists
		const result = findActualFilePath(tempDir, fileName);
		expect(result).toBe(resolve(tempDir, fileName));
	});
});
