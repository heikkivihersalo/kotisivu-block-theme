import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { findBlocksRecursively } from '../../../../src/common/utils/blocks/findBlocksRecursively.ts';

describe('findBlocksRecursively', () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'findBlocksRecursively-test-'));
	});

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true });
	});

	it('should find block.json files in root directory', () => {
		const blockJsonContent = JSON.stringify({
			name: 'test-theme/test-block',
			title: 'Test Block',
		});

		writeFileSync(join(tempDir, 'block.json'), blockJsonContent);

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(1);
		expect(result[0].blockJson.name).toBe('test-theme/test-block');
		expect(result[0].path).toBe(tempDir);
	});

	it('should find block.json files in subdirectories and extract block names', () => {
		const buttonDir = join(tempDir, 'button');
		const cardDir = join(tempDir, 'my-custom-block');
		mkdirSync(buttonDir, { recursive: true });
		mkdirSync(cardDir, { recursive: true });

		const buttonBlock = JSON.stringify({
			name: 'test-theme/button',
			title: 'Button Block',
		});
		const cardBlock = JSON.stringify({
			name: 'test-theme/my-custom-block',
			title: 'Card Block',
		});

		writeFileSync(join(buttonDir, 'block.json'), buttonBlock);
		writeFileSync(join(cardDir, 'block.json'), cardBlock);

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(2);

		const buttonResult = result.find(
			(block) => block.blockJson.name === 'test-theme/button'
		);
		const cardResult = result.find(
			(block) => block.blockJson.name === 'test-theme/my-custom-block'
		);

		expect(buttonResult).toBeDefined();
		expect(cardResult).toBeDefined();
		expect(buttonResult?.path).toBe(buttonDir);
		expect(buttonResult?.name).toBe('button');
		expect(cardResult?.path).toBe(cardDir);
		expect(cardResult?.name).toBe('my-custom-block');
	});

	it('should skip hidden directories and node_modules', () => {
		const normalDir = join(tempDir, 'button');
		const hiddenDir = join(tempDir, '.hidden');
		const nodeModulesDir = join(tempDir, 'node_modules', 'some-package');

		mkdirSync(normalDir, { recursive: true });
		mkdirSync(hiddenDir, { recursive: true });
		mkdirSync(nodeModulesDir, { recursive: true });

		const blockJson = JSON.stringify({
			name: 'test-theme/button',
			title: 'Button',
		});

		writeFileSync(join(normalDir, 'block.json'), blockJson);
		writeFileSync(join(hiddenDir, 'block.json'), blockJson);
		writeFileSync(join(nodeModulesDir, 'block.json'), blockJson);

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(1);
		expect(result[0].path).toBe(normalDir);
	});

	it('should handle nested directory structures', () => {
		const nestedDir = join(tempDir, 'blocks', 'ui', 'button');
		mkdirSync(nestedDir, { recursive: true });

		const blockJson = JSON.stringify({
			name: 'test-theme/ui-button',
			title: 'UI Button',
		});

		writeFileSync(join(nestedDir, 'block.json'), blockJson);

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(1);
		expect(result[0].blockJson.name).toBe('test-theme/ui-button');
		expect(result[0].path).toBe(nestedDir);
	});

	it('should handle error conditions gracefully', () => {
		// Test invalid JSON
		const invalidBlockDir = join(tempDir, 'invalid-block');
		mkdirSync(invalidBlockDir, { recursive: true });
		writeFileSync(join(invalidBlockDir, 'block.json'), '{ invalid json }');

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(0);

		// Test nonexistent directory
		const nonexistentResult = findBlocksRecursively(
			join(tempDir, 'nonexistent'),
			tempDir
		);
		expect(nonexistentResult).toHaveLength(0);
	});

	it('should prevent infinite recursion with depth limit', () => {
		// Create a very deep directory structure
		let currentDir = tempDir;
		for (let i = 0; i < 15; i++) {
			currentDir = join(currentDir, `level-${i}`);
			mkdirSync(currentDir, { recursive: true });
		}

		const blockJson = JSON.stringify({
			name: 'test-theme/deep-block',
			title: 'Deep Block',
		});

		writeFileSync(join(currentDir, 'block.json'), blockJson);

		const result = findBlocksRecursively(tempDir, tempDir);
		// Should not find the block because it's too deep
		expect(result).toHaveLength(0);
	});
});
