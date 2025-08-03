import { describe, expect, it } from 'vitest';
import { extractBlockName } from '../../../src/plugins/blocks-plugin/discovery/utils/extractBlockName';

describe('extractBlockName', () => {
	it('should extract block name from Unix-style path', () => {
		const dirPath = '/home/user/blocks/my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should extract block name from Windows-style path', () => {
		const dirPath = 'C:\\Users\\Dev\\blocks\\my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should extract block name from mixed path separators', () => {
		const dirPath = '/home/user\\blocks/my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should extract block name from relative path', () => {
		const dirPath = './src/blocks/hero-section';
		const result = extractBlockName(dirPath);
		expect(result).toBe('hero-section');
	});

	it('should extract block name from deep nested path', () => {
		const dirPath = '/very/deep/nested/directory/structure/final-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('final-block');
	});

	it('should handle path with trailing slash', () => {
		const dirPath = '/home/user/blocks/my-block/';
		const result = extractBlockName(dirPath);
		expect(result).toBe('unknown');
	});

	it('should handle path with trailing backslash', () => {
		const dirPath = 'C:\\blocks\\my-block\\';
		const result = extractBlockName(dirPath);
		expect(result).toBe('unknown');
	});

	it('should return directory name for single directory', () => {
		const dirPath = 'my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should handle empty string', () => {
		const dirPath = '';
		const result = extractBlockName(dirPath);
		expect(result).toBe('unknown');
	});

	it('should handle root path', () => {
		const dirPath = '/';
		const result = extractBlockName(dirPath);
		expect(result).toBe('unknown');
	});

	it('should handle Windows root path', () => {
		const dirPath = 'C:\\';
		const result = extractBlockName(dirPath);
		expect(result).toBe('unknown');
	});

	it('should handle block names with special characters', () => {
		const testCases = [
			'/blocks/block-with-dashes',
			'/blocks/block_with_underscores',
			'/blocks/block.with.dots',
			'/blocks/block@with@symbols',
			'/blocks/block+with+plus',
			'/blocks/block(with)parentheses',
		];

		const expectedResults = [
			'block-with-dashes',
			'block_with_underscores',
			'block.with.dots',
			'block@with@symbols',
			'block+with+plus',
			'block(with)parentheses',
		];

		testCases.forEach((dirPath, index) => {
			const result = extractBlockName(dirPath);
			expect(result).toBe(expectedResults[index]);
		});
	});

	it('should handle Unicode block names', () => {
		const testCases = [
			'/blocks/测试块',
			'/blocks/тест-блок',
			'/blocks/🚀-rocket-block',
			'/blocks/café-block',
		];

		const expectedResults = [
			'测试块',
			'тест-блок',
			'🚀-rocket-block',
			'café-block',
		];

		testCases.forEach((dirPath, index) => {
			const result = extractBlockName(dirPath);
			expect(result).toBe(expectedResults[index]);
		});
	});

	it('should handle block names with numbers', () => {
		const testCases = [
			'/blocks/block123',
			'/blocks/123block',
			'/blocks/block-v2',
			'/blocks/carousel-v1.2.3',
		];

		const expectedResults = [
			'block123',
			'123block',
			'block-v2',
			'carousel-v1.2.3',
		];

		testCases.forEach((dirPath, index) => {
			const result = extractBlockName(dirPath);
			expect(result).toBe(expectedResults[index]);
		});
	});

	it('should handle paths with spaces', () => {
		const dirPath = '/blocks/my awesome block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my awesome block');
	});

	it('should handle very long block names', () => {
		const longName = 'a'.repeat(200);
		const dirPath = `/blocks/${longName}`;
		const result = extractBlockName(dirPath);
		expect(result).toBe(longName);
	});

	it('should handle current directory reference', () => {
		const dirPath = './my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should handle parent directory reference', () => {
		const dirPath = '../my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should handle multiple consecutive separators', () => {
		const testCases = [
			'/blocks//my-block',
			'/blocks///my-block',
			'C:\\\\blocks\\\\my-block',
			'/blocks/\\/my-block',
		];

		testCases.forEach((dirPath) => {
			const result = extractBlockName(dirPath);
			expect(result).toBe('my-block');
		});
	});

	it('should handle network/UNC paths', () => {
		const dirPath = '\\\\server\\share\\blocks\\my-block';
		const result = extractBlockName(dirPath);
		expect(result).toBe('my-block');
	});

	it('should be consistent with different path formats for same block', () => {
		const paths = [
			'/home/blocks/hero-section',
			'C:\\projects\\blocks\\hero-section',
			'./blocks/hero-section',
			'blocks/hero-section',
			'/home/blocks/hero-section/',
		];

		const results = paths.map((path) => extractBlockName(path));

		// All should extract 'hero-section' except the one with trailing slash
		expect(results[0]).toBe('hero-section');
		expect(results[1]).toBe('hero-section');
		expect(results[2]).toBe('hero-section');
		expect(results[3]).toBe('hero-section');
		expect(results[4]).toBe('unknown'); // trailing slash case
	});

	it('should handle edge case with only separators', () => {
		const testCases = ['///', '\\\\\\', '/\\/', ''];

		testCases.forEach((dirPath) => {
			const result = extractBlockName(dirPath);
			expect(result).toBe('unknown');
		});
	});
});
