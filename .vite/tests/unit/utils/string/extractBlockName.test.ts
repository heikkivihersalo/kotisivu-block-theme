import { describe, it, expect } from 'vitest';
import { extractBlockName } from '../../../../src/common/utils/string/extractBlockName.ts';

describe('extractBlockName', () => {
	it('should extract block name from path', () => {
		expect(extractBlockName('/path/to/blocks/my-block')).toBe('my-block');
		expect(extractBlockName('C:\\path\\to\\blocks\\my-block')).toBe(
			'my-block'
		);
		expect(extractBlockName('/path\\to/blocks\\my-block')).toBe('my-block');
	});

	it('should handle single directory name', () => {
		expect(extractBlockName('my-block')).toBe('my-block');
	});

	it('should return "unknown" for edge cases', () => {
		expect(extractBlockName('/path/to/blocks/my-block/')).toBe('unknown');
		expect(extractBlockName('')).toBe('unknown');
		expect(extractBlockName('/')).toBe('unknown');
		expect(extractBlockName('C:\\')).toBe('unknown');
	});

	it('should handle complex block names', () => {
		expect(extractBlockName('/src/blocks/custom-block-123')).toBe(
			'custom-block-123'
		);
		expect(extractBlockName('/path/to/my block with spaces')).toBe(
			'my block with spaces'
		);
	});
});
