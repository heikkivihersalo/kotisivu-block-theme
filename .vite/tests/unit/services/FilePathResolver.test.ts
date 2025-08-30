import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { FilePathResolver } from '../../../src/common/services/FilePathResolver';

describe('FilePathResolver', () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'FilePathResolver-test-'));
	});

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true });
	});

	describe('findActualStylePath', () => {
		it('should return the original path if it exists', () => {
			const fileName = 'style.css';
			const filePath = join(tempDir, fileName);
			writeFileSync(filePath, 'body { color: red; }');

			const result = FilePathResolver.findActualStylePath(
				tempDir,
				fileName
			);
			expect(result).toBe(filePath);
		});

		it('should find files with different style extensions', () => {
			const fileName = 'style.scss';
			const filePath = join(tempDir, fileName);
			writeFileSync(filePath, '$color: red; body { color: $color; }');

			// Search for .css but find .scss
			const result = FilePathResolver.findActualStylePath(
				tempDir,
				'style.css'
			);
			expect(result).toBe(filePath);
		});

		it('should return null if no file is found', () => {
			const result = FilePathResolver.findActualStylePath(
				tempDir,
				'non-existing.css'
			);
			expect(result).toBeNull();
		});

		it('should find editor styles when looking for index.css', () => {
			const fileName = 'editor.scss';
			const filePath = join(tempDir, fileName);
			writeFileSync(filePath, 'body { color: blue; }');

			const result = FilePathResolver.findActualStylePath(
				tempDir,
				'index.css'
			);
			expect(result).toBe(filePath);
		});

		it('should find style files when looking for style-index.css', () => {
			const fileName = 'style.less';
			const filePath = join(tempDir, fileName);
			writeFileSync(filePath, '@color: green; body { color: @color; }');

			const result = FilePathResolver.findActualStylePath(
				tempDir,
				'style-index.css'
			);
			expect(result).toBe(filePath);
		});
	});

	describe('findActualFilePath', () => {
		it('should return the original path if it exists', () => {
			const fileName = 'script.js';
			const filePath = join(tempDir, fileName);
			writeFileSync(filePath, 'console.log("test");');

			const result = FilePathResolver.findActualFilePath(
				tempDir,
				fileName
			);
			expect(result).toBe(filePath);
		});

		it('should find files with different script extensions', () => {
			const fileName = 'script.ts';
			const filePath = join(tempDir, fileName);
			writeFileSync(filePath, 'const message: string = "test";');

			// Search for .js but find .ts
			const result = FilePathResolver.findActualFilePath(
				tempDir,
				'script.js'
			);
			expect(result).toBe(filePath);
		});

		it('should return null if no file is found', () => {
			const result = FilePathResolver.findActualFilePath(
				tempDir,
				'non-existing.js'
			);
			expect(result).toBeNull();
		});
	});

	describe('fileExists', () => {
		it('should return true for existing files', () => {
			const fileName = 'test.txt';
			const filePath = join(tempDir, fileName);
			writeFileSync(filePath, 'content');

			expect(FilePathResolver.fileExists(filePath)).toBe(true);
		});

		it('should return false for non-existing files', () => {
			const filePath = join(tempDir, 'non-existing.txt');
			expect(FilePathResolver.fileExists(filePath)).toBe(false);
		});
	});

	describe('generateSourcePath', () => {
		it('should return null for invalid paths', () => {
			expect(FilePathResolver.generateSourcePath('', tempDir)).toBeNull();
			expect(
				FilePathResolver.generateSourcePath(null as any, tempDir)
			).toBeNull();
			expect(
				FilePathResolver.generateSourcePath(undefined as any, tempDir)
			).toBeNull();
		});

		it('should return resolved path for existing file', () => {
			const fileName = 'test.js';
			const filePath = join(tempDir, fileName);
			writeFileSync(filePath, 'content');

			const result = FilePathResolver.generateSourcePath(
				fileName,
				tempDir
			);
			expect(result).toBe(filePath);
		});

		it('should return null for non-existing file', () => {
			const result = FilePathResolver.generateSourcePath(
				'non-existing.js',
				tempDir
			);
			expect(result).toBeNull();
		});

		it('should handle relative paths', () => {
			const subDir = join(tempDir, 'subdir');
			const fileName = 'nested.js';
			const filePath = join(subDir, fileName);

			// Create directory and file
			mkdirSync(subDir, { recursive: true });
			writeFileSync(filePath, 'content');

			const result = FilePathResolver.generateSourcePath(
				'subdir/nested.js',
				tempDir
			);
			expect(result).toBe(filePath);
		});
	});

	describe('normalizePath', () => {
		it('should return null for null/undefined input', () => {
			expect(FilePathResolver.normalizePath(null)).toBeNull();
			expect(FilePathResolver.normalizePath(undefined)).toBeNull();
		});

		it('should add separator to paths without trailing separator', () => {
			expect(FilePathResolver.normalizePath('/path/to/directory')).toBe(
				'/path/to/directory/'
			);
			expect(FilePathResolver.normalizePath('C:\\Users\\test')).toBe(
				'C:\\Users\\test/'
			);
			expect(FilePathResolver.normalizePath('./src/components')).toBe(
				'./src/components/'
			);
			expect(FilePathResolver.normalizePath('')).toBe('/');
		});

		it('should return path unchanged if it already ends with separator', () => {
			const pathWithSep = '/path/to/directory/';
			expect(FilePathResolver.normalizePath(pathWithSep)).toBe(
				pathWithSep
			);
		});
	});

	describe('generateVersionFromFile', () => {
		it('should extract version hash from filename', () => {
			expect(
				FilePathResolver.generateVersionFromFile(
					'main.a1b2c3d4e5f6ab12.js'
				)
			).toBe('a1b2c3d4');
			expect(
				FilePathResolver.generateVersionFromFile(
					'bundle-a1b2c3d4e5f6ab12.css'
				)
			).toBe('a1b2c3d4');
			expect(
				FilePathResolver.generateVersionFromFile(
					'app-main.a1b2c3d4e5f6ab12ef34.min.js'
				)
			).toBe('a1b2c3d4');
			expect(
				FilePathResolver.generateVersionFromFile(
					'index-a1b2c3d4e5f6ab12.js'
				)
			).toBe('a1b2c3d4');
		});

		it('should return default version for files without hash', () => {
			expect(
				FilePathResolver.generateVersionFromFile('simple-file.js')
			).toBe('1.0.0');
			expect(FilePathResolver.generateVersionFromFile('README')).toBe(
				'1.0.0'
			);
			expect(FilePathResolver.generateVersionFromFile('')).toBe('1.0.0');
			expect(
				FilePathResolver.generateVersionFromFile('file.abc123.js')
			).toBe('1.0.0'); // Too short
			expect(
				FilePathResolver.generateVersionFromFile(
					'file.g1h2i3j4k5l6m7n8.js'
				)
			).toBe('1.0.0'); // Contains non-hex characters
		});
	});
});
