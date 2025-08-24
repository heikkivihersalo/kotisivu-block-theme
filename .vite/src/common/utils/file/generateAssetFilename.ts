/**
 * Generate asset filename by joining output path and filename
 * @param filename - The base filename to use
 * @param outputPath - Optional output path to prefix the filename
 * @return The full asset filename with output path prefix if provided
 */
export const generateAssetFilename = (
	filename: string,
	outputPath?: string
): string => {
	return outputPath && outputPath !== ''
		? `${outputPath}/${filename}`
		: filename;
};
