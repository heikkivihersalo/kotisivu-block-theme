/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';

/**
 * Internal dependencies
 */
import type { BlockAssetInfo, AssetInfo } from '../types';
import type {
	BlockInfo,
	DiscoveredAssetInfo,
} from '../../../common/types/index.js';
import type { ResolvedPluginConfig } from '../../config-plugin/index.js';
import { BuildMapResolver } from '../../../common/services/BuildMapResolver';

/**
 * AssetManager handles asset discovery, conversion, and monitoring
 */
export class AssetManager {
	private blockAssets = new Map<string, BlockAssetInfo>();
	private generalAssets = new Map<string, AssetInfo>();
	private buildMapResolver: BuildMapResolver;
	private pluginConfig: ResolvedPluginConfig;

	constructor(
		buildMapResolver: BuildMapResolver,
		pluginConfig: ResolvedPluginConfig
	) {
		this.buildMapResolver = buildMapResolver;
		this.pluginConfig = pluginConfig;
	}

	/**
	 * Convert BlockInfo from BlocksPlugin to BlockAssetInfo for DevServer
	 * Uses BuildMapResolver for accurate build paths
	 */
	convertBlocksToAssets(
		discoveredBlocks: BlockInfo[]
	): Map<string, BlockAssetInfo> {
		const blockAssets = new Map<string, BlockAssetInfo>();

		if (!this.pluginConfig || !this.buildMapResolver) return blockAssets;

		const buildMap = this.buildMapResolver.getBuildMap();

		// Common file mappings for blocks
		const fileMapping = [
			{ source: 'editor.css', build: 'index.css' },
			{ source: 'style.css', build: 'style-index.css' },
			{ source: 'view.js', build: 'view.js' },
			{ source: 'view.jsx', build: 'view.js' },
			{ source: 'view.ts', build: 'view.js' },
			{ source: 'view.tsx', build: 'view.js' },
			{ source: 'editor.js', build: 'index.js' },
			{ source: 'editor.jsx', build: 'index.js' },
			{ source: 'editor.ts', build: 'index.js' },
			{ source: 'editor.tsx', build: 'index.js' },
		];

		discoveredBlocks.forEach((block) => {
			fileMapping.forEach(({ source, build }) => {
				const sourcePath = path.join(block.path, source);

				if (!fs.existsSync(sourcePath)) return;

				// Get build path from BuildMapResolver or construct it
				const buildMapEntry = Object.values(buildMap).find(
					(entry) =>
						entry.src ===
						sourcePath.replace(process.cwd() + '/', '')
				);

				const buildPath = buildMapEntry
					? path.join(
							this.pluginConfig.build?.outDir || 'build',
							buildMapEntry.file
						)
					: path.join(
							this.pluginConfig.build?.outDir || 'build',
							block.outputPath || block.name,
							build
						);

				const parsed = source.replace(/\.(css|js|jsx|ts|tsx)$/, '');
				const assetKey = `${block.name}-${parsed}`;

				// Merge with existing asset info for this key
				const existingAsset = blockAssets.get(assetKey) || {
					build: {},
					src: {},
					slug: block.name,
				};

				blockAssets.set(assetKey, {
					...existingAsset,
					build: {
						...existingAsset.build,
						[build]: buildPath.replace(/\\/g, '/'),
					},
					src: {
						...existingAsset.src,
						[source]: sourcePath.replace(/\\/g, '/'),
					},
				});
			});
		});

		console.log(
			`[DevServer] Converted ${blockAssets.size} block assets from BlocksPlugin`
		);

		this.blockAssets = blockAssets;
		return blockAssets;
	}

