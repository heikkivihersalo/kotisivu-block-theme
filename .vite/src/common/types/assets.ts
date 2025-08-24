/**
 * Internal dependencies
 */
import type { AssetIdentifier, PathInfo } from './base.ts';

export type DiscoveredAssetInfo = AssetIdentifier &
	PathInfo & {
		relativePath: string; // Required for asset discovery
	};

export type OutputConfig = {
	basePath: string;
	blockOutputDir: string;
	outputPath?: string;
};
