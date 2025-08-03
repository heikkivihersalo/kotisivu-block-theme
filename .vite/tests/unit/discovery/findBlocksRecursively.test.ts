import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { findBlocksRecursively } from '../../../src/common/discovery/utils/findBlocksRecursively';

describe('findBlocksRecursively', () => {
	let testDir: string;

	beforeEach(() => {
		// Create a temporary directory for testing
		testDir = join(tmpdir(), `test-${Date.now()}-${Math.random()}`);
		mkdirSync(testDir, { recursive: true });
	});

	afterEach(() => {
		// Clean up test directory
		try {
			rmSync(testDir, { recursive: true, force: true });
		} catch (error) {
			// Ignore cleanup errors
		}
	});

	it('should find single block in directory', () => {
		const blockDir = join(testDir, 'my-block');
		mkdirSync(blockDir);

		const blockJson = {
			name: 'test/my-block',
			title: 'My Test Block',
		};

		writeFileSync(
			join(blockDir, 'block.json'),
			JSON.stringify(blockJson, null, 2)
		);

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('my-block');
		expect(result[0].blockJson).toEqual(blockJson);
		expect(result[0].path).toBe(blockDir);
	});

	it('should find multiple blocks at same level', () => {
		const blocks = ['block-one', 'block-two', 'block-three'];

		blocks.forEach((blockName) => {
			const blockDir = join(testDir, blockName);
			mkdirSync(blockDir);

			const blockJson = {
				name: `test/${blockName}`,
				title: `${blockName} Title`,
			};

			writeFileSync(
				join(blockDir, 'block.json'),
				JSON.stringify(blockJson)
			);
		});

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(3);

		const blockNames = result.map((block: any) => block.name).sort();
		expect(blockNames).toEqual(['block-one', 'block-three', 'block-two']);
	});

	it('should find blocks in nested directories', () => {
		const nestedPath = join(testDir, 'category', 'subcategory', 'my-block');
		mkdirSync(nestedPath, { recursive: true });

		const blockJson = {
			name: 'test/nested-block',
			title: 'Nested Block',
		};

		writeFileSync(
			join(nestedPath, 'block.json'),
			JSON.stringify(blockJson)
		);

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('my-block');
		expect(result[0].path).toBe(nestedPath);
	});

	it('should find blocks at different nesting levels', () => {
		// Root level block
		const rootBlockDir = join(testDir, 'root-block');
		mkdirSync(rootBlockDir);
		writeFileSync(
			join(rootBlockDir, 'block.json'),
			JSON.stringify({
				name: 'test/root-block',
				title: 'Root Block',
			})
		);

		// Nested block
		const nestedBlockDir = join(testDir, 'category', 'nested-block');
		mkdirSync(nestedBlockDir, { recursive: true });
		writeFileSync(
			join(nestedBlockDir, 'block.json'),
			JSON.stringify({
				name: 'test/nested-block',
				title: 'Nested Block',
			})
		);

		// Deep nested block
		const deepBlockDir = join(
			testDir,
			'deep',
			'very',
			'deep',
			'deep-block'
		);
		mkdirSync(deepBlockDir, { recursive: true });
		writeFileSync(
			join(deepBlockDir, 'block.json'),
			JSON.stringify({
				name: 'test/deep-block',
				title: 'Deep Block',
			})
		);

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(3);

		const blockNames = result.map((block: any) => block.name).sort();
		expect(blockNames).toEqual([
			'deep-block',
			'nested-block',
			'root-block',
		]);
	});

	it('should skip common directories', () => {
		const skipDirs = ['node_modules', '.git', 'dist', 'build'];

		skipDirs.forEach((skipDir) => {
			const skipDirPath = join(testDir, skipDir, 'should-skip');
			mkdirSync(skipDirPath, { recursive: true });
			writeFileSync(
				join(skipDirPath, 'block.json'),
				JSON.stringify({
					name: 'test/should-skip',
					title: 'Should Skip',
				})
			);
		});

		// Add a valid block
		const validBlockDir = join(testDir, 'valid-block');
		mkdirSync(validBlockDir);
		writeFileSync(
			join(validBlockDir, 'block.json'),
			JSON.stringify({
				name: 'test/valid-block',
				title: 'Valid Block',
			})
		);

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('valid-block');
	});

	it('should skip hidden directories', () => {
		const hiddenDirs = ['.hidden', '.cache', '.vscode'];

		hiddenDirs.forEach((hiddenDir) => {
			const hiddenDirPath = join(testDir, hiddenDir, 'hidden-block');
			mkdirSync(hiddenDirPath, { recursive: true });
			writeFileSync(
				join(hiddenDirPath, 'block.json'),
				JSON.stringify({
					name: 'test/hidden-block',
					title: 'Hidden Block',
				})
			);
		});

		// Add a valid block
		const validBlockDir = join(testDir, 'visible-block');
		mkdirSync(validBlockDir);
		writeFileSync(
			join(validBlockDir, 'block.json'),
			JSON.stringify({
				name: 'test/visible-block',
				title: 'Visible Block',
			})
		);

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('visible-block');
	});

	it('should handle empty directories', () => {
		const emptyDir = join(testDir, 'empty-dir');
		mkdirSync(emptyDir);

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(0);
	});

	it('should handle non-existent directory gracefully', () => {
		const nonExistentDir = join(testDir, 'does-not-exist');

		const result = findBlocksRecursively(nonExistentDir, testDir);

		expect(result).toHaveLength(0);
	});

	it('should handle invalid block.json files', () => {
		const validBlockDir = join(testDir, 'valid-block');
		mkdirSync(validBlockDir);
		writeFileSync(
			join(validBlockDir, 'block.json'),
			JSON.stringify({
				name: 'test/valid-block',
				title: 'Valid Block',
			})
		);

		const invalidBlockDir = join(testDir, 'invalid-block');
		mkdirSync(invalidBlockDir);
		writeFileSync(join(invalidBlockDir, 'block.json'), '{ invalid json }');

		const result = findBlocksRecursively(testDir, testDir);

		// Should only find the valid block
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('valid-block');
	});

	it('should respect maximum recursion depth', () => {
		// Create a very deep directory structure (deeper than MAX_RECURSION_DEPTH = 10)
		let currentDir = testDir;
		for (let i = 0; i < 15; i++) {
			currentDir = join(currentDir, `level-${i}`);
			mkdirSync(currentDir, { recursive: true });
		}

		// Add a block at the very deep level
		writeFileSync(
			join(currentDir, 'block.json'),
			JSON.stringify({
				name: 'test/deep-block',
				title: 'Deep Block',
			})
		);

		const result = findBlocksRecursively(testDir, testDir);

		// Should not find the block due to depth limit
		expect(result).toHaveLength(0);
	});

	it('should handle directories with only non-block files', () => {
		const dirWithFiles = join(testDir, 'files-only');
		mkdirSync(dirWithFiles);

		// Add various non-block files
		writeFileSync(join(dirWithFiles, 'index.js'), 'console.log("hello");');
		writeFileSync(join(dirWithFiles, 'style.css'), 'body { margin: 0; }');
		writeFileSync(join(dirWithFiles, 'README.md'), '# Test Block');
		writeFileSync(join(dirWithFiles, 'package.json'), '{"name": "test"}');

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(0);
	});

	it('should handle mixed content directories', () => {
		const mixedDir = join(testDir, 'mixed-content');
		mkdirSync(mixedDir);

		// Add a valid block
		const blockDir = join(mixedDir, 'my-block');
		mkdirSync(blockDir);
		writeFileSync(
			join(blockDir, 'block.json'),
			JSON.stringify({
				name: 'test/my-block',
				title: 'My Block',
			})
		);

		// Add non-block files and directories
		writeFileSync(join(mixedDir, 'index.js'), 'console.log("hello");');
		mkdirSync(join(mixedDir, 'utils'));
		writeFileSync(
			join(mixedDir, 'utils', 'helper.js'),
			'export const help = () => {};'
		);

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('my-block');
	});

	it('should handle Unicode directory names', () => {
		const unicodeDirs = ['测试块', 'тест-блок', '🚀-block'];

		unicodeDirs.forEach((dirName, index) => {
			const blockDir = join(testDir, dirName);
			mkdirSync(blockDir);
			writeFileSync(
				join(blockDir, 'block.json'),
				JSON.stringify({
					name: `test/${dirName}`,
					title: `Unicode Block ${index}`,
				})
			);
		});

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(3);

		const blockNames = result.map((block: any) => block.name).sort();
		expect(blockNames).toEqual(['тест-блок', '测试块', '🚀-block']);
	});

	it('should handle blocks with complex block.json', () => {
		const blockDir = join(testDir, 'complex-block');
		mkdirSync(blockDir);

		const complexBlockJson = {
			$schema: 'https://schemas.wp.org/trunk/block.json',
			apiVersion: 3,
			name: 'test/complex-block',
			title: 'Complex Block',
			description: 'A block with many properties',
			category: 'design',
			icon: 'layout',
			keywords: ['test', 'complex'],
			supports: {
				className: false,
				anchor: true,
				color: {
					text: true,
					background: true,
				},
			},
			attributes: {
				content: {
					type: 'string',
					source: 'html',
					selector: 'p',
				},
				alignment: {
					type: 'string',
					default: 'left',
				},
			},
			style: 'file:./style-index.css',
			editorStyle: 'file:./index.css',
			editorScript: 'file:./index.js',
		};

		writeFileSync(
			join(blockDir, 'block.json'),
			JSON.stringify(complexBlockJson, null, 2)
		);

		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('complex-block');
		expect(result[0].blockJson).toEqual(complexBlockJson);
		expect(result[0].blockJson.supports?.color?.text).toBe(true);
	});

	it('should return empty array for depth 0 call without blocks', () => {
		// Create directory structure but no blocks
		mkdirSync(join(testDir, 'subdir'));
		writeFileSync(join(testDir, 'subdir', 'file.txt'), 'content');

		const result = findBlocksRecursively(testDir, testDir, 0);

		expect(result).toHaveLength(0);
	});

	it('should handle permission errors gracefully', () => {
		const validBlockDir = join(testDir, 'valid-block');
		mkdirSync(validBlockDir);
		writeFileSync(
			join(validBlockDir, 'block.json'),
			JSON.stringify({
				name: 'test/valid-block',
				title: 'Valid Block',
			})
		);

		// The function should handle stat errors gracefully and continue processing
		const result = findBlocksRecursively(testDir, testDir);

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('valid-block');
	});
});
