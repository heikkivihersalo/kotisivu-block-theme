/**
 * Internal dependencies
 */
import type { FileIdentifier, FilePathInfo } from './paths.ts';

export type DiscoveredAssetInfo = FileIdentifier &
	FilePathInfo & {
		relativePath: string; // Required for asset discovery
	};

/**
 * Internal output configuration for processing assets
 * This is not a user configuration but an internal type for build processing
 */
export type OutputConfig = {
	basePath: string;
	blockOutputDir: string;
	outputPath?: string;
};
