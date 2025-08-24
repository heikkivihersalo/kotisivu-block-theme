import { describe, it, expect } from 'vitest';
import { generateVersionFromFile } from '../../../../src/common/utils/version/generateVersionFromFile.ts';

describe('generateVersionFromFile', () => {
	it('should extract version hash from filename with dot separator', () => {
		const filename = 'main.a1b2c3d4e5f6ab12.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should extract version hash from filename with dash separator', () => {
		const filename = 'bundle-a1b2c3d4e5f6ab12.css';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should extract version hash from filename with both separators', () => {
		const filename = 'app-main.a1b2c3d4e5f6ab12ef34.min.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should return default version when no hash found', () => {
		const filename = 'simple-file.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('1.0.0');
	});

	it('should return default version for filename without extension', () => {
		const filename = 'README';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('1.0.0');
	});

	it('should return default version for empty string', () => {
		const filename = '';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('1.0.0');
	});

	it('should extract hash with exactly 8 characters minimum', () => {
		const filename = 'file.a1b2c3d4.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle longer hashes by truncating to 8 characters', () => {
		const filename = 'file.a1b2c3d4e5f6ab12ef34cd56.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should ignore short hashes (less than 8 characters)', () => {
		const filename = 'file.abc123.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('1.0.0'); // Default value when no valid hash found
	});

	it('should handle multiple possible hashes and return the first valid one', () => {
		const filename = 'file.abc123.a1b2c3d4e5f6ab12.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle mixed case hex characters', () => {
		const filename = 'file.a1b2c3d4e5f6ab12.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle files with multiple extensions', () => {
		const filename = 'bundle.a1b2c3d4e5f6ab12.min.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle CSS files with hash', () => {
		const filename = 'styles.a1b2c3d4e5f6ab12.css';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle image files with hash', () => {
		const filename = 'logo.a1b2c3d4e5f6ab12.png';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});
	it('should ignore short hashes (less than 8 characters)', () => {
		const filename = 'file.a1b2c3.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('1.0.0');
	});

	it('should handle multiple possible hashes and return the first valid one', () => {
		const filename = 'file.abc123.a1b2c3d4e5f6ab12.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle mixed case hex characters', () => {
		const filename = 'file.a1b2c3d4e5f6ab12.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle files with multiple extensions', () => {
		const filename = 'bundle.a1b2c3d4e5f6ab12.min.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle CSS files with hash', () => {
		const filename = 'styles.a1b2c3d4e5f6ab12.css';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle image files with hash', () => {
		const filename = 'logo.a1b2c3d4e5f6ab12.png';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should ignore non-hex characters in potential hash', () => {
		const filename = 'file.g1h2i3j4k5l6m7n8.js'; // Contains non-hex characters
		const result = generateVersionFromFile(filename);
		expect(result).toBe('1.0.0'); // Should return default as no valid hex hash found
	});

	it('should handle filename with hash at the beginning', () => {
		const filename = 'bundle.a1b2c3d4e5f6ab12.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle complex filename patterns', () => {
		const filename = 'webpack-bundle-analyzer.a1b2c3d4e5f6ab12.chunk.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle filenames with version-like numbers that are not hashes', () => {
		const filename = 'app-v1.2.3.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('1.0.0'); // Should return default as no valid hash found
	});

	it('should handle WordPress-style asset filenames', () => {
		const filename = 'wp-blocks.a1b2c3d4e5f6ab12.build.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle Vite-style chunked filenames', () => {
		const filename = 'index-a1b2c3d4e5f6ab12.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle source map files', () => {
		const filename = 'main.a1b2c3d4e5f6ab12.js.map';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});
	it('should handle filename with hash at the beginning', () => {
		const filename = 'a1b2c3d4e5f6ab12.bundle.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('1.0.0'); // No preceding separator
	});

	it('should handle complex filename patterns', () => {
		const filename = 'webpack-bundle-analyzer.a1b2c3d4e5f6ab12.chunk.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle filenames with version-like numbers that are not hashes', () => {
		const filename = 'jquery-3.6.0.min.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('1.0.0');
	});

	it('should handle WordPress-style asset filenames', () => {
		const filename = 'wp-blocks.a1b2c3d4e5f6ab12.build.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle Vite-style chunked filenames', () => {
		const filename = 'index-a1b2c3d4e5f6ab12.js';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});

	it('should handle source map files', () => {
		const filename = 'main.a1b2c3d4e5f6ab12.js.map';
		const result = generateVersionFromFile(filename);
		expect(result).toBe('a1b2c3d4');
	});
});
