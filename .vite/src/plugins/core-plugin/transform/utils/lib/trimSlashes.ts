/**
 * Trim slashes from a filename
 * @param
 */
export function trimSlashes(filename: string): string {
	return filename.replace(/^[/\\]+|[/\\]+$/g, '');
}
