/**
 * External dependencies
 */
import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

/**
 * Internal dependencies
 */
import type { DevServerConfig, BlockAssetInfo } from './types';
import { BuildMapResolver } from '../../common/services/BuildMapResolver';
import {
	processInlineConfig,
	getScriptInjectionOptions,
} from './utils/config.js';
import {
	discoverBlockAssets,
	getAllMonitoredAssets,
	getAffectedAsset,
} from './utils/block-discovery.js';
import {
	createClientScriptMiddleware,
	createStatusMiddleware,
	createAssetContentMiddleware,
} from './server/middleware.js';

const VITE_PLUGIN_NAME = 'vite-wordpress';

/**
 * DevServer Plugin for HMR support in WordPress
 *
 * This plugin combines dev server functionality with inline assets HMR support.
 * It creates a vite-wordpress.json endpoint for PHP DevServer integration and
 * monitors inline CSS files for browser updates during development.
 */
export function DevServerPlugin(config: DevServerConfig = {}): Plugin {
	const {
		base = '/',
		srcDir = 'resources',
		outDir = 'build',
		css = 'css',
		manifest = true,
		inlineAssets: inlineAssetsConfig,
	} = config;

	// Initialize the BuildMapResolver
	const buildMapResolver = new BuildMapResolver(outDir, css);

	// Process inline assets configuration
	const processedInlineConfig = inlineAssetsConfig
		? processInlineConfig(inlineAssetsConfig)
		: null;

	let server: ViteDevServer;
	const watchedFiles = new Set<string>();
	let blockAssets = new Map<string, BlockAssetInfo>();

	// Get script injection options if inline assets are configured
	const scriptOptions = processedInlineConfig
		? getScriptInjectionOptions(
				processedInlineConfig.scriptInjection.method
			)
		: null;

	/**
	 * Get all monitored assets (static + dynamic blocks)
	 */
	function getAllAssets(): string[] {
		if (!processedInlineConfig) return [];
		return getAllMonitoredAssets(
			processedInlineConfig.inlineAssets,
			blockAssets
		);
	}

	return {
		name: 'vite-wordpress-dev-server',
		enforce: 'post', // Run after other plugins to avoid conflicts

		/**
		 * Generate Bundle Hook - Create file map during build.
		 */
		generateBundle(_options, bundle) {
			buildMapResolver.processBundleAndUpdate(bundle);
		},

		/**
		 * Write Bundle Hook - Save the final build map to cache.
		 */
		writeBundle() {
			buildMapResolver.saveBuildMap();
		},

		/**
		 * Build Start Hook - Set up file watching for inline assets
		 */
		buildStart() {
			if (!processedInlineConfig) return;

			// Discover block assets first
			blockAssets = discoverBlockAssets(
				processedInlineConfig.blocksConfig
			);

			// Add watch patterns for inline assets
			processedInlineConfig.watchPatterns.forEach((pattern) => {
				this.addWatchFile(pattern);
			});

			// Add specific inline asset files to watch
			processedInlineConfig.inlineAssets.forEach((asset) => {
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

		/**
		 * Configure Server Hook.
		 */
		configureServer(viteServer: ViteDevServer) {
			server = viteServer;

			// Discover block assets on server start if inline assets are configured
			if (processedInlineConfig) {
				blockAssets = discoverBlockAssets(
					processedInlineConfig.blocksConfig
				);

				// Add HMR client script endpoint
				if (scriptOptions) {
					server.middlewares.use(
						scriptOptions.endpoint,
						createClientScriptMiddleware(
							blockAssets,
							processedInlineConfig.blocksConfig.blockNamespace,
							processedInlineConfig.scriptInjection.method,
							processedInlineConfig.scriptInjection
								.pollingInterval,
							{
								themePrefix:
									processedInlineConfig.scriptInjection
										.themePrefix,
								viteServerUrl:
									processedInlineConfig.scriptInjection
										.viteServerUrl,
								vitePort:
									processedInlineConfig.scriptInjection
										.vitePort,
							}
						)
					);
				}

				// Add status endpoint middleware
				server.middlewares.use(
					createStatusMiddleware(getAllAssets, blockAssets)
				);

				// Add asset content middleware
				server.middlewares.use(
					createAssetContentMiddleware(getAllAssets, blockAssets)
				);
			}

			// Main dev server middleware
			server.middlewares.use(
				async (req: IncomingMessage, res: ServerResponse, next) => {
					// Skip processing for Vite's built-in endpoints
					if (
						req.url?.startsWith('/@vite/') ||
						req.url?.startsWith('/@fs/') ||
						req.url?.startsWith('/@id/')
					) {
						return next();
					}

					if (req.url && req.url === `/${VITE_PLUGIN_NAME}.json`) {
						const exposed = {
							base,
							srcDir,
							outDir,
							css,
							manifest,
							buildMap: buildMapResolver.getBuildMap(),
						};

						res.setHeader('Content-Type', 'application/json');
						res.statusCode = 200;
						res.end(JSON.stringify(exposed, null, 2)); // Expose plugin config.
					} else {
						// Let Vite handle all other requests (including root and built-in endpoints)
						next();
					}
				}
			);
		},

		/**
		 * Handle hot update for PHP files and inline assets.
		 */
		handleHotUpdate({ file, server }) {
			// Update buildMap with simplified entry for hot updates
			buildMapResolver.createHotUpdateEntry(file);

			// Handle PHP file changes
			if (file.endsWith('.php')) {
				server.ws.send({ type: 'full-reload', path: '*' });
				return [];
			}

			// Handle inline assets if configured
			if (processedInlineConfig) {
				const affectedAsset = getAffectedAsset(
					file,
					processedInlineConfig.inlineAssets,
					blockAssets,
					processedInlineConfig.watchPatterns
				);

				if (affectedAsset) {
					console.log(`[HMR] Inline asset updated: ${affectedAsset}`);

					// Send HMR update for inline asset
					server.ws.send({
						type: 'custom',
						event: 'inline-asset-update',
						data: { asset: affectedAsset },
					});

					// Return empty array to prevent default HMR behavior
					return [];
				}
			}

			// Let Vite handle other files normally
			return undefined;
		},
	};
}

export type { DevServerConfig, InlineAssetsConfig } from './types';
