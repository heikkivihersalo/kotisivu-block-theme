import { describe, it, expect } from 'vitest';
import { generateAssetFilename } from '../../../../src/common/utils/file/generateAssetFilename.ts';

describe('generateAssetFilename', () => {
	it('should return filename when no outputPath provided', () => {
		expect(generateAssetFilename('index.js')).toBe('index.js');
		expect(generateAssetFilename('style.css', undefined)).toBe('style.css');
		expect(generateAssetFilename('bundle.js', '')).toBe('bundle.js');
	});

	it('should combine outputPath and filename when outputPath is provided', () => {
		expect(generateAssetFilename('index.js', 'assets')).toBe(
			'assets/index.js'
		);
		expect(generateAssetFilename('main.css', 'build/assets/styles')).toBe(
			'build/assets/styles/main.css'
		);
		expect(generateAssetFilename('components/Button.js', 'build')).toBe(
			'build/components/Button.js'
		);
	});

	it('should handle edge cases', () => {
		expect(generateAssetFilename('', 'assets')).toBe('assets/');
		expect(generateAssetFilename('app.js', 'dist/')).toBe('dist//app.js');
		expect(generateAssetFilename('.gitignore', 'config')).toBe(
			'config/.gitignore'
		);
	});
});
