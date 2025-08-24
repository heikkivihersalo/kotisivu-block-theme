/**
 * Shared dependencies
 */
import { generateAssetFilename } from './generateAssetFilename';
import type { OutputConfig } from '../../types';

/**
 * WordPress naming conventions for style files
 */
const WORDPRESS_STYLE_MAPPING: Record<string, string> = {
	'editor.css': 'index.css',
	'style.css': 'style-index.css',
};

/**
 * Determine output filename based on WordPress conventions
 * @param styleFile - The original style file name
 * @param config - The output configuration
 * @return The determined output file name
 */
export const determineOutputFilename = (
	styleFile: string,
	config: OutputConfig
): string => {
	const mappedName = WORDPRESS_STYLE_MAPPING[styleFile];
	const targetFile = mappedName || styleFile;

	return generateAssetFilename(targetFile, config.outputPath);
};
