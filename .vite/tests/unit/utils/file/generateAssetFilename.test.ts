import { describe, it, expect } from 'vitest';
import { generateAssetFilename } from '../../../../src/common/utils/file/generateAssetFilename.ts';

describe('generateAssetFilename', () => {
	it('should return filename without outputPath when outputPath is not provided', () => {
		const filename = 'index.js';
		const result = generateAssetFilename(filename);
		expect(result).toBe('index.js');
	});

	it('should return filename without outputPath when outputPath is undefined', () => {
		const filename = 'style.css';
		const result = generateAssetFilename(filename, undefined);
		expect(result).toBe('style.css');
	});

	it('should combine outputPath and filename when outputPath is provided', () => {
		const filename = 'index.js';
		const outputPath = 'assets';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('assets/index.js');
	});

	it('should handle nested output paths', () => {
		const filename = 'main.css';
		const outputPath = 'build/assets/styles';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('build/assets/styles/main.css');
	});

	it('should handle empty filename', () => {
		const filename = '';
		const outputPath = 'assets';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('assets/');
	});

	it('should handle empty outputPath', () => {
		const filename = 'bundle.js';
		const outputPath = '';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('bundle.js'); // Should return just the filename when outputPath is empty
	});

	it('should handle outputPath with trailing slash', () => {
		const filename = 'app.js';
		const outputPath = 'dist/';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('dist//app.js');
	});

	it('should handle filename with path separators', () => {
		const filename = 'components/Button.js';
		const outputPath = 'build';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('build/components/Button.js');
	});

	it('should handle special characters in filename', () => {
		const filename = 'my-component@2x.png';
		const outputPath = 'images';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('images/my-component@2x.png');
	});

	it('should handle spaces in paths', () => {
		const filename = 'my file.txt';
		const outputPath = 'my folder';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('my folder/my file.txt');
	});

	it('should handle dot files', () => {
		const filename = '.gitignore';
		const outputPath = 'config';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('config/.gitignore');
	});

	it('should handle files with multiple extensions', () => {
		const filename = 'backup.tar.gz';
		const outputPath = 'archives';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('archives/backup.tar.gz');
	});

	it('should handle long filenames', () => {
		const filename =
			'very-long-filename-with-many-characters-and-details.component.test.js';
		const outputPath = 'test-assets';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe(
			'test-assets/very-long-filename-with-many-characters-and-details.component.test.js'
		);
	});

	it('should handle numeric filenames', () => {
		const filename = '12345.json';
		const outputPath = 'data';
		const result = generateAssetFilename(filename, outputPath);
		expect(result).toBe('data/12345.json');
	});
});
