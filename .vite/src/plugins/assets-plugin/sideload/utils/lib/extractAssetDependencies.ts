/**
 * Extract dependencies from TypeScript/JavaScript asset file
 * @param _assetPath - Path to the asset file (unused for now)
 * @param _buildResult - esbuild result containing metafile (unused for now)
 * @returns Array of WordPress dependencies
 */
export function extractAssetDependencies(
	_assetPath: string,
	_buildResult?: any
): string[] {
	// TODO: Implement dependency extraction from build metafile if needed
	// Currently dependencies are specified in the plugin configuration
	return [];
}
