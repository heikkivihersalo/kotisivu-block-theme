/**
 * External dependencies
 */
import type { Plugin, ViteDevServer, ResolvedConfig } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

/**
 * Internal dependencies
 */
import type { BlockAssetInfo } from './types';
import type { BlockInfo } from '../../common/types/wordpress.js';
import { BuildMapResolver } from '../../common/services/BuildMapResolver';
import {
	processHMRWatchConfig,
	getInlineAssetWatchPatterns,
} from '../../common/utils/watch-config.js';
import {
	processInlineConfig,
	getScriptInjectionOptions,
} from './utils/config.js';
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
export function DevServerPlugin(): Plugin {
	let server: ViteDevServer;
	const watchedFiles = new Set<string>();
	let blockAssets = new Map<string, BlockAssetInfo>();
	let buildMapResolver: BuildMapResolver;
	let processedInlineConfig: any = null;
	let scriptOptions: any = null;
	let configPluginApi: any = null;
	let blocksPluginApi: any = null;

	/**
	 * Convert BlockInfo from BlocksPlugin to BlockAssetInfo for DevServer
	 */
	function convertBlocksToAssets(
		discoveredBlocks: BlockInfo[]
	): Map<string, BlockAssetInfo> {
		const blockAssets = new Map<string, BlockAssetInfo>();

		discoveredBlocks.forEach((block) => {
			// Check for CSS files that could be used as inline styles
			const cssFiles = ['style.css', 'index.css', 'style-index.css'];

			cssFiles.forEach((cssFile) => {
				const sourceCssPath = path.join(block.path, cssFile);
				const buildCssPath = path
					.join(
						processedInlineConfig?.blocksConfig?.outDir || 'build',
						block.outputPath || block.name,
						cssFile
					)
					.replace(/\\/g, '/');

				if (fs.existsSync(sourceCssPath)) {
					const assetKey = `${block.name}-${cssFile.replace('.css', '')}`;
					blockAssets.set(assetKey, {
						buildPath: buildCssPath,
						sourcePath: sourceCssPath.replace(/\\/g, '/'),
						blockSlug: block.name,
					});
				}
			});
		});

		console.log(
			`[DevServer] Converted ${blockAssets.size} block CSS assets from BlocksPlugin`
		);

		return blockAssets;
	}

	/**
	 * Get all monitored assets (static + dynamic blocks)
	 */
	function getAllMonitoredAssets(
		inlineAssets: string[],
		blockAssets: Map<string, BlockAssetInfo>
	): string[] {
		const dynamicAssets = Array.from(blockAssets.values()).map(
			(asset) => asset.buildPath
		);
		return [...inlineAssets, ...dynamicAssets];
	}

	/**
	 * Check if a file change affects any inline assets
	 */
	function getAffectedAsset(
		file: string,
		inlineAssets: string[],
		blockAssets: Map<string, BlockAssetInfo>,
		watchPatterns: string[]
	): string {
		// Check if the changed file affects any inline assets
		const isInlineAsset = inlineAssets.some((asset) => {
			const fullPath = path.resolve(asset);
			return file === fullPath || file.endsWith(asset);
		});

		if (isInlineAsset) {
			return (
				inlineAssets.find((asset) => {
					const fullPath = path.resolve(asset);
					return file === fullPath || file.endsWith(asset);
				}) || ''
			);
		}

		// Check if the changed file is a block CSS file
		const isBlockAsset = Array.from(blockAssets.values()).some(
			(assetInfo) =>
				file === assetInfo.sourcePath || file === assetInfo.buildPath
		);

		if (isBlockAsset) {
			// Find the block asset that was changed
			for (const [, assetInfo] of blockAssets) {
				if (
					file === assetInfo.sourcePath ||
					file === assetInfo.buildPath
				) {
					return assetInfo.buildPath;
				}
			}
		}

		// Check if it's a source file that affects inline assets
		const isSourceFile = watchPatterns.some((pattern) => {
			const regex = pattern
				.replace(/\*\*/g, '.*')
				.replace(/\*/g, '[^/]*');
			return new RegExp(regex).test(file);
		});

		if (isSourceFile) {
			// For source files, determine which built asset they affect based on file content
			if (file.includes('sanitize')) {
				return 'assets/sanitize.css';
			} else if (file.includes('tailwind')) {
				return 'assets/tailwind-utilities.css';
			} else {
				return 'assets/inline.css';
			}
		}

		return '';
	}

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
		 * Config resolved hook - Store reference to ConfigPlugin and BlocksPlugin APIs
		 */
		configResolved(resolvedConfig: ResolvedConfig) {
			// Find the ConfigPlugin in the resolved plugins
			const configPlugin = resolvedConfig.plugins.find(
				(plugin: any) => plugin.name === 'vite-plugin-gutenberg-config'
			);

			if (!configPlugin?.api) {
				throw new Error(
					'DevServerPlugin requires ConfigPlugin to be loaded first'
				);
			}

			configPluginApi = configPlugin.api;

			// Find the BlocksPlugin in the resolved plugins
			const blocksPlugin = resolvedConfig.plugins.find(
				(plugin: any) => plugin.name === 'vite-plugin-gutenberg-blocks'
			);

			if (!blocksPlugin?.api) {
				throw new Error(
					'DevServerPlugin requires BlocksPlugin to be loaded first'
				);
			}

			blocksPluginApi = blocksPlugin.api;
		},

		/**
		 * Configure Server Hook.
		 */
		configureServer(viteServer: ViteDevServer) {
			server = viteServer;

			if (!configPluginApi) {
				throw new Error('DevServerPlugin requires ConfigPlugin API');
			}

			const config = configPluginApi.getResolvedConfig();
			if (!config) {
				throw new Error(
					'ConfigPlugin has not resolved configuration yet'
				);
			}

			const {
				server: { base = '/' } = {},
				paths: { srcDir = 'resources' } = {},
				build: { outDir = 'build', css = 'css', manifest = true } = {},
				inlineAssets: inlineAssetsConfig,
			} = config;

			// Initialize the BuildMapResolver
			buildMapResolver = new BuildMapResolver(outDir, css);

			// Process inline assets configuration
			processedInlineConfig = inlineAssetsConfig
				? processInlineConfig(inlineAssetsConfig)
				: null;

			// Get script injection options if inline assets are configured
			scriptOptions = processedInlineConfig
				? getScriptInjectionOptions(
						processedInlineConfig.scriptInjection.method
					)
				: null;

			// Discover block assets on server start if inline assets are configured
			if (processedInlineConfig) {
				// Note: We'll get blocks from BlocksPlugin later when they're available
				blockAssets = new Map(); // Initialize empty for now

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
		 * Generate Bundle Hook - Create file map during build.
		 */
		generateBundle(_options, bundle) {
			if (buildMapResolver) {
				buildMapResolver.processBundleAndUpdate(bundle);
			}
		},

		/**
		 * Write Bundle Hook - Save the final build map to cache.
		 */
		writeBundle() {
			if (buildMapResolver) {
				buildMapResolver.saveBuildMap();
			}
		},

		/**
		 * Build Start Hook - Set up file watching for inline assets using unified HMR config
		 */
		buildStart() {
			if (!configPluginApi) {
				throw new Error('DevServerPlugin requires ConfigPlugin API');
			}

			const config = configPluginApi.getResolvedConfig();
			if (!config) {
				throw new Error(
					'ConfigPlugin has not resolved configuration yet'
				);
			}

			const { inlineAssets: inlineAssetsConfig } = config;

			if (!inlineAssetsConfig) return;

			// Process inline assets configuration
			processedInlineConfig = processInlineConfig(inlineAssetsConfig);

			// Process HMR configuration if available
			const hmrWatchConfig = processHMRWatchConfig({
				hmr: { watch: {} },
			}); // Use default if not provided
			const inlineWatchPatterns =
				getInlineAssetWatchPatterns(hmrWatchConfig);

			// Get discovered blocks from BlocksPlugin
			if (blocksPluginApi) {
				const discoveredBlocks = blocksPluginApi.getDiscoveredBlocks();
				blockAssets = convertBlocksToAssets(discoveredBlocks);
			}

			// Add unified HMR watch patterns for inline assets
			inlineWatchPatterns.forEach((pattern) => {
				this.addWatchFile(pattern);
			});

			// Add specific inline asset files to watch
			processedInlineConfig.inlineAssets.forEach((asset: string) => {
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
		 * Handle hot update for PHP files and inline assets.
		 */
		handleHotUpdate({ file, server }) {
			// Update buildMap with simplified entry for hot updates
			if (buildMapResolver) {
				buildMapResolver.createHotUpdateEntry(file);
			}

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
