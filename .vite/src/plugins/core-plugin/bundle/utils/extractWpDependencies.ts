/**
 * Internal dependencies
 */
import type { AssetInfo, ChunkInfo } from '../../../../common/types/rollup.ts';

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
	const allImports = Object.values(bundle)
		.filter((file) => file.code)
		.flatMap((file) => file.imports)
		.map((importPath) => importPath.replace(/^@wordpress\//, 'wp-'));

	return [...new Set(allImports)];
}
