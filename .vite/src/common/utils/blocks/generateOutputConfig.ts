/**
 * External dependencies
 */
import { resolve } from 'node:path';

/**
 * External dependencies
 */
import type { OutputConfig } from '../../types';

/**
 * Generate output configuration for block assets
 * @param blockPath - Path to the block directory
 * @param blockName - Name of the block
 * @param customOutputPath - Optional custom output path for assets
 * @param outputDirectory - Output directory
 */
export const generateOutputConfig = (
	blockPath: string,
	blockName: string,
	customOutputPath?: string,
	outputDirectory = 'dist'
): OutputConfig => {
	if (!blockPath) throw new Error('blockPath is required');
	if (!blockName) throw new Error('blockName is required');
	if (!outputDirectory) throw new Error('outputDirectory is required');

	// Use custom output path if provided, otherwise use block name
	const outputPath = customOutputPath || blockName;
	const blockOutputDir = resolve(outputDirectory, outputPath);

	return {
		basePath: blockPath,
		blockOutputDir,
		outputPath,
	};
};
