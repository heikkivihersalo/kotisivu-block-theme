import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { generateSourcePath } from '../../../../src/common/utils/generateSourcePath.ts';

describe('generateSourcePath', () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'generateSourcePath-test-'));
	});

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true });
	});

	it('should return null for invalid paths', () => {
		expect(generateSourcePath('', tempDir)).toBeNull();
		expect(generateSourcePath(null as any, tempDir)).toBeNull();
		expect(generateSourcePath(undefined as any, tempDir)).toBeNull();
	});

	it('should return resolved path for existing file', () => {
		const fileName = 'test.js';
		const filePath = join(tempDir, fileName);
		writeFileSync(filePath, 'content');

		const result = generateSourcePath(fileName, tempDir);
		expect(result).toBe(filePath);
	});

	it('should return null for non-existing file', () => {
		const result = generateSourcePath('non-existing.js', tempDir);
		expect(result).toBeNull();
	});

	it('should handle relative paths', () => {
		const subDir = join(tempDir, 'subdir');
		const fileName = 'nested.js';
		const filePath = join(subDir, fileName);

		// Create directory and file
		mkdirSync(subDir, { recursive: true });
		writeFileSync(filePath, 'content');

		const result = generateSourcePath('subdir/nested.js', tempDir);
		expect(result).toBe(filePath);
	});
});
