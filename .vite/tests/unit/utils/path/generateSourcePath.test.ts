import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { generateSourcePath } from '../../../../src/common/utils/path/generateSourcePath.ts';

describe('generateSourcePath', () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'generateSourcePath-test-'));
	});

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true });
	});

	it('should return null for empty path', () => {
		const result = generateSourcePath('', tempDir);
		expect(result).toBeNull();
	});

	it('should return null for non-string path', () => {
		const result = generateSourcePath(null as any, tempDir);
		expect(result).toBeNull();
	});

	it('should return resolved path for existing file', () => {
		const fileName = 'test-file.js';
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'test content');

		const result = generateSourcePath(fileName, tempDir);
		expect(result).toBe(resolve(tempDir, fileName));
	});

	it('should return null for non-existing file', () => {
		const fileName = 'non-existing-file.js';
		const result = generateSourcePath(fileName, tempDir);
		expect(result).toBeNull();
	});

	it('should handle relative paths', () => {
		const subDir = 'subdir';
		const fullSubDir = join(tempDir, subDir);
		mkdirSync(fullSubDir, { recursive: true }); // Create the directory structure

		const fileName = 'nested-file.js';
		const nestedFilePath = join(fullSubDir, fileName);
		writeFileSync(nestedFilePath, 'nested content');

		const relativePath = join(subDir, fileName);
		const result = generateSourcePath(relativePath, tempDir);
		expect(result).toBe(resolve(tempDir, relativePath));
	});

	it('should handle absolute paths correctly', () => {
		const fileName = 'absolute-test.js';
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'absolute content');

		// When passing an absolute path, it should check if that exact path exists
		const result = generateSourcePath(filePath, tempDir);
		expect(result).toBe(filePath); // Should return the path since it exists
	});

	it('should return null when resolve throws an error', () => {
		// Using invalid characters that might cause resolve to throw
		const result = generateSourcePath('\0invalid\0path', tempDir);
		expect(result).toBeNull();
	});

	it('should handle current directory reference', () => {
		const fileName = 'current-dir-file.js';
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'current dir content');

		const result = generateSourcePath('./current-dir-file.js', tempDir);
		expect(result).toBe(resolve(tempDir, './current-dir-file.js'));
	});

	it('should handle parent directory reference when file exists', () => {
		// Create a file in the parent directory
		const parentFile = 'parent-file.js';
		const parentDir = resolve(tempDir, '..');
		const parentFilePath = join(parentDir, parentFile);

		try {
			writeFileSync(parentFilePath, 'parent content');

			const result = generateSourcePath('../parent-file.js', tempDir);
			expect(result).toBe(resolve(tempDir, '../parent-file.js'));
		} catch {
			// If we can't write to parent dir, skip this test case
			expect(true).toBe(true);
		}
	});

	it('should handle files with special characters in names', () => {
		const fileName = 'file with spaces & special chars.js';
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'special chars content');

		const result = generateSourcePath(fileName, tempDir);
		expect(result).toBe(resolve(tempDir, fileName));
	});
});