	/**
	 * Convert DiscoveredAssetInfo from AssetsPlugin to AssetInfo for DevServer
	 * Uses BuildMapResolver for accurate build paths
	 */
	convertAssetsToAssetInfo(
		discoveredAssets: DiscoveredAssetInfo[]
	): Map<string, AssetInfo> {
		const assetMap = new Map<string, AssetInfo>();

		if (!this.buildMapResolver) return assetMap;

		const buildMap = this.buildMapResolver.getBuildMap();

		discoveredAssets.forEach((asset) => {
			// Get build path from BuildMapResolver or use fallback
			const buildMapEntry = Object.values(buildMap).find(
				(entry) =>
					entry.src ===
					asset.sourcePath.replace(process.cwd() + '/', '')
			);

			const buildPath = buildMapEntry
				? path.resolve(
						this.pluginConfig.build?.outDir || 'build',
						buildMapEntry.file
					)
				: path.resolve(asset.outputPath);

			assetMap.set(asset.name, {
				buildPath,
				sourcePath: asset.sourcePath,
				assetName: asset.name,
				type: 'asset',
			});
		});

		console.log(
			`[DevServer] Converted ${assetMap.size} assets from AssetsPlugin`
		);

		this.generalAssets = assetMap;
		return assetMap;
	}

	/**
	 * Get all monitored assets (inline + dynamic blocks + general assets)
	 */
	getAllMonitoredAssets(inlineAssets: string[]): string[] {
		const allAssets = new Set<string>();

		// Add inline CSS assets from configuration
		inlineAssets.forEach((asset) => allAssets.add(asset));

		// Add block assets
		for (const [, asset] of this.blockAssets) {
			Object.values(asset.build).forEach((buildPath) => {
				allAssets.add(buildPath);
			});
		}

		// Add general assets
		for (const [, asset] of this.generalAssets) {
			allAssets.add(asset.buildPath);
		}

		// Add configured inline file paths
		if (this.pluginConfig?.paths?.inlineFiles) {
			Object.keys(this.pluginConfig.paths.inlineFiles).forEach((key) => {
				allAssets.add(`build/${key}.css`);
			});
		}

		return [...allAssets];
	}

	/**
	 * Add discovered block build assets that exist but may not be tracked
	 */
	addDiscoveredBlockAssets(
		blocksPluginApi: any,
		allAssets: Set<string>
	): void {
		if (!blocksPluginApi) return;

		const discoveredBlocks =
			blocksPluginApi.getDiscoveredBlocks() as BlockInfo[];
		const fileTypes = [
			'index.css',
			'style-index.css',
			'view.js',
			'index.js',
		];

		discoveredBlocks.forEach((block: BlockInfo) => {
			fileTypes.forEach((fileType) => {
				const buildPath = path
					.join(
						this.pluginConfig.build?.outDir || 'build',
						block.outputPath || block.name,
						fileType
					)
					.replace(/\\/g, '/');

				if (fs.existsSync(buildPath)) {
					allAssets.add(buildPath);
				}
			});
		});
	}

	/**
	 * Get current block assets
	 */
	getBlockAssets(): Map<string, BlockAssetInfo> {
		return this.blockAssets;
	}

	/**
	 * Get current general assets
	 */
	getGeneralAssets(): Map<string, AssetInfo> {
		return this.generalAssets;
	}

	/**
	 * Update plugin configuration with discovered assets
	 */
	updatePluginConfigWithDiscoveredAssets(): void {
		// Add discovered assets' build paths to inline watch list if they don't exist
		const buildDir = this.pluginConfig.build?.outDir || 'build';

		for (const [, assetInfo] of this.generalAssets) {
			const buildPath = assetInfo.buildPath;
			if (buildPath.includes(buildDir)) {
				const relativeBuildPath = buildPath.replace(
					process.cwd() + '/',
					''
				);
				if (
					!this.pluginConfig.hmr?.watch?.inline?.includes(
						relativeBuildPath
					)
				) {
					this.pluginConfig.hmr.watch = this.pluginConfig.hmr
						.watch || {
						inline: [],
						css: [],
						php: [],
						scripts: [],
						blocks: [],
					};
					this.pluginConfig.hmr.watch.inline =
						this.pluginConfig.hmr.watch.inline || [];
					this.pluginConfig.hmr.watch.inline.push(relativeBuildPath);
					console.log(
						'[DevServer] Added discovered asset to inline watch:',
						relativeBuildPath
					);
				}
			}
		}
	}
}
