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

	it('should find block.json files in subdirectories', () => {
		const buttonDir = join(tempDir, 'button');
		const cardDir = join(tempDir, 'card');
		mkdirSync(buttonDir, { recursive: true });
		mkdirSync(cardDir, { recursive: true });

		const buttonBlock = JSON.stringify({
			name: 'test-theme/button',
			title: 'Button Block',
		});
		const cardBlock = JSON.stringify({
			name: 'test-theme/card',
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
			(block) => block.blockJson.name === 'test-theme/card'
		);

		expect(buttonResult).toBeDefined();
		expect(cardResult).toBeDefined();
		expect(buttonResult?.path).toBe(buttonDir);
		expect(cardResult?.path).toBe(cardDir);
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

	it('should skip directories starting with dot', () => {
		const normalDir = join(tempDir, 'button');
		const hiddenDir = join(tempDir, '.hidden');
		mkdirSync(normalDir, { recursive: true });
		mkdirSync(hiddenDir, { recursive: true });

		const blockJson = JSON.stringify({
			name: 'test-theme/button',
			title: 'Button',
		});

		writeFileSync(join(normalDir, 'block.json'), blockJson);
		writeFileSync(join(hiddenDir, 'block.json'), blockJson);

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(1);
		expect(result[0].path).toBe(normalDir);
	});

	it('should skip node_modules directories', () => {
		const normalDir = join(tempDir, 'button');
		const nodeModulesDir = join(tempDir, 'node_modules', 'some-package');
		mkdirSync(normalDir, { recursive: true });
		mkdirSync(nodeModulesDir, { recursive: true });

		const blockJson = JSON.stringify({
			name: 'test-theme/button',
			title: 'Button',
		});

		writeFileSync(join(normalDir, 'block.json'), blockJson);
		writeFileSync(join(nodeModulesDir, 'block.json'), blockJson);

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(1);
		expect(result[0].path).toBe(normalDir);
	});

	it('should handle invalid JSON gracefully', () => {
		const blockDir = join(tempDir, 'invalid-block');
		mkdirSync(blockDir, { recursive: true });

		writeFileSync(join(blockDir, 'block.json'), '{ invalid json }');

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(0);
	});

	it('should handle missing files gracefully', () => {
		const result = findBlocksRecursively(
			join(tempDir, 'nonexistent'),
			tempDir
		);
		expect(result).toHaveLength(0);
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

	it('should extract correct block names', () => {
		const blockDir = join(tempDir, 'my-custom-block');
		mkdirSync(blockDir, { recursive: true });

		const blockJson = JSON.stringify({
			name: 'test-theme/my-custom-block',
			title: 'My Custom Block',
		});

		writeFileSync(join(blockDir, 'block.json'), blockJson);

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('my-custom-block');
	});

	it('should handle multiple blocks in different directory levels', () => {
		// Root level block
		const rootBlockJson = JSON.stringify({
			name: 'test-theme/root-block',
			title: 'Root Block',
		});
		writeFileSync(join(tempDir, 'block.json'), rootBlockJson);

		// First level blocks
		const level1Dir = join(tempDir, 'level1');
		mkdirSync(level1Dir, { recursive: true });
		const level1BlockJson = JSON.stringify({
			name: 'test-theme/level1-block',
			title: 'Level 1 Block',
		});
		writeFileSync(join(level1Dir, 'block.json'), level1BlockJson);

		// Second level blocks
		const level2Dir = join(level1Dir, 'level2');
		mkdirSync(level2Dir, { recursive: true });
		const level2BlockJson = JSON.stringify({
			name: 'test-theme/level2-block',
			title: 'Level 2 Block',
		});
		writeFileSync(join(level2Dir, 'block.json'), level2BlockJson);

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(3);

		const names = result.map((block) => block.blockJson.name);
		expect(names).toContain('test-theme/root-block');
		expect(names).toContain('test-theme/level1-block');
		expect(names).toContain('test-theme/level2-block');
	});

	it('should handle directories with permission errors gracefully', () => {
		const validDir = join(tempDir, 'valid-block');
		mkdirSync(validDir, { recursive: true });

		const blockJson = JSON.stringify({
			name: 'test-theme/valid-block',
			title: 'Valid Block',
		});

		writeFileSync(join(validDir, 'block.json'), blockJson);

		const result = findBlocksRecursively(tempDir, tempDir);
		expect(result).toHaveLength(1);
		expect(result[0].blockJson.name).toBe('test-theme/valid-block');
	});
});
