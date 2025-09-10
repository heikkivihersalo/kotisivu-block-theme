/**
 * Asset Utilities
 *
 * Utilities for finding and resolving asset paths.
 */

import fs from 'fs';
import path from 'path';
import type { BlockAssetInfo, AssetInfo } from '../types.js';

/**
 * Find the actual file path for an asset
 */
export function findAssetPath(
	assetPath: string,
	blockAssets: Map<string, BlockAssetInfo>,
	generalAssets?: Map<string, AssetInfo>
): string {
	// Try direct resolution first
	const directPath = path.resolve(assetPath);
	if (fs.existsSync(directPath)) {
		return directPath;
	}

	// Check block assets
	for (const [, assetInfo] of blockAssets) {
		for (const buildPath of Object.values(assetInfo.build)) {
			if (
				buildPath === assetPath ||
				buildPath.endsWith(assetPath) ||
				assetPath.endsWith(buildPath)
			) {
				const fullPath = path.resolve(buildPath);
				if (fs.existsSync(fullPath)) {
					return fullPath;
				}
			}
		}
	}

	// Check general assets
	if (generalAssets) {
		for (const [, assetInfo] of generalAssets) {
			if (
				assetInfo.buildPath === assetPath ||
				assetInfo.buildPath.endsWith(assetPath) ||
				assetPath.endsWith(assetInfo.buildPath)
			) {
				const fullPath = path.resolve(assetInfo.buildPath);
				if (fs.existsSync(fullPath)) {
					return fullPath;
				}
			}
		}
	}

	return '';
}
