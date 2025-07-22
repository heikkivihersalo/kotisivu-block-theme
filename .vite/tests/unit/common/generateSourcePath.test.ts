import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { generateSourcePath } from '../../../src/common/utils/generateSourcePath';

describe('generateSourcePath', () => {
	let testDir: string;
	let testFile: string;

	beforeEach(() => {
		// Create a temporary directory for testing
		testDir = join(tmpdir(), `test-${Date.now()}-${Math.random()}`);
		mkdirSync(testDir, { recursive: true });

		// Create a test file
		testFile = join(testDir, 'test-file.txt');
		writeFileSync(testFile, 'test content');
	});

	afterEach(() => {
		// Clean up test directory
		try {
			rmSync(testDir, { recursive: true, force: true });
		} catch (error) {
			// Ignore cleanup errors
		}
	});

	it('should return resolved path for existing file', () => {
		const relativePath = 'test-file.txt';
		const result = generateSourcePath(relativePath, testDir);

		expect(result).toBe(testFile);
		expect(existsSync(result!)).toBe(true);
	});

	it('should return null for non-existent file', () => {
		const relativePath = 'non-existent-file.txt';
		const result = generateSourcePath(relativePath, testDir);

		expect(result).toBeNull();
	});

	it('should return null for empty path', () => {
		const result = generateSourcePath('', testDir);
		expect(result).toBeNull();
	});

	it('should return null for null path', () => {
		const result = generateSourcePath(null as any, testDir);
		expect(result).toBeNull();
	});

	it('should return null for undefined path', () => {
		const result = generateSourcePath(undefined as any, testDir);
		expect(result).toBeNull();
	});

	it('should return null for non-string path', () => {
		const result = generateSourcePath(123 as any, testDir);
		expect(result).toBeNull();
	});

	it('should handle absolute paths that exist', () => {
		const result = generateSourcePath(testFile, '/some/other/base');
		expect(result).toBe(testFile);
	});

	it('should return null for absolute paths that do not exist', () => {
		const nonExistentPath = join(testDir, 'does-not-exist.txt');
		const result = generateSourcePath(nonExistentPath, '/some/other/base');
		expect(result).toBeNull();
	});

	it('should handle relative paths with subdirectories', () => {
		// Create a subdirectory with a file
		const subDir = join(testDir, 'subdir');
		mkdirSync(subDir);
		const subFile = join(subDir, 'sub-file.txt');
		writeFileSync(subFile, 'sub content');

		const relativePath = 'subdir/sub-file.txt';
		const result = generateSourcePath(relativePath, testDir);

		expect(result).toBe(subFile);
	});

	it('should handle parent directory references', () => {
		// Create a subdirectory to test from
		const subDir = join(testDir, 'subdir');
		mkdirSync(subDir);

		// Test that parent directory relative paths work with existing file
		const relativePath = '../test-file.txt';
		const result = generateSourcePath(relativePath, subDir);

		// Should resolve to the test file in the parent (testDir)
		expect(result).toBe(testFile);
	});

	it('should handle current directory reference', () => {
		const relativePath = './test-file.txt';
		const result = generateSourcePath(relativePath, testDir);

		expect(result).toBe(resolve(testDir, relativePath));
	});

	it('should return null when path resolution fails', () => {
		// Test with a malformed path that would cause issues
		const result = generateSourcePath('invalid://path', testDir);
		expect(result).toBeNull();
	});

	it('should return null for paths that fail existence check', () => {
		// Test with various non-existent files
		const nonExistentPaths = [
			'does-not-exist.txt',
			'subdir/does-not-exist.txt',
			'../does-not-exist.txt',
		];

		nonExistentPaths.forEach((path) => {
			const result = generateSourcePath(path, testDir);
			expect(result).toBeNull();
		});
	});

	it('should handle paths with special characters', () => {
		const specialFile = join(testDir, 'special-file!@#$%^&*().txt');
		writeFileSync(specialFile, 'special content');

		const relativePath = 'special-file!@#$%^&*().txt';
		const result = generateSourcePath(relativePath, testDir);

		expect(result).toBe(specialFile);
	});

	it('should handle paths with spaces', () => {
		const spaceFile = join(testDir, 'file with spaces.txt');
		writeFileSync(spaceFile, 'space content');

		const relativePath = 'file with spaces.txt';
		const result = generateSourcePath(relativePath, testDir);

		expect(result).toBe(spaceFile);
	});

	it('should handle Unicode file names', () => {
		const unicodeFile = join(testDir, '测试文件.txt');
		writeFileSync(unicodeFile, 'unicode content');

		const relativePath = '测试文件.txt';
		const result = generateSourcePath(relativePath, testDir);

		expect(result).toBe(unicodeFile);
	});

	it('should be case sensitive on case-sensitive file systems', () => {
		const lowerFile = join(testDir, 'lowercase.txt');
		writeFileSync(lowerFile, 'content');

		// Try to access with different case
		const result1 = generateSourcePath('lowercase.txt', testDir);
		const result2 = generateSourcePath('LOWERCASE.txt', testDir);

		expect(result1).toBe(lowerFile);
		// On case-sensitive systems, this should be null
		// On case-insensitive systems, this might return the file
		if (process.platform !== 'win32' && process.platform !== 'darwin') {
			expect(result2).toBeNull();
		}
	});

	it('should handle directory existence check', () => {
		// Create a subdirectory
		const subDir = join(testDir, 'testdir');
		mkdirSync(subDir);

		const relativePath = 'testdir';
		const result = generateSourcePath(relativePath, testDir);

		expect(result).toBe(subDir);
	});

	it('should return normalized absolute paths', () => {
		const relativePath = './test-file.txt';
		const result = generateSourcePath(relativePath, testDir);

		// The result should be an absolute path
		expect(result).toBe(resolve(testDir, relativePath));
		expect(result?.startsWith('/')).toBe(true);
	});
});
