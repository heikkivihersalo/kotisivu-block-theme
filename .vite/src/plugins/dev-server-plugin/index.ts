/**
 * External dependencies
 */
import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Internal dependencies
 */
import type { DevServerConfig } from './types';

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

	const buildMap: Record<string, any> = {};
	const buildCache = path.join(process.cwd(), outDir, 'buildMap.json');

	return {
		name: 'vite-wordpress-dev-server',
		enforce: 'post', // Run after other plugins to avoid conflicts

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
							buildMap: {},
						};
						if (fs.existsSync(buildCache)) {
							const buildMapData = fs.readFileSync(
								buildCache,
								'utf8'
							);
							exposed.buildMap = JSON.parse(buildMapData);
						}
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
			// Update buildMap on hot updates
			const fileName = file.split('/').pop();
			if (fileName) {
				buildMap[fileName] = {
					src: file.replace(process.cwd(), '').substring(1),
					file: fileName,
				};

				// Save buildMap to cache file
				try {
					const outDirPath = path.join(process.cwd(), outDir);
					if (!fs.existsSync(outDirPath)) {
						fs.mkdirSync(outDirPath, { recursive: true });
					}
					fs.writeFileSync(
						buildCache,
						JSON.stringify(buildMap, null, 2)
					);
				} catch (error) {
					console.warn('Failed to write build cache:', error);
				}
			}

			if (file.endsWith('.php')) {
				server.ws.send({ type: 'full-reload', path: '*' });
			}
		},
	};
}
