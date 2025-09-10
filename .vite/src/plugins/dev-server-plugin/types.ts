/**
 * External dependencies
 */
import type { ManifestChunk } from 'vite';

/**
 * @deprecated Legacy types - these are no longer used.
 * All configuration is now handled through the unified PluginConfig from ConfigPlugin.
 * These types remain only for backward compatibility and will be removed in a future version.
 */

/**
 * Block asset information for HMR
 */
export interface BlockAssetInfo {
	build: Record<string, string>;
	src: Record<string, string>;
	slug: string;
}

/**
 * General asset information for HMR (from AssetsPlugin)
 */
export interface AssetInfo {
	buildPath: string;
	sourcePath: string;
	assetName: string;
	type: 'asset';
}

/**
 * Combined asset type for middleware functions
 */
export type CombinedAssetInfo = BlockAssetInfo | AssetInfo;

/**
 * Interface for BuildMapResolver class
 */
export interface IBuildMapResolver {
	getBuildMap(): Record<string, ManifestChunk>;
	updateBuildMap(newBuildMap: Record<string, ManifestChunk>): void;
	saveBuildMap(): void;
	clearBuildMap(): void;
	addToBuildMap(fileName: string, manifestChunk: ManifestChunk): void;
	createHotUpdateEntry(file: string): void;
}

/**
 * Global window extensions for HMR client configuration
 */
declare global {
	interface Window {
		__VITE_INLINE_ASSETS_CONFIG__?: {
			blockAssets: Array<
				[
					string,
					{
						slug: string;
						sourcePath: string;
						buildPath?: string;
					},
				]
			>;
			blockNamespace: string;
			pollingInterval: number;
			viteServerUrl?: string;
		};
	}
}

export {};
