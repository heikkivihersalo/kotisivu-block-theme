/**
 * External dependencies
 */
import { resolve } from 'node:path';

/**
 * External dependencies
 */
import type { OutputConfig } from '../../../../../common/types/assets.ts';

/**
 * Generate output configuration for block assets
 * @param blockPath - Path to the block directory (required for multi-block builds)
 * @param blockName - Name of the block (required)
 * @param customOutputPath - Optional custom output path for assets
 * @param outputDirectory - Output directory (required)
 */
export const generateOutputConfig = (
	blockPath: string,
	blockName: string,
	customOutputPath?: string,
	outputDirectory?: string
): OutputConfig => {
	if (!blockPath) {
		throw new Error('blockPath is required for multi-block builds');
	}

	if (!blockName) {
		throw new Error('blockName is required for multi-block builds');
	}

	if (!outputDirectory) {
		throw new Error('outputDirectory is required for multi-block builds');
	}

	// Use custom output path if provided, otherwise use block name
	const outputPath = customOutputPath || blockName;
	const blockOutputDir = customOutputPath
		? resolve(outputDirectory, customOutputPath)
		: resolve(outputDirectory, outputPath);

	return {
		basePath: blockPath,
		blockOutputDir,
		outputPath,
	};
};
