/**
 * External dependencies
 */
import { statSync } from 'node:fs';
import { relative } from 'node:path';

/**
 * Internal dependencies
 */
import { generateSourcePath } from '../../common/utils';
import type { DiscoveredAssetInfo } from '../../common/types/assets.ts';

/**
 * Discover asset files with custom path mappings
 * This function allows mapping source files to custom output paths
 * @param pathMappings - Object mapping output paths to source files
 * @param pwd - Current working directory to resolve relative paths
 * @return An array of DiscoveredAssetInfo objects for each discovered asset
 */
export function discoverAssetsWithMapping(
	pathMappings: Record<string, string>,
	pwd: string
): DiscoveredAssetInfo[] {
	if (!pathMappings || Object.keys(pathMappings).length === 0) {
		return [];
	}

	const assets: DiscoveredAssetInfo[] = [];

	for (const [outputPath, sourcePath] of Object.entries(pathMappings)) {
		try {
			const fullSourcePath = generateSourcePath(sourcePath, pwd);
			if (!fullSourcePath) continue;

			const stat = statSync(fullSourcePath);
			if (stat.isFile()) {
				const assetName = outputPath.split('/').pop() || 'asset';
				assets.push({
					name: assetName,
					sourcePath: fullSourcePath,
					outputPath: outputPath,
					relativePath: relative(pwd, fullSourcePath),
				});
			}
		} catch (error) {
			console.warn(`Could not process asset ${sourcePath}:`, error);
		}
	}

	return assets;
}
