/**
 * External dependencies
 */
import type { Plugin, ViteDevServer } from 'vite';
import fs from 'fs';
import path from 'path';

/**
 * Internal dependencies
 */
import type { InlineAssetsConfig } from './types.js';
import { processConfig, getScriptInjectionOptions } from './utils/config.js';
import {
	discoverBlockAssets,
	getAllMonitoredAssets,
	getAffectedAsset,
	type BlockAssetInfo,
} from './utils/block-discovery.js';
import {
	createClientScriptMiddleware,
	createStatusMiddleware,
	createAssetContentMiddleware,
} from './server/middleware.js';

/**
 * Inline Assets Plugin for HMR support in WordPress
 *
 * This plugin monitors inline CSS files and triggers browser updates when they change.
 * It works by injecting a client-side script that polls for changes to inline assets
 * and applies them automatically during development.
 */
export function InlineAssetsPlugin(config: InlineAssetsConfig = {}): Plugin {
	// Process and validate configuration
	const processedConfig = processConfig(config);
	const { inlineAssets, watchPatterns, blocksConfig, scriptInjection } =
		processedConfig;

	let server: ViteDevServer;
	const watchedFiles = new Set<string>();
	let blockAssets = new Map<string, BlockAssetInfo>();

	// Get script injection options
	const scriptOptions = getScriptInjectionOptions(scriptInjection.method);

	/**
	 * Get all monitored assets (static + dynamic blocks)
	 */
	function getAllAssets(): string[] {
		return getAllMonitoredAssets(inlineAssets, blockAssets);
	}

	return {
		name: 'vite-wordpress-inline-assets',
		enforce: 'post',

		configureServer(viteServer: ViteDevServer) {
			server = viteServer;

			// Discover block assets on server start
			blockAssets = discoverBlockAssets(blocksConfig);

			// Add HMR client script endpoint
			server.middlewares.use(
				scriptOptions.endpoint,
				createClientScriptMiddleware(
					blockAssets,
					blocksConfig.blockNamespace,
					scriptInjection.method,
					scriptInjection.pollingInterval,
					{
						themePrefix: scriptInjection.themePrefix,
						viteServerUrl: scriptInjection.viteServerUrl,
						vitePort: scriptInjection.vitePort,
					}
				)
			);

			// Add status endpoint middleware
			server.middlewares.use(
				createStatusMiddleware(getAllAssets, blockAssets)
			);

			// Add asset content middleware
			server.middlewares.use(
				createAssetContentMiddleware(getAllAssets, blockAssets)
			);
		},

		buildStart() {
			// Discover block assets first
			blockAssets = discoverBlockAssets(blocksConfig);

			// Add watch patterns for inline assets
			watchPatterns.forEach((pattern) => {
				this.addWatchFile(pattern);
			});

			// Add specific inline asset files to watch
			inlineAssets.forEach((asset) => {
				const fullPath = path.resolve(asset);
				if (fs.existsSync(fullPath)) {
					this.addWatchFile(fullPath);
					watchedFiles.add(fullPath);
				}
			});

			// Add block source files to watch
			for (const [, assetInfo] of blockAssets) {
				this.addWatchFile(assetInfo.sourcePath);
				watchedFiles.add(assetInfo.sourcePath);
			}
		},

		handleHotUpdate({ file, server: hotServer }) {
			const affectedAsset = getAffectedAsset(
				file,
				inlineAssets,
				blockAssets,
				watchPatterns
			);

			if (affectedAsset) {
				console.log(`[HMR] Inline asset updated: ${affectedAsset}`);

				// Send HMR update for inline asset
				hotServer.ws.send({
					type: 'custom',
					event: 'inline-asset-update',
					data: { asset: affectedAsset },
				});

				// Return empty array to prevent default HMR behavior
				return [];
			}

			// Let Vite handle other files normally
			return undefined;
		},
	};
}

export type { InlineAssetsConfig } from './types.js';
