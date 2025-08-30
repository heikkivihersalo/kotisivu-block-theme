/**
 * External dependencies
 */
import type { Plugin, ViteDevServer } from 'vite';

/**
 * Internal dependencies
 */
import type { DevServerConfig } from './types';

/**
 * DevServer Plugin for HMR support in WordPress
 *
 * This plugin creates a vite-wordpress.json endpoint that provides configuration
 * to the PHP DevServer class for HMR integration
 */
export function DevServerPlugin(config: DevServerConfig = {}): Plugin {
	const {
		host = 'localhost',
		port = 5173,
		base = '/',
		srcDir = 'resources',
		outDir = 'build',
		css = 'css',
		manifest = true,
		devServerUrl,
	} = config;

	const buildMap: Record<string, any> = {};

	return {
		name: 'vite-plugin-wordpress-dev-server',
		// Remove apply restriction to ensure it runs

		configureServer(server: ViteDevServer) {
			// Only configure in development
			if (process.env.NODE_ENV !== 'development') {
				return;
			}

			console.log('🚀 Configuring HMR endpoint');

			// Add middleware to serve the vite-wordpress.json endpoint
			server.middlewares.use('/vite-wordpress.json', (req, res) => {
				if (req.method === 'GET') {
					// Build the dev server URL from config or fall back to server config
					const serverHost = devServerUrl || `http://${host}:${port}`;

					const responseConfig = {
						base,
						srcDir,
						outDir,
						css,
						manifest,
						buildMap,
						devServer: {
							host,
							port,
							url: serverHost,
						},
					};

					res.setHeader('Content-Type', 'application/json');
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.end(JSON.stringify(responseConfig));
				} else {
					res.statusCode = 405;
					res.end('Method Not Allowed');
				}
			});

			// Update build map when files change
			server.ws.on('file-changed', (data: { file: string }) => {
				// Update buildMap based on file changes
				const fileName = data.file.split('/').pop();
				if (fileName) {
					buildMap[fileName] = {
						src: data.file.replace(process.cwd(), '').substring(1),
						file: fileName,
					};
					console.log('🔄 Updated build map for', fileName);
				}
			});
		},

		handleHotUpdate(ctx) {
			// Update buildMap on hot updates
			const fileName = ctx.file.split('/').pop();
			if (fileName) {
				buildMap[fileName] = {
					src: ctx.file.replace(process.cwd(), '').substring(1),
					file: fileName,
				};
			}
		},
	};
}
