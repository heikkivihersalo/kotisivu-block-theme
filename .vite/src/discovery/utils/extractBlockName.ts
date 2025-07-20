/**
 * Helper function to extract block name from directory path
 */
export function extractBlockName(dirPath: string): string {
	const parts = dirPath.split(/[/\\]/);
	return parts[parts.length - 1] || 'unknown';
}
