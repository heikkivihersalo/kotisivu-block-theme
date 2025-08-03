/**
 * External dependencies
 */
import { statSync } from 'node:fs';
import { relative } from 'node:path';

/**
 * Internal dependencies
 */
import { generateSourcePath } from '../index.js';
import type { DiscoveredAssetInfo } from '../types/index.js';

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
	if (!pathMappings || typeof pathMappings !== 'object') {
		console.warn(
			'Warning: Invalid path mappings provided for asset discovery'
		);
		return [];
	}

	if (!pwd || typeof pwd !== 'string') {
		console.warn(
			'Warning: Invalid working directory provided for mapped asset discovery'
		);
		return [];
	}

	const assets: DiscoveredAssetInfo[] = [];
	const errors: string[] = [];
	const mappingEntries = Object.entries(pathMappings);

	if (mappingEntries.length === 0) {
		return [];
	}

	for (const [outputPath, sourcePath] of mappingEntries) {
		if (
			!outputPath ||
			!sourcePath ||
			typeof outputPath !== 'string' ||
			typeof sourcePath !== 'string'
		) {
			errors.push(
				`Invalid asset mapping entry: ${outputPath} -> ${sourcePath}`
			);
			continue;
		}

		const fullSourcePath = generateSourcePath(sourcePath, pwd);

		if (!fullSourcePath) {
			errors.push(`Could not resolve asset source path: ${sourcePath}`);
			continue;
		}

		try {
			const stat = statSync(fullSourcePath);
			if (stat.isFile()) {
				const assetName = outputPath.split('/').pop() || 'asset';
				const assetWithMapping: DiscoveredAssetInfo = {
					name: assetName,
					sourcePath: fullSourcePath,
					outputPath: outputPath,
					relativePath: relative(pwd, fullSourcePath),
				};
				assets.push(assetWithMapping);
			} else {
				errors.push(`Asset source path is not a file: ${sourcePath}`);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			errors.push(
				`Could not access asset source path ${sourcePath}: ${errorMessage}`
			);
		}
	}

	// Log accumulated errors
	if (errors.length > 0) {
		console.warn(
			'Asset discovery with mapping completed with errors:',
			errors
		);
	}

	return assets;
}
