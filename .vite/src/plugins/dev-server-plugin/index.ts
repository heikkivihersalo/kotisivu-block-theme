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
		name: 'vite-plugin-wordpress-dev-server',

		/**
		 * Configure Server Hook.
		 */
		configureServer(server: ViteDevServer) {
			const publicDir =
				path.basename(process.cwd()) === 'src'
					? path.join(process.cwd(), '..', 'public')
					: process.cwd();
			const indexUrls = [
				'/index.html',
				path.join(server.config.base, 'index.html'),
				server.config.base.replace(/\/$/, ''),
				server.config.base,
			];

			const getProtocol = (req: IncomingMessage) => {
				if (req.headers['x-forwarded-proto']) {
					return (req.headers['x-forwarded-proto'] as string).split(
						','
					)[0];
				}
				return req.socket && 'encrypted' in req.socket
					? 'https'
					: 'http';
			};

			server.middlewares.use(
				async (req: IncomingMessage, res: ServerResponse, next) => {
					const protocol = getProtocol(req);
					const host = req.headers.host || 'localhost:5173';
					const localUrl = `${protocol}://${host}`;

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
					} else if (req.url && indexUrls.includes(req.url)) {
						res.statusCode = 404;
						const indexPath = path.join(
							publicDir,
							'dev-server-index.html'
						);
						if (fs.existsSync(indexPath)) {
							res.end(
								fs
									.readFileSync(indexPath)
									.toString()
									.replace(
										/{{ CONFIG_URL }}/g,
										`${localUrl}/${VITE_PLUGIN_NAME}.json`
									)
							);
						} else {
							// Fallback if dev-server-index.html doesn't exist
							res.end(`
							<!DOCTYPE html>
							<html>
							<head>
								<title>Vite Dev Server</title>
							</head>
							<body>
								<h1>Vite Development Server</h1>
								<p>Config URL: <a href="${localUrl}/${VITE_PLUGIN_NAME}.json">${localUrl}/${VITE_PLUGIN_NAME}.json</a></p>
							</body>
							</html>
						`);
						}
					} else {
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
