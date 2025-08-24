/**
 * Generate a version string from a filename
 * This function extracts a version hash from the filename,
 * typically used for cache busting in asset management.
 *
 * @param filename - The name of the file to extract the version from.
 * @return A string representing the version, or '1.0.0' if no
 */
export function generateVersionFromFile(filename: string): string {
	const match = filename.match(/[.-]([a-f0-9]{8,})\./);
	return match ? match[1].substring(0, 8) : '1.0.0';
}
