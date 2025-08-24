import { describe, it, expect } from 'vitest';
import { extractFilenameWithoutExtension } from '../../../../src/common/utils/string/extractFilenameWithoutExtension.ts';

describe('extractFilenameWithoutExtension', () => {
	it('should extract filename without extension from a simple path', () => {
		const path = 'index.js';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('index');
	});

	it('should extract filename without extension from a path with directory', () => {
		const path = '/src/components/Button.jsx';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('/src/components/Button');
	});

	it('should handle Windows-style paths', () => {
		const path = 'C:\\src\\components\\Button.tsx';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('C:\\src\\components\\Button');
	});

	it('should handle files with multiple dots in the name', () => {
		const path = '/path/to/my.config.file.js';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('/path/to/my.config.file');
	});

	it('should handle files without extension', () => {
		const path = '/path/to/README';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('/path/to/README');
	});

	it('should handle deep nested paths', () => {
		const path = '/very/deep/nested/path/to/file.component.test.ts';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('/very/deep/nested/path/to/file.component.test');
	});

	it('should handle relative paths', () => {
		const path = './src/utils/helper.js';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('src/utils/helper'); // Should not include the leading ./
	});

	it('should handle parent directory paths', () => {
		const path = '../components/Modal.vue';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('../components/Modal');
	});

	it('should handle CSS files', () => {
		const path = '/styles/main.css';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('/styles/main');
	});

	it('should handle SCSS files', () => {
		const path = '/styles/components/_button.scss';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('/styles/components/_button');
	});

	it('should handle TypeScript declaration files', () => {
		const path = '/types/index.d.ts';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('/types/index.d');
	});

	it('should handle empty directory with filename', () => {
		const path = 'filename.ext';
		const result = extractFilenameWithoutExtension(path);
		expect(result).toBe('filename');
	});
});
