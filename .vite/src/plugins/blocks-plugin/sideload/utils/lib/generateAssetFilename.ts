/**
 * Generate asset filename with output path prefix
 */
export const generateAssetFilename = (
	filename: string,
	outputPath?: string
): string => {
	return outputPath ? `${outputPath}/${filename}` : filename;
};
