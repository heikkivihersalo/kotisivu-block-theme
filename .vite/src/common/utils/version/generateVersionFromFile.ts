/**
 * Generate version string from filename hash
 *
 * Extracts hash from file names like 'main.a1b2c3d4e5f6ab12.js'
 * and returns the first 8 characters as version identifier.
 *
 * @param filename - The filename to extract version from
 * @return A string representing the version, or '1.0.0' if no hash found
 */
export function generateVersionFromFile(filename: string): string {
	const match = filename.match(/[.-]([a-f0-9]{8,})\./);
	return match ? match[1].substring(0, 8) : '1.0.0';
}
