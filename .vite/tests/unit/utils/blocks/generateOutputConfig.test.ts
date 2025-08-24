import { describe, it, expect } from 'vitest';
import { resolve } from 'node:path';
import { generateOutputConfig } from '../../../../src/common/utils/blocks/generateOutputConfig.ts';

describe('generateOutputConfig', () => {
	it('should generate basic output configuration', () => {
		const blockPath = '/path/to/blocks/button';
		const blockName = 'button';
		const outputDirectory = '/path/to/output';

		const result = generateOutputConfig(
			blockPath,
			blockName,
			undefined,
			outputDirectory
		);

		expect(result.basePath).toBe(blockPath);
		expect(result.outputPath).toBe(blockName);
		expect(result.blockOutputDir).toBe(resolve(outputDirectory, blockName));
	});

	it('should handle custom output path', () => {
		const blockPath = '/path/to/blocks/button';
		const blockName = 'button';
		const customOutputPath = 'ui/button';
		const outputDirectory = '/path/to/output';

		const result = generateOutputConfig(
			blockPath,
			blockName,
			customOutputPath,
			outputDirectory
		);

		expect(result.basePath).toBe(blockPath);
		expect(result.outputPath).toBe(customOutputPath);
		expect(result.blockOutputDir).toBe(
			resolve(outputDirectory, customOutputPath)
		);
	});

	it('should throw error when blockPath is missing', () => {
		expect(() => {
			generateOutputConfig('', 'button', undefined, '/output');
		}).toThrow('blockPath is required for multi-block builds');
	});

	it('should throw error when blockName is missing', () => {
		expect(() => {
			generateOutputConfig('/path/to/block', '', undefined, '/output');
		}).toThrow('blockName is required for multi-block builds');
	});

	it('should throw error when outputDirectory is missing', () => {
		expect(() => {
			generateOutputConfig('/path/to/block', 'button', undefined, '');
		}).toThrow('outputDirectory is required for multi-block builds');
	});

	it('should handle complex directory paths', () => {
		const blockPath =
			'/Users/developer/project/src/blocks/ui/components/button';
		const blockName = 'ui-button';
		const outputDirectory = '/Users/developer/project/build/blocks';

		const result = generateOutputConfig(
			blockPath,
			blockName,
			undefined,
			outputDirectory
		);

		expect(result.basePath).toBe(blockPath);
		expect(result.outputPath).toBe(blockName);
		expect(result.blockOutputDir).toBe(resolve(outputDirectory, blockName));
	});

	it('should handle nested custom output paths', () => {
		const blockPath = '/path/to/blocks/button';
		const blockName = 'button';
		const customOutputPath = 'components/ui/button';
		const outputDirectory = '/build';

		const result = generateOutputConfig(
			blockPath,
			blockName,
			customOutputPath,
			outputDirectory
		);

		expect(result.basePath).toBe(blockPath);
		expect(result.outputPath).toBe(customOutputPath);
		expect(result.blockOutputDir).toBe(
			resolve(outputDirectory, customOutputPath)
		);
	});

	it('should handle relative paths', () => {
		const blockPath = './src/blocks/button';
		const blockName = 'button';
		const outputDirectory = './build';

		const result = generateOutputConfig(
			blockPath,
			blockName,
			undefined,
			outputDirectory
		);

		expect(result.basePath).toBe(blockPath);
		expect(result.outputPath).toBe(blockName);
		expect(result.blockOutputDir).toBe(resolve(outputDirectory, blockName));
	});

	it('should handle Windows-style paths', () => {
		const blockPath = 'C:\\Users\\developer\\blocks\\button';
		const blockName = 'button';
		const outputDirectory = 'C:\\Users\\developer\\build';

		const result = generateOutputConfig(
			blockPath,
			blockName,
			undefined,
			outputDirectory
		);

		expect(result.basePath).toBe(blockPath);
		expect(result.outputPath).toBe(blockName);
		expect(result.blockOutputDir).toBe(resolve(outputDirectory, blockName));
	});

	it('should handle block names with hyphens and underscores', () => {
		const blockPath = '/blocks/my-custom_block';
		const blockName = 'my-custom_block';
		const outputDirectory = '/build';

		const result = generateOutputConfig(
			blockPath,
			blockName,
			undefined,
			outputDirectory
		);

		expect(result.basePath).toBe(blockPath);
		expect(result.outputPath).toBe(blockName);
		expect(result.blockOutputDir).toBe(resolve(outputDirectory, blockName));
	});

	it('should prioritize custom output path over block name', () => {
		const blockPath = '/blocks/button';
		const blockName = 'button';
		const customOutputPath = 'different-name';
		const outputDirectory = '/build';

		const result = generateOutputConfig(
			blockPath,
			blockName,
			customOutputPath,
			outputDirectory
		);

		expect(result.outputPath).toBe(customOutputPath);
		expect(result.outputPath).not.toBe(blockName);
		expect(result.blockOutputDir).toBe(
			resolve(outputDirectory, customOutputPath)
		);
	});

	it('should handle empty custom output path as falsy', () => {
		const blockPath = '/blocks/button';
		const blockName = 'button';
		const customOutputPath = '';
		const outputDirectory = '/build';

		const result = generateOutputConfig(
			blockPath,
			blockName,
			customOutputPath,
			outputDirectory
		);

		expect(result.outputPath).toBe(blockName); // Should fallback to blockName
		expect(result.blockOutputDir).toBe(resolve(outputDirectory, blockName));
	});
});
