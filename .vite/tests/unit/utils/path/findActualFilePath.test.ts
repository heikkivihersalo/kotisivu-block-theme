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
		writeFileSync(join(tempDir, fileName), 'test content');

		const result = findActualFilePath(tempDir, fileName);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should return null if no file exists with any extension', () => {
		const result = findActualFilePath(tempDir, 'non-existing-file');
		expect(result).toBeNull();
	});

	it('should find script files with different extensions when searching without extension', () => {
		// Test multiple extensions in a single test
		const testCases = [
			{ baseName: 'component', ext: '.jsx' },
			{ baseName: 'utils', ext: '.ts' },
			{ baseName: 'hooks', ext: '.tsx' },
		];

		testCases.forEach(({ baseName, ext }) => {
			const fileName = baseName + ext;
			writeFileSync(join(tempDir, fileName), 'content');

			const result = findActualFilePath(tempDir, baseName);
			expect(result).toBe(resolve(tempDir, fileName));

			// Clean up for next iteration
			rmSync(join(tempDir, fileName));
		});
	});

	it('should prefer extensions in order (.js, .jsx, .ts, .tsx)', () => {
		const baseName = 'multi-extension-file';

		// Create files with multiple extensions (intentionally out of order)
		writeFileSync(join(tempDir, `${baseName}.tsx`), 'tsx content');
		writeFileSync(join(tempDir, `${baseName}.jsx`), 'jsx content');
		writeFileSync(join(tempDir, `${baseName}.js`), 'js content');

		const result = findActualFilePath(tempDir, baseName);
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

	it('should handle nested directory paths', () => {
		const subDir = 'components';
		mkdirSync(join(tempDir, subDir), { recursive: true });

		const nestedFile = join(subDir, 'Button.jsx');
		writeFileSync(join(tempDir, nestedFile), 'component content');

		const result = findActualFilePath(tempDir, nestedFile);
		expect(result).toBe(resolve(tempDir, nestedFile));
	});

	it('should return original path for non-script files that exist', () => {
		const fileName = 'styles.css';
		writeFileSync(join(tempDir, fileName), 'css content');

		const result = findActualFilePath(tempDir, fileName);
		expect(result).toBe(resolve(tempDir, fileName));
	});
});
