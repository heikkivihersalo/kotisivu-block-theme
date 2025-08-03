import { join, parse } from 'node:path';
import { describe, expect, it } from 'vitest';
import { extractFilenameWithoutExtension } from '../../../src/common/utils/lib/extractFilenameWithoutExtension';

describe('extractFilenameWithoutExtension', () => {
	it('should extract filename without extension from simple file path', () => {
		const path = '/home/user/documents/file.txt';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/home/user/documents', 'file');
		expect(result).toBe(expected);
	});

	it('should handle file without extension', () => {
		const path = '/home/user/documents/README';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe(path);
	});

	it('should handle file with multiple extensions', () => {
		const path = '/home/user/documents/archive.tar.gz';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/home/user/documents', 'archive.tar');
		expect(result).toBe(expected);
	});

	it('should handle relative paths', () => {
		const path = './src/components/Button.tsx';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('./src/components', 'Button');
		expect(result).toBe(expected);
	});

	it('should handle paths with dots in directory names', () => {
		const path = '/home/user/.config/app/config.json';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/home/user/.config/app', 'config');
		expect(result).toBe(expected);
	});

	it('should handle filename that starts with dot', () => {
		const path = '/home/user/.gitignore';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/home/user', '.gitignore');
		expect(result).toBe(expected);
	});

	it('should handle hidden files with extension', () => {
		const path = '/home/user/.env.local';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/home/user', '.env');
		expect(result).toBe(expected);
	});

	it('should handle filename only (no directory)', () => {
		const path = 'file.txt';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('file');
	});

	it('should handle root directory file', () => {
		const path = '/file.txt';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/', 'file');
		expect(result).toBe(expected);
	});

	it('should handle Windows-style paths', () => {
		const path = 'C:\\Users\\Documents\\file.txt';
		const result = extractFilenameWithoutExtension(path);
		const parsed = parse(path);
		const expected = join(parsed.dir, parsed.name);
		expect(result).toBe(expected);
	});

	it('should handle paths with spaces', () => {
		const path = '/home/user/My Documents/Important File.docx';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/home/user/My Documents', 'Important File');
		expect(result).toBe(expected);
	});

	it('should handle paths with special characters', () => {
		const path = '/home/user/files/test-file_123.json';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/home/user/files', 'test-file_123');
		expect(result).toBe(expected);
	});

	it('should handle Unicode filenames', () => {
		const path = '/home/用户/文档/测试文件.txt';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/home/用户/文档', '测试文件');
		expect(result).toBe(expected);
	});

	it('should handle empty string', () => {
		const path = '';
		const result = extractFilenameWithoutExtension(path);
		const parsed = parse(path);
		const expected = join(parsed.dir, parsed.name);
		expect(result).toBe(expected);
	});

	it('should handle single dot', () => {
		const path = '.';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('.');
	});

	it('should handle double dot', () => {
		const path = '..';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('..');
	});

	it('should handle file extension only', () => {
		const path = '/home/user/.txt';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/home/user', '.txt');
		expect(result).toBe(expected);
	});

	it('should handle very long file extensions', () => {
		const path = '/home/user/file.verylongextension';
		const result = extractFilenameWithoutExtension(path);
		const expected = join('/home/user', 'file');
		expect(result).toBe(expected);
	});

	it('should handle nested directory structure', () => {
		const path =
			'/home/user/projects/web/src/components/ui/Button.component.tsx';
		const result = extractFilenameWithoutExtension(path);
		const expected = join(
			'/home/user/projects/web/src/components/ui',
			'Button.component'
		);
		expect(result).toBe(expected);
	});

	it('should match Node.js path.parse behavior', () => {
		const testPaths = [
			'/home/user/file.txt',
			'./relative/path.js',
			'C:\\Windows\\file.exe',
			'simple.txt',
			'.hidden',
			'..config.json',
		];

		testPaths.forEach((path) => {
			const result = extractFilenameWithoutExtension(path);
			const parsed = parse(path);
			const expected = join(parsed.dir, parsed.name);
			expect(result).toBe(expected);
		});
	});
});
