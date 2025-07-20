import { resolve } from 'node:path';

/**
 * Output path configuration for block assets
 */
export type OutputConfig = {
	basePath: string;
	blockOutputDir: string;
	outputPath?: string;
};

/**
 * Generate output configuration for block assets
 * @param blockPath - Path to the block directory (required for multi-block builds)
 * @param blockName - Name of the block (required)
 * @param customOutputPath - Optional custom output path for assets
 * @param outputDirectory - Optional output directory
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

	// Use custom output path if provided, otherwise use block name
	const outputPath = customOutputPath || blockName;
	const blockOutputDir = customOutputPath
		? resolve(process.env.PWD || process.cwd(), 'build', customOutputPath)
		: outputPath
			? resolve(outputDirectory || '', '..', outputPath)
			: outputDirectory || '';

	return {
		basePath: blockPath,
		blockOutputDir,
		outputPath,
	};
};

/**
 * Generate asset filename with output path prefix
 */
export const generateAssetFilename = (
	filename: string,
	outputPath?: string
): string => {
	return outputPath ? `${outputPath}/${filename}` : filename;
};
