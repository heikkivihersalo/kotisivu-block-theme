/**
 * External dependencies
 */
import type { Plugin, ViteDevServer, ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import type { BlockAssetInfo, AssetInfo } from './types';
import {
	AssetManager,
	HMRManager,
	ServerConfigManager,
	PluginStateManager,
} from './services/index.js';

/**
 * DevServer Plugin for HMR support in WordPress
 *
 * This plugin combines dev server functionality with inline assets HMR support.
 * It creates a vite-wordpress.json endpoint for PHP DevServer integration and
 * monitors inline CSS files for browser updates during development.
 */
export function DevServerPlugin(): Plugin {
	let server: ViteDevServer;
	let blockAssets = new Map<string, BlockAssetInfo>();
	let generalAssets = new Map<string, AssetInfo>();

	// Service instances
	const stateManager = new PluginStateManager();
	let assetManager: AssetManager;
	let hmrManager: HMRManager;
	let serverConfigManager: ServerConfigManager;

	/**
	 * Get all monitored assets (static + dynamic blocks + general assets)
	 */
	function getAllAssets(): string[] {
		const pluginConfig = stateManager.getPluginConfig();
		if (!pluginConfig?.hmr?.enabled) return [];

		const allAssets = assetManager.getAllMonitoredAssets(
			pluginConfig.hmr?.watch?.inline || []
		);

		// Add discovered block build assets that exist but may not be tracked
		const allAssetsSet = new Set(allAssets);
		assetManager.addDiscoveredBlockAssets(
			stateManager.getBlocksPluginApi(),
			allAssetsSet
		);

		return [...allAssetsSet];
	}

	return {
		name: 'vite-wordpress-dev-server',
		enforce: 'post', // Run after other plugins to avoid conflicts

		/**
		 * Config resolved hook - Store reference to resolved Vite config and plugin APIs
		 */
		configResolved(config: ResolvedConfig) {
			stateManager.initializeFromConfig(config);

			// Initialize other services with dependencies
			const pluginConfig = stateManager.getPluginConfig();
			const buildMapResolver = stateManager.getBuildMapResolver();

			assetManager = new AssetManager(buildMapResolver, pluginConfig);
			hmrManager = new HMRManager(
				buildMapResolver,
				pluginConfig,
				assetManager
			);
			serverConfigManager = new ServerConfigManager(
				pluginConfig,
				buildMapResolver,
				stateManager.getScriptOptions()
			);
		},

		/**
		 * Configure Server Hook.
		 */
		configureServer(viteServer: ViteDevServer) {
			server = viteServer;

			const pluginConfig = stateManager.getPluginConfig();

			// Initialize empty block assets - will be populated in buildStart
			if (pluginConfig.hmr?.enabled !== false) {
				blockAssets = new Map();
			}

			// Configure server with all middleware
			serverConfigManager.configureServer(
				server,
				getAllAssets,
				blockAssets,
				generalAssets
			);
		},

		/**
		 * Generate Bundle Hook - Create file map during build.
		 */
		generateBundle(_options, bundle) {
			const buildMapResolver = stateManager.getBuildMapResolver();
			if (buildMapResolver) {
				buildMapResolver.processBundleAndUpdate(bundle);
			}
		},

		/**
		 * Write Bundle Hook - Save the final build map to cache.
		 */
		writeBundle() {
			const buildMapResolver = stateManager.getBuildMapResolver();
			if (buildMapResolver) {
				buildMapResolver.saveBuildMap();
			}
		},

		/**
		 * Build Start Hook - Set up file watching for inline assets using unified config
		 */
		buildStart() {
			if (!stateManager.isHMREnabled()) return;

			// Get discovered blocks from BlocksPlugin
			const blocksPluginApi = stateManager.getBlocksPluginApi();
			if (blocksPluginApi) {
				const discoveredBlocks = blocksPluginApi.getDiscoveredBlocks();
				blockAssets =
					assetManager.convertBlocksToAssets(discoveredBlocks);
				console.log('[DevServer] Block assets:', blockAssets);
			}

			// Get discovered assets from AssetsPlugin
			const assetsPluginApi = stateManager.getAssetsPluginApi();
			if (assetsPluginApi) {
				const discoveredAssets = assetsPluginApi.getDiscoveredAssets();
				generalAssets =
					assetManager.convertAssetsToAssetInfo(discoveredAssets);
				console.log('[DevServer] General assets:', generalAssets);

				// Update plugin configuration with discovered assets
				assetManager.updatePluginConfigWithDiscoveredAssets();
			}

			const pluginConfig = stateManager.getPluginConfig();

			// Debug: Log all inline assets being watched
			if (pluginConfig.hmr.watch?.inline?.length) {
				console.log(
					'[DevServer] Inline assets to watch:',
					pluginConfig.hmr.watch.inline
				);
			}

			// Set up file watching using HMR manager
			hmrManager.setupFileWatching((file: string) => {
				this.addWatchFile(file);
			});
		},

		/**
		 * Handle hot update for PHP files and inline assets.
		 */
		handleHotUpdate({ file, server }) {
			return hmrManager.handleHotUpdate(file, server);
		},
	};
}
