/**
 * External dependencies
 */
import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Internal dependencies
 */
import type { DevServerConfig } from './types';
import { BuildMapResolver } from '../../common/services/BuildMapResolver';

const VITE_PLUGIN_NAME = 'vite-wordpress';

/**
 * DevServer Plugin for HMR support in WordPress
 *
 * This plugin creates a vite-wordpress.json endpoint that provides configuration
 * to the PHP DevServer class for HMR integration
 */
export function DevServerPlugin(config: DevServerConfig = {}): Plugin {
	const {
		base = '/',
		srcDir = 'resources',
		outDir = 'build',
		css = 'css',
		manifest = true,
	} = config;

	// Initialize the BuildMapResolver
	const buildMapResolver = new BuildMapResolver(outDir, css);

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
		 * Configure Server Hook.
		 */
		configureServer(server: ViteDevServer) {
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
		 * Handle hot update for PHP files.
		 */
		handleHotUpdate({ file, server }) {
			// Update buildMap with simplified entry for hot updates
			buildMapResolver.createHotUpdateEntry(file);

			if (file.endsWith('.php')) {
				server.ws.send({ type: 'full-reload', path: '*' });
			}
		},
	};
}
