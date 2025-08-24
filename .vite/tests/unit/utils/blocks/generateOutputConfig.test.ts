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

	it('should validate required parameters', () => {
		expect(() =>
			generateOutputConfig('', 'button', undefined, '/output')
		).toThrow('blockPath is required');
		expect(() =>
			generateOutputConfig('/path', '', undefined, '/output')
		).toThrow('blockName is required');
		expect(() =>
			generateOutputConfig('/path', 'button', undefined, '')
		).toThrow('outputDirectory is required');
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
