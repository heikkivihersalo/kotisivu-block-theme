import { describe, it, expect } from 'vitest';
import { generateVersionFromFile } from '../../../../src/common/utils/version/generateVersionFromFile.ts';

describe('generateVersionFromFile', () => {
	it('should extract version hash from filenames with separators', () => {
		expect(generateVersionFromFile('main.a1b2c3d4e5f6ab12.js')).toBe(
			'a1b2c3d4'
		);
		expect(generateVersionFromFile('bundle-a1b2c3d4e5f6ab12.css')).toBe(
			'a1b2c3d4'
		);
		expect(
			generateVersionFromFile('app-main.a1b2c3d4e5f6ab12ef34.min.js')
		).toBe('a1b2c3d4');
		expect(generateVersionFromFile('index-a1b2c3d4e5f6ab12.js')).toBe(
			'a1b2c3d4'
		);
	});

	it('should return default version when no valid hash found', () => {
		expect(generateVersionFromFile('simple-file.js')).toBe('1.0.0');
		expect(generateVersionFromFile('README')).toBe('1.0.0');
		expect(generateVersionFromFile('')).toBe('1.0.0');
		expect(generateVersionFromFile('file.abc123.js')).toBe('1.0.0'); // Too short
		expect(generateVersionFromFile('file.g1h2i3j4k5l6m7n8.js')).toBe(
			'1.0.0'
		); // Non-hex
	});

	it('should handle various file types and patterns', () => {
		expect(generateVersionFromFile('styles.a1b2c3d4e5f6ab12.css')).toBe(
			'a1b2c3d4'
		);
		expect(generateVersionFromFile('logo.a1b2c3d4e5f6ab12.png')).toBe(
			'a1b2c3d4'
		);
		expect(generateVersionFromFile('main.a1b2c3d4e5f6ab12.js.map')).toBe(
			'a1b2c3d4'
		);
		expect(generateVersionFromFile('bundle.a1b2c3d4e5f6ab12.min.js')).toBe(
			'a1b2c3d4'
		);
	});

	it('should truncate longer hashes to 8 characters', () => {
		expect(
			generateVersionFromFile('file.a1b2c3d4e5f6ab12ef34cd56.js')
		).toBe('a1b2c3d4');
	});
});
