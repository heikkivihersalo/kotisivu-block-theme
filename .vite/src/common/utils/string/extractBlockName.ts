/**
 * Extracts the block name from a directory path.
 * The block name is assumed to be the last segment of the path.
 * @param dirPath - The directory path to extract the block name from
 * @return The extracted block name or 'unknown' if the path is empty
 */
export function extractBlockName(dirPath: string): string {
	const parts = dirPath.split(/[/\\]/);
	return parts[parts.length - 1] || 'unknown';
}
