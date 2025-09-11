/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Internal dependencies
 */
import type { BlockAssetInfo, AssetInfo } from '../types';
import type { ResolvedPluginConfig } from '../../config-plugin/index.js';
import { BuildMapResolver } from '../../../common/services/BuildMapResolver';
import { buildDevServerUrl } from '../utils/config.js';
import {
	ClientScriptMiddleware,
	StatusMiddleware,
	AssetContentMiddleware,
	HMRClientMiddleware,
	HMRModuleMiddleware,
} from '../middleware/index.js';

const VITE_PLUGIN_NAME = 'vite-wordpress';

/**
 * ServerConfigManager handles server setup and middleware configuration
 */
export class ServerConfigManager {
	private pluginConfig: ResolvedPluginConfig;
	private buildMapResolver: BuildMapResolver;
	private scriptOptions: any = null;

	constructor(
		pluginConfig: ResolvedPluginConfig,
		buildMapResolver: BuildMapResolver,
		scriptOptions: any = null
	) {
		this.pluginConfig = pluginConfig;
		this.buildMapResolver = buildMapResolver;
		this.scriptOptions = scriptOptions;
	}

	/**
	 * Configure server with all necessary middleware
	 */
	configureServer(
		server: ViteDevServer,
		getAllAssets: () => string[],
		blockAssets: Map<string, BlockAssetInfo>,
		generalAssets: Map<string, AssetInfo>
	): void {
		// Add HMR-related middleware if enabled
		if (this.pluginConfig.hmr?.enabled !== false) {
			this.setupHMRMiddleware(
				server,
				getAllAssets,
				blockAssets,
				generalAssets
			);
		}

		// Add main dev server middleware
		this.setupMainMiddleware(server);
	}

	/**
	 * Setup HMR-related middleware
	 */
	private setupHMRMiddleware(
		server: ViteDevServer,
		getAllAssets: () => string[],
		blockAssets: Map<string, BlockAssetInfo>,
		generalAssets: Map<string, AssetInfo>
	): void {
		// Add HMR client module endpoint
		server.middlewares.use(new HMRClientMiddleware().create());

		// Add HMR module middleware for individual client files
		server.middlewares.use(new HMRModuleMiddleware().create());

		// Add HMR client at the expected endpoint for script imports
		server.middlewares.use('/__vite_hmr_client.js', (_req, res) => {
			this.handleHMRClientRequest(res);
		});

		// Add HMR client script endpoint if script options are available
		if (this.scriptOptions) {
			const clientMiddleware = new ClientScriptMiddleware(
				() => blockAssets, // Pass function to get current block assets
				this.pluginConfig.wordpress?.namespace || 'wp',
				this.pluginConfig.hmr?.scriptInjection?.method || 'inline',
				this.pluginConfig.hmr?.scriptInjection?.pollingInterval || 500,
				{
					themePrefix: undefined, // Will be auto-detected
					viteServerUrl: buildDevServerUrl({
						host: this.pluginConfig.server?.host,
						port: this.pluginConfig.server?.port,
						protocol: this.pluginConfig.server?.protocol,
					}),
					vitePort:
						this.pluginConfig.server?.port?.toString() || '5173',
				},
				this.scriptOptions.endpoint // Pass the dynamic endpoint
			);
			server.middlewares.use(
				this.scriptOptions.endpoint,
				clientMiddleware.createForPath()
			);
		}

		// Add status endpoint middleware
		const statusMiddleware = new StatusMiddleware(
			getAllAssets,
			blockAssets,
			generalAssets
		);
		server.middlewares.use(statusMiddleware.create());

		// Add asset content middleware
		const assetContentMiddleware = new AssetContentMiddleware(
			getAllAssets,
			blockAssets,
			generalAssets,
			{
				host: this.pluginConfig.server?.host,
				port: this.pluginConfig.server?.port,
				protocol: this.pluginConfig.server?.protocol,
			}
		);
		server.middlewares.use(assetContentMiddleware.create());
	}

	/**
	 * Setup main server middleware
	 */
	private setupMainMiddleware(server: ViteDevServer): void {
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
					this.handlePluginConfigRequest(res);
				} else {
					// Let Vite handle all other requests (including root and built-in endpoints)
					next();
				}
			}
		);
	}

	/**
	 * Handle HMR client script request
	 */
	private handleHMRClientRequest(res: ServerResponse): void {
		try {
			const hmrClientPath = path.resolve(
				path.dirname(fileURLToPath(import.meta.url)),
				'../client/client-entry.js'
			);

			if (fs.existsSync(hmrClientPath)) {
				let content = fs.readFileSync(hmrClientPath, 'utf-8');

				// Transform relative imports to absolute paths that work with our middleware
				content = content
					.replace(
						/from '\.\/HMRClient\.js'/g,
						"from '/HMRClient.js'"
					)
					.replace(
						/from '\.\/handlers\/BaseHandler\.js'/g,
						"from '/handlers/BaseHandler.js'"
					)
					.replace(
						/from '\.\/handlers\/InlineCSSHandler\.js'/g,
						"from '/handlers/InlineCSSHandler.js'"
					)
					.replace(
						/from '\.\/handlers\/CSSFileHandler\.js'/g,
						"from '/handlers/CSSFileHandler.js'"
					)
					.replace(
						/from '\.\/handlers\/JSFileHandler\.js'/g,
						"from '/handlers/JSFileHandler.js'"
					)
					.replace(
						/from '\.\/utils\/dom-utils\.js'/g,
						"from '/utils/dom-utils.js'"
					)
					.replace(
						/from '\.\/utils\/logger\.js'/g,
						"from '/utils/logger.js'"
					);

				res.setHeader('Content-Type', 'application/javascript');
				res.setHeader('Cache-Control', 'no-cache');
				res.setHeader('Access-Control-Allow-Origin', '*');
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
			console.error('[DevServer] Error serving HMR client:', error);
			res.statusCode = 500;
			res.end('Internal server error');
		}
	}

	/**
	 * Handle plugin configuration request
	 */
	private handlePluginConfigRequest(res: ServerResponse): void {
		const exposed = {
			base: this.pluginConfig.server?.base || '/',
			srcDir: this.pluginConfig.paths?.srcDir || 'resources',
			outDir: this.pluginConfig.build?.outDir || 'build',
			css: this.pluginConfig.build?.css || 'css',
			manifest: this.pluginConfig.build?.manifest || true,
			buildMap: this.buildMapResolver.getBuildMap(),
		};

		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.end(JSON.stringify(exposed, null, 2)); // Expose plugin config.
	}
}
