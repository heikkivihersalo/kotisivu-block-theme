/**
 * Trim slashes from a filename
 * @param filename - The filename to trim
 * @return The trimmed filename
 */
export function trimSlashes(filename: string): string {
	return filename.replace(/^[/\\]+|[/\\]+$/g, '');
}
