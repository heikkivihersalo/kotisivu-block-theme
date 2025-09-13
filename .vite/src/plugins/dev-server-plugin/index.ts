/**
 * External dependencies
 */
import type { Plugin, ViteDevServer, ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import { DevServerManager } from './DevServerManager.js';

/**
 * DevServer Plugin for live updates (polling-only) in WordPress
 *
 * Provides dev server functionality where the browser polls the server for file changes.
 * Creates endpoints for PHP integration and monitors files to support CSS reloads and page refreshes.
 */
export function DevServerPlugin(): Plugin {
	let server: ViteDevServer;
	let devServerManager: DevServerManager;

	return {
		name: 'vite-wordpress-dev-server',
		enforce: 'post', // Run after other plugins to avoid conflicts

		/**
		 * Config resolved hook - Initialize the dev server manager
		 */
		configResolved(config: ResolvedConfig) {
			devServerManager = new DevServerManager(config);
		},

		/**
		 * Configure Server Hook
		 */
		configureServer(viteServer: ViteDevServer) {
			server = viteServer;
			devServerManager.configureServer(server);
		},

		/**
		 * Generate Bundle Hook - Create file map during build
		 */
		generateBundle(_options, bundle) {
			devServerManager.processBundleAndUpdate(bundle);
		},

		/**
		 * Write Bundle Hook - Save the final build map to cache
		 */
		writeBundle() {
			devServerManager.saveBuildMap();
		},

		/**
		 * Build Start Hook - Set up file watching and initialize assets
		 */
		buildStart() {
			devServerManager.initializeAssets();
			devServerManager.setupFileWatching((file: string) => {
				this.addWatchFile(file);
			});
		},

		/**
		 * Handle hot update for monitored files
		 */
		handleHotUpdate({ file, server }) {
			return devServerManager.handleHotUpdate(file, server);
		},
	};
}

/**
 * Additional exports
 */
export { DevServerManager } from './DevServerManager.js';
export type * from './types.js';
