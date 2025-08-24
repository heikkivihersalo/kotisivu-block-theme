/**
 * External dependencies
 */
import { statSync } from 'node:fs';
import { relative } from 'node:path';

/**
 * Internal dependencies
 */
import { generateSourcePath } from '../../common/utils';
import type { DiscoveredAssetInfo } from '../../common/types';

/**
 * Discover asset files with custom path mappings
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
		} catch {
			// Skip inaccessible assets
			continue;
		}
	}

	return assets;
}
