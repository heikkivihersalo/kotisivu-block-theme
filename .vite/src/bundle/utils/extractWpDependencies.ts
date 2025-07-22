/**
 * Internal dependencies
 */
import type { AssetInfo, ChunkInfo } from '../../../types/index.ts';

/**
 * Extract WordPress dependencies from bundle files
 * This function scans the bundle files for imports that match the
 * @wordpress namespace and converts them to the wp- format.
 * It returns a list of unique WordPress dependencies.
 *
 * @param bundle - The bundle object containing file information.
 * @return An array of unique WordPress dependencies in wp- format.
 */
export function extractWpDependencies(bundle: {
	[fileName: string]: ChunkInfo | AssetInfo;
}): string[] {
	const dependencies = new Set<string>();

	for (const file of Object.values(bundle)) {
		if (!file.code) continue;

		// Convert @wordpress/ imports to wp- format
		for (const importPath of file.imports) {
			const wpDependency = importPath.replace(/^@wordpress\//, 'wp-');
			dependencies.add(wpDependency);
		}
	}

	return Array.from(dependencies);
}
