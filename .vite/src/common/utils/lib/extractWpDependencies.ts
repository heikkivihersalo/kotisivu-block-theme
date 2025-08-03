import type { AssetInfo, ChunkInfo } from '../../types/rollup.ts';

/**
 * Extract WordPress dependencies from bundle files or import arrays
 * This function scans the bundle files or import arrays for imports,
 * transforms @wordpress namespace imports to wp- format, and returns
 * all unique imports.
 *
 * @param bundleOrImports - The bundle object containing file information or an array of import strings.
 * @return An array of unique dependencies with WordPress imports in wp- format.
 */
export function extractWpDependencies(
	bundleOrImports:
		| { [fileName: string]: ChunkInfo | AssetInfo }
		| string[]
		| undefined
): string[] {
	if (!bundleOrImports) {
		return [];
	}

	let allImports: string[] = [];

	if (Array.isArray(bundleOrImports)) {
		// Handle array of import strings (Vite manifest format)
		allImports = bundleOrImports;
	} else {
		// Handle bundle object (Rollup format)
		allImports = Object.values(bundleOrImports)
			.filter((file) => file.code)
			.flatMap((file) => file.imports);
	}

	const transformedImports = allImports.map((importPath) =>
		importPath.replace(/^@wordpress\//, 'wp-')
	);

	return [...new Set(transformedImports)];
}
