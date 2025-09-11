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
