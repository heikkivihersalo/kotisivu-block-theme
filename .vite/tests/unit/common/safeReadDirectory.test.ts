import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { safeReadDirectory } from '../../../src/common/utils/safeReadDirectory';

describe('safeReadDirectory', () => {
	let testDir: string;

	beforeEach(() => {
		// Create a temporary directory for testing
		testDir = join(tmpdir(), `test-${Date.now()}-${Math.random()}`);
		mkdirSync(testDir, { recursive: true });
	});

	afterEach(() => {
		// Clean up test directory
		try {
			rmSync(testDir, { recursive: true, force: true });
		} catch (error) {
			// Ignore cleanup errors
		}
	});

	it('should successfully read a directory with files', () => {
		// Create some test files
		writeFileSync(join(testDir, 'file1.txt'), 'content1');
		writeFileSync(join(testDir, 'file2.js'), 'content2');
		mkdirSync(join(testDir, 'subdir'));

		const result = safeReadDirectory(testDir);

		expect(result.error).toBeNull();
		expect(result.items).toHaveLength(3);
		expect(result.items).toContain('file1.txt');
		expect(result.items).toContain('file2.js');
		expect(result.items).toContain('subdir');
	});

	it('should return empty array for empty directory', () => {
		const result = safeReadDirectory(testDir);

		expect(result.error).toBeNull();
		expect(result.items).toEqual([]);
	});

	it('should handle non-existent directory gracefully', () => {
		const nonExistentDir = join(testDir, 'does-not-exist');
		const result = safeReadDirectory(nonExistentDir);

		expect(result.error).not.toBeNull();
		expect(result.error).toContain('Could not read directory');
		expect(result.items).toEqual([]);
	});

	it('should handle errors gracefully with various invalid paths', () => {
		const invalidPaths = [
			'/path/that/does/not/exist',
			'',
			null as any,
			undefined as any,
			123 as any,
			'invalid://path',
		];

		invalidPaths.forEach((path) => {
			const result = safeReadDirectory(path);

			// For null and undefined, we might get different behavior
			if (path === null || path === undefined) {
				expect(result.error).not.toBeNull();
				expect(result.items).toEqual([]);
			} else {
				// For other invalid paths, we should get an error
				expect(result.items).toEqual([]);
			}
		});
	});

	it('should handle null and undefined input paths', () => {
		const resultNull = safeReadDirectory(null as any);
		const resultUndefined = safeReadDirectory(undefined as any);

		expect(resultNull.error).not.toBeNull();
		expect(resultNull.items).toEqual([]);
		expect(resultUndefined.error).not.toBeNull();
		expect(resultUndefined.items).toEqual([]);
	});

	it('should handle empty string path', () => {
		const result = safeReadDirectory('');

		expect(result.error).not.toBeNull();
		expect(result.items).toEqual([]);
	});

	it('should return items in same order as fs.readdirSync', () => {
		// Create files with specific names to test ordering
		writeFileSync(join(testDir, 'z-file.txt'), 'content');
		writeFileSync(join(testDir, 'a-file.txt'), 'content');
		writeFileSync(join(testDir, 'm-file.txt'), 'content');

		const result = safeReadDirectory(testDir);
		const expectedOrder = readdirSync(testDir);

		expect(result.error).toBeNull();
		expect(result.items).toEqual(expectedOrder);
	});
});
