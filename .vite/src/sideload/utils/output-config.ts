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
 */
export const generateOutputConfig = (
	blockPath?: string,
	blockName?: string,
	customOutputPath?: string,
	outputDirectory?: string
): OutputConfig => {
	// Default to PWD/src if no blockPath is provided (for backward compatibility)
	const basePath = blockPath || `${process.env.PWD}/src`;

	// Use custom output path if provided, otherwise use block name or default
	const outputPath = customOutputPath || blockName;
	const blockOutputDir = customOutputPath
		? resolve(process.env.PWD || process.cwd(), 'build', customOutputPath)
		: outputPath
			? resolve(outputDirectory || '', '..', outputPath)
			: outputDirectory || '';

	return {
		basePath,
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
