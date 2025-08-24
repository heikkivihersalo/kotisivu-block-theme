import { describe, it, expect } from 'vitest';
import { extractFilenameWithoutExtension } from '../../../../src/common/utils/string/extractFilenameWithoutExtension.ts';

describe('extractFilenameWithoutExtension', () => {
	it('should extract filename without extension from various paths', () => {
		expect(extractFilenameWithoutExtension('index.js')).toBe('index');
		expect(
			extractFilenameWithoutExtension('/src/components/Button.jsx')
		).toBe('/src/components/Button');
		expect(
			extractFilenameWithoutExtension('C:\\src\\components\\Button.tsx')
		).toBe('C:\\src\\components\\Button');
		expect(
			extractFilenameWithoutExtension('/path/to/my.config.file.js')
		).toBe('/path/to/my.config.file');
	});

	it('should handle files without extension', () => {
		expect(extractFilenameWithoutExtension('/path/to/README')).toBe(
			'/path/to/README'
		);
		expect(extractFilenameWithoutExtension('filename')).toBe('filename');
	});

	it('should handle relative paths', () => {
		expect(extractFilenameWithoutExtension('./src/utils/helper.js')).toBe(
			'src/utils/helper'
		);
		expect(extractFilenameWithoutExtension('../components/Modal.vue')).toBe(
			'../components/Modal'
		);
	});
});
