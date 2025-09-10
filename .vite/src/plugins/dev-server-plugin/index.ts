/**
 * External dependencies
 */
import type { Plugin, ViteDevServer, ResolvedConfig } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Internal dependencies
 */
import type { BlockAssetInfo, AssetInfo } from './types';
import type {
	BlockInfo,
	DiscoveredAssetInfo,
} from '../../common/types/index.js';
import type { ResolvedPluginConfig } from '../config-plugin/index.js';
import { BuildMapResolver } from '../../common/services/BuildMapResolver';
import { getScriptInjectionOptions } from './utils/config.js';
import {
	createClientScriptMiddleware,
	createStatusMiddleware,
	createAssetContentMiddleware,
	createHMRClientMiddleware,
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
	let generalAssets = new Map<string, AssetInfo>();
	let buildMapResolver: BuildMapResolver;
	let pluginConfig: ResolvedPluginConfig;
	let scriptOptions: any = null;
	let configPluginApi: any = null;
	let blocksPluginApi: any = null;
	let assetsPluginApi: any = null;

	/**
	 * Convert BlockInfo from BlocksPlugin to BlockAssetInfo for DevServer
	 * Uses BuildMapResolver for accurate build paths
	 */
	function convertBlocksToAssets(
		discoveredBlocks: BlockInfo[]
	): Map<string, BlockAssetInfo> {
		const blockAssets = new Map<string, BlockAssetInfo>();

		if (!pluginConfig || !buildMapResolver) return blockAssets;

		const buildMap = buildMapResolver.getBuildMap();

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
							pluginConfig.build?.outDir || 'build',
							buildMapEntry.file
						)
					: path.join(
							pluginConfig.build?.outDir || 'build',
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
		return blockAssets;
	}

	/**
	 * Convert DiscoveredAssetInfo from AssetsPlugin to AssetInfo for DevServer
	 * Uses BuildMapResolver for accurate build paths
	 */
	function convertAssetsToAssetInfo(
		discoveredAssets: DiscoveredAssetInfo[]
	): Map<string, AssetInfo> {
		const assetMap = new Map<string, AssetInfo>();

		if (!buildMapResolver) return assetMap;

		const buildMap = buildMapResolver.getBuildMap();

		discoveredAssets.forEach((asset) => {
			// Get build path from BuildMapResolver or use fallback
			const buildMapEntry = Object.values(buildMap).find(
				(entry) =>
					entry.src ===
					asset.sourcePath.replace(process.cwd() + '/', '')
			);

			const buildPath = buildMapEntry
				? path.resolve(
						pluginConfig.build?.outDir || 'build',
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
		return assetMap;
	}

	/**
	 * Get all monitored assets (inline + dynamic blocks + general assets)
	 */
	function getAllMonitoredAssets(
		inlineAssets: string[],
		blockAssets: Map<string, BlockAssetInfo>,
		generalAssets: Map<string, AssetInfo>
	): string[] {
		const allAssets = new Set<string>();

		// Add inline CSS assets from configuration
		inlineAssets.forEach((asset) => allAssets.add(asset));

		// Add block assets
		for (const [, asset] of blockAssets) {
			Object.values(asset.build).forEach((buildPath) => {
				allAssets.add(buildPath);
			});
		}

		// Add general assets
		for (const [, asset] of generalAssets) {
			allAssets.add(asset.buildPath);
		}

		// Add configured inline file paths
		if (pluginConfig?.paths?.inlineFiles) {
			Object.keys(pluginConfig.paths.inlineFiles).forEach((key) => {
				allAssets.add(`build/${key}.css`);
			});
		}

		// Add discovered block build assets that exist but may not be tracked
		if (blocksPluginApi) {
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
							pluginConfig.build?.outDir || 'build',
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

		return [...allAssets];
	}

	/**
	 * Check if a file change affects any monitored assets
	 */
	function getAffectedAsset(
		file: string,
		inlineAssets: string[],
		blockAssets: Map<string, BlockAssetInfo>,
		generalAssets: Map<string, AssetInfo>,
		watchPatterns: string[]
	): string {
		// Check direct inline asset matches
		const matchedInlineAsset = inlineAssets.find((asset) => {
			const fullPath = path.resolve(asset);
			return (
				file === fullPath ||
				file.endsWith(asset) ||
				fullPath.endsWith(file)
			);
		});

		if (matchedInlineAsset) {
			console.log(
				`[HMR] Inline asset matched: ${file} -> ${matchedInlineAsset}`
			);
			return matchedInlineAsset;
		}

		// Check if file matches watch patterns (source files)
		const isSourceFile = watchPatterns.some((pattern) => {
			const regex = pattern
				.replace(/\*\*/g, '.*')
				.replace(/\*/g, '[^/]*');
			return new RegExp(regex).test(file);
		});

		if (isSourceFile) {
			// Determine affected asset based on file path patterns
			if (file.includes('sanitize') || file.includes('normalize')) {
				console.log(`[HMR] Source file affects sanitize: ${file}`);
				return 'assets/sanitize.css';
			} else if (
				file.includes('tailwind') ||
				file.includes('utilities')
			) {
				console.log(`[HMR] Source file affects tailwind: ${file}`);
				return 'assets/tailwind-utilities.css';
			} else if (file.includes('inline') || file.includes('critical')) {
				console.log(`[HMR] Source file affects inline: ${file}`);
				return 'assets/inline.css';
			}
		}

		// Check block assets (source and build files)
		for (const [, assetInfo] of blockAssets) {
			// Check source files
			for (const [sourceKey, sourcePath] of Object.entries(
				assetInfo.src
			)) {
				if (file === sourcePath || file === path.resolve(sourcePath)) {
					const buildKey = sourceKey
						.replace(/\.(js|jsx|ts|tsx)$/, '.js')
						.replace('.css', '.css');
					const buildPath =
						assetInfo.build[buildKey] ||
						Object.values(assetInfo.build)[0];
					if (buildPath) {
						console.log(
							`[HMR] Block source file changed: ${file} -> ${buildPath}`
						);
						return buildPath;
					}
				}
			}

			// Check build files
			for (const buildPath of Object.values(assetInfo.build)) {
				if (file === buildPath || file === path.resolve(buildPath)) {
					console.log(`[HMR] Block build file changed: ${file}`);
					return buildPath;
				}
			}
		}

		// Check general assets
		for (const [, assetInfo] of generalAssets) {
			if (
				file === assetInfo.sourcePath ||
				file === assetInfo.buildPath ||
				file === path.resolve(assetInfo.sourcePath) ||
				file === path.resolve(assetInfo.buildPath)
			) {
				console.log(
					`[HMR] General asset changed: ${file} -> ${assetInfo.buildPath}`
				);
				return assetInfo.buildPath;
			}
		}

		return '';
	}

	/**
	 * Get all monitored assets (static + dynamic blocks + general assets)
	 */
	function getAllAssets(): string[] {
		if (!pluginConfig?.hmr?.enabled) return [];
		return getAllMonitoredAssets(
			pluginConfig.hmr?.watch?.inline || [],
			blockAssets,
			generalAssets
		);
	}

	return {
		name: 'vite-wordpress-dev-server',
		enforce: 'post', // Run after other plugins to avoid conflicts

		/**
		 * Config resolved hook - Store reference to resolved Vite config and plugin APIs
		 */
		configResolved(config: ResolvedConfig) {
			// Find the ConfigPlugin in the resolved plugins
			const configPlugin = config.plugins.find(
				(plugin: any) => plugin.name === 'vite-plugin-gutenberg-config'
			);

			if (!configPlugin?.api) {
				throw new Error(
					'DevServerPlugin requires ConfigPlugin to be loaded first'
				);
			}

			configPluginApi = configPlugin.api;
			pluginConfig = configPluginApi.getPluginConfig();

			if (!pluginConfig) {
				throw new Error(
					'ConfigPlugin has not resolved configuration yet'
				);
			}

			// Find the BlocksPlugin in the resolved plugins
			const blocksPlugin = config.plugins.find(
				(plugin: any) => plugin.name === 'vite-plugin-gutenberg-blocks'
			);

			if (!blocksPlugin?.api) {
				throw new Error(
					'DevServerPlugin requires BlocksPlugin to be loaded first'
				);
			}

			blocksPluginApi = blocksPlugin.api;

			// Find the AssetsPlugin in the resolved plugins (optional)
			const assetsPlugin = config.plugins.find(
				(plugin: any) => plugin.name === 'vite-plugin-gutenberg-assets'
			);

			if (assetsPlugin?.api) {
				assetsPluginApi = assetsPlugin.api;
			}

			// Initialize the BuildMapResolver using config
			buildMapResolver = new BuildMapResolver(
				pluginConfig.build?.outDir || 'build',
				pluginConfig.build?.css || 'css'
			);

			// Get script injection options if HMR is enabled
			if (pluginConfig.hmr?.enabled !== false) {
				scriptOptions = getScriptInjectionOptions(
					pluginConfig.hmr?.scriptInjection?.method || 'inline'
				);
			}
		},

		/**
		 * Configure Server Hook.
		 */
		configureServer(viteServer: ViteDevServer) {
			server = viteServer;

			if (!pluginConfig) {
				throw new Error(
					'DevServerPlugin requires resolved plugin configuration'
				);
			}

			// Discover block assets on server start if HMR is enabled
			if (pluginConfig.hmr?.enabled !== false) {
				// Initialize empty block assets - will be populated in buildStart
				blockAssets = new Map();

				// Add HMR client module endpoint
				server.middlewares.use(createHMRClientMiddleware());

				// Add HMR client at the expected endpoint for script imports
				server.middlewares.use(
					'/__vite_hmr_client.js',
					(_req, res, next) => {
						try {
							const hmrClientPath = path.resolve(
								path.dirname(fileURLToPath(import.meta.url)),
								'client/hmr-client.js'
							);

							if (fs.existsSync(hmrClientPath)) {
								const content = fs.readFileSync(
									hmrClientPath,
									'utf-8'
								);
								res.setHeader(
									'Content-Type',
									'application/javascript'
								);
								res.setHeader('Cache-Control', 'no-cache');
								res.end(content);
							} else {
								console.warn(
									'[DevServer] HMR client file not found:',
									hmrClientPath
								);
								res.statusCode = 404;
								res.end('HMR client not found');
							}
						} catch (error) {
							console.error(
								'[DevServer] Error serving HMR client:',
								error
							);
							res.statusCode = 500;
							res.end('Internal server error');
						}
					}
				);

				// Add HMR client script endpoint if script options are available
				if (scriptOptions) {
					server.middlewares.use(
						scriptOptions.endpoint,
						createClientScriptMiddleware(
							() => blockAssets, // Pass function to get current block assets
							pluginConfig.wordpress?.namespace || 'wp',
							pluginConfig.hmr?.scriptInjection?.method ||
								'inline',
							pluginConfig.hmr?.scriptInjection
								?.pollingInterval || 500,
							{
								themePrefix: undefined, // Will be auto-detected
								viteServerUrl:
									pluginConfig.server?.devServerUrl ||
									'https://block-theme.local:5173',
								vitePort:
									pluginConfig.server?.port?.toString() ||
									'5173',
							}
						)
					);
				}

				// Add status endpoint middleware
				server.middlewares.use(
					createStatusMiddleware(
						getAllAssets,
						blockAssets,
						generalAssets
					)
				);

				// Add asset content middleware
				server.middlewares.use(
					createAssetContentMiddleware(
						getAllAssets,
						blockAssets,
						generalAssets
					)
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
							base: pluginConfig.server?.base || '/',
							srcDir: pluginConfig.paths?.srcDir || 'resources',
							outDir: pluginConfig.build?.outDir || 'build',
							css: pluginConfig.build?.css || 'css',
							manifest: pluginConfig.build?.manifest || true,
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
		 * Build Start Hook - Set up file watching for inline assets using unified config
		 */
		buildStart() {
			if (!pluginConfig?.hmr?.enabled) return;

			// Get discovered blocks from BlocksPlugin
			if (blocksPluginApi) {
				const discoveredBlocks = blocksPluginApi.getDiscoveredBlocks();
				blockAssets = convertBlocksToAssets(discoveredBlocks);

				console.log('[DevServer] Block assets:', blockAssets);
			}

			// Get discovered assets from AssetsPlugin
			if (assetsPluginApi) {
				const discoveredAssets = assetsPluginApi.getDiscoveredAssets();
				generalAssets = convertAssetsToAssetInfo(discoveredAssets);
				console.log('[DevServer] General assets:', generalAssets);

				// Add discovered assets' build paths to inline watch list if they don't exist
				const buildDir = pluginConfig.build?.outDir || 'build';
				for (const [, assetInfo] of generalAssets) {
					const buildPath = assetInfo.buildPath;
					if (buildPath.includes(buildDir)) {
						const relativeBuildPath = buildPath.replace(
							process.cwd() + '/',
							''
						);
						if (
							!pluginConfig.hmr?.watch?.inline?.includes(
								relativeBuildPath
							)
						) {
							pluginConfig.hmr.watch = pluginConfig.hmr.watch || {
								inline: [],
								css: [],
								php: [],
								scripts: [],
								blocks: [],
							};
							pluginConfig.hmr.watch.inline =
								pluginConfig.hmr.watch.inline || [];
							pluginConfig.hmr.watch.inline.push(
								relativeBuildPath
							);
							console.log(
								'[DevServer] Added discovered asset to inline watch:',
								relativeBuildPath
							);
						}
					}
				}
			}

			// Debug: Log all inline assets being watched
			if (pluginConfig.hmr.watch?.inline?.length) {
				console.log(
					'[DevServer] Inline assets to watch:',
					pluginConfig.hmr.watch.inline
				);
			}

			// Add watch patterns for CSS files
			if (pluginConfig.hmr.watch?.css) {
				pluginConfig.hmr.watch.css.forEach((pattern: string) => {
					this.addWatchFile(pattern);
					console.log('[DevServer] Watching CSS pattern:', pattern);
				});
			}

			// Add specific inline asset files to watch
			if (pluginConfig.hmr.watch?.inline) {
				pluginConfig.hmr.watch.inline.forEach((asset: string) => {
					const fullPath = path.resolve(asset);
					if (fs.existsSync(fullPath)) {
						this.addWatchFile(fullPath);
						watchedFiles.add(fullPath);
						console.log(
							'[DevServer] Watching inline asset:',
							fullPath
						);
					} else {
						console.warn(
							'[DevServer] Inline asset not found:',
							fullPath
						);
					}
				});
			}

			// Add block source files to watch
			for (const [, assetInfo] of blockAssets) {
				// Add all source files from the block asset
				Object.values(assetInfo.src).forEach((sourcePath) => {
					this.addWatchFile(sourcePath);
					watchedFiles.add(sourcePath);
				});
			}

			// Add general asset source files to watch
			for (const [, assetInfo] of generalAssets) {
				this.addWatchFile(assetInfo.sourcePath);
				watchedFiles.add(assetInfo.sourcePath);
			}
		},

		/**
		 * Handle hot update for PHP files and inline assets.
		 */
		handleHotUpdate({ file, server }) {
			console.log(`[HMR] File changed: ${file}`);

			// Update buildMap with simplified entry for hot updates
			if (buildMapResolver) {
				buildMapResolver.createHotUpdateEntry(file);
			}

			// Handle PHP file changes
			if (file.endsWith('.php')) {
				console.log(
					`[HMR] PHP file changed, triggering full reload: ${file}`
				);
				server.ws.send({ type: 'full-reload', path: '*' });
				return [];
			}

			// Handle inline assets if HMR is configured
			if (pluginConfig?.hmr?.enabled) {
				const affectedAsset = getAffectedAsset(
					file,
					pluginConfig.hmr?.watch?.inline || [],
					blockAssets,
					generalAssets,
					pluginConfig.hmr?.watch?.css || []
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
				} else {
					console.log(`[HMR] No affected asset found for: ${file}`);
				}
			}

			// Let Vite handle other files normally
			return undefined;
		},
	};
}
