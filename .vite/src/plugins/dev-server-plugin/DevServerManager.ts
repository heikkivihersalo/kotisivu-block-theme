/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import type { ViteDevServer, ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import type { PluginConfig, BlockInfo } from '../../common/types/index.js';
import { BuildMapResolver } from '../../common/services/BuildMapResolver.js';

// Get current directory for client files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Unified DevServer Manager
 *
 * Consolidates all dev server functionality into a single lightweight class.
 */
// API surface from the Gutenberg Blocks plugin
interface BlocksApi {
	getDiscoveredBlocks(): Record<string, BlockInfo>;
}

// (Removed assets API – keep the server lean)

export class DevServerManager {
	private config: PluginConfig;
	private buildMapResolver: BuildMapResolver;
	private blocksApi: BlocksApi | undefined;
	private blockAssets = new Map<string, BlockInfo>();
	private watchedFiles = new Set<string>();

	constructor(config: ResolvedConfig) {
		// Find plugin APIs
		const configPlugin = config.plugins.find(
			(p: any) => p.name === 'vite-plugin-gutenberg-config'
		);
		const blocksPlugin = config.plugins.find(
			(p: any) => p.name === 'vite-plugin-gutenberg-blocks'
		);

		if (!configPlugin?.api) {
			throw new Error(
				'DevServerPlugin requires ConfigPlugin to be loaded first'
			);
		}

		this.config = configPlugin.api.getPluginConfig();
		this.blocksApi = blocksPlugin?.api;

		this.buildMapResolver = new BuildMapResolver(
			this.config.build?.outDir || 'build',
			this.config.build?.css || 'css'
		);
	}

	/**
	 * Initialize assets from plugin APIs
	 */
	initializeAssets(): void {
		if (!this.isHMREnabled()) return;

		// Get block assets
		if (this.blocksApi) {
			const blocks = this.blocksApi.getDiscoveredBlocks();
			this.blockAssets = new Map(Object.entries(blocks));
		}
	}

	/**
	 * Setup file watching
	 */
	setupFileWatching(addWatchFile: (file: string) => void): void {
		if (!this.isHMREnabled()) return;

		const watchPatterns = this.config.hmr?.watch?.inline || [];

		// Add inline assets to watch
		for (const pattern of watchPatterns) {
			if (
				pattern.includes('*') ||
				pattern.includes('?') ||
				pattern.includes('[')
			) {
				const files = globSync(pattern, {
					cwd: process.cwd(),
					absolute: true,
				});
				for (const file of files) {
					if (!this.watchedFiles.has(file) && fs.existsSync(file)) {
						this.watchedFiles.add(file);
						addWatchFile(file);
					}
				}
			} else {
				const fullPath = this.findAssetPath(pattern);
				if (fullPath && fs.existsSync(fullPath)) {
					this.watchedFiles.add(fullPath);
					addWatchFile(fullPath);
				}
			}
		}

		// Add block CSS assets to watch (derive from block.json and conventional files)
		for (const [, block] of this.blockAssets) {
			const styleFiles = this.getStyleFilesForBlock(block);
			const scriptFiles = this.getScriptFilesForBlock(block);

			for (const stylePath of styleFiles) {
				if (!this.watchedFiles.has(stylePath)) {
					this.watchedFiles.add(stylePath);
					addWatchFile(stylePath);
				}
			}

			for (const scriptPath of scriptFiles) {
				if (!this.watchedFiles.has(scriptPath)) {
					this.watchedFiles.add(scriptPath);
					addWatchFile(scriptPath);
				}
			}
		}
	}

	/**
	 * Configure server middleware
	 */
	configureServer(server: ViteDevServer): void {
		if (!this.isHMREnabled()) return;

		// Status endpoint
		server.middlewares.use('/__dev-server/status', (_req, res) => {
			const status: Record<string, number> = {};
			const allAssets = this.getAllMonitoredAssets();

			for (const asset of allAssets) {
				try {
					// Handle glob patterns
					if (asset.includes('*')) {
						const files = globSync(asset, { cwd: process.cwd() });
						for (const file of files) {
							const fullPath = path.resolve(process.cwd(), file);
							if (fs.existsSync(fullPath)) {
								const stats = fs.statSync(fullPath);
								status[file] = stats.mtime.getTime();
							}
						}
					} else {
						// Handle individual files
						const fullPath = this.findAssetPath(asset);
						if (fullPath && fs.existsSync(fullPath)) {
							const stats = fs.statSync(fullPath);
							status[asset] = stats.mtime.getTime();
						}
					}
				} catch (error) {
					// Skip assets that can't be read
				}
			}

			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.end(JSON.stringify(status));
		});

		// Client script endpoint
		server.middlewares.use('/__dev-server/hmr-client', (_req, res) => {
			const clientPath = path.resolve(__dirname, 'client.js');
			res.setHeader('Content-Type', 'application/javascript');
			res.setHeader('Access-Control-Allow-Origin', '*');

			if (fs.existsSync(clientPath)) {
				res.end(fs.readFileSync(clientPath, 'utf-8'));
			} else {
				res.statusCode = 404;
				res.end('HMR client not found');
			}
		});

		// Shared helpers endpoint
		server.middlewares.use('/__dev-server/hmr-helpers', (_req, res) => {
			const helpersPath = path.resolve(__dirname, 'shared/helpers.js');
			res.setHeader('Content-Type', 'application/javascript');
			res.setHeader('Access-Control-Allow-Origin', '*');

			if (fs.existsSync(helpersPath)) {
				res.end(fs.readFileSync(helpersPath, 'utf-8'));
			} else {
				res.statusCode = 404;
				res.end('HMR helpers not found');
			}
		});

		// Inline assets endpoint (for WordPress PHP integration)
		server.middlewares.use('/__vite_inline_assets', (_req, res) => {
			// Compute Vite server URL (protocol + host + port)
			const protocol = server.config.server.https ? 'https' : 'http';
			const host =
				typeof server.config.server.host === 'string'
					? server.config.server.host
					: 'localhost';
			const port = server.config.server.port;
			const viteServerUrl = `${protocol}://${host}:${port}`;
			// Build minimal inline config for the client (polling only)
			const inlineConfig = {
				blockNamespace: this.config.wordpress?.namespace,
				pollingInterval:
					this.config.hmr?.scriptInjection?.pollingInterval || 500,
				viteServerUrl,
			};

			// Emit a tiny bootstrap that sets the config and then loads the client
			const bootstrap = `
                // Dev Server Inline Config
                window.__VITE_INLINE_ASSETS_CONFIG__ = ${JSON.stringify(inlineConfig, null, 2)};

				// Load helpers first, then client
				(function(){
					function load(src, cb){
						var s = document.createElement('script');
						s.src = src;
						s.async = true;
						s.onload = cb;
						document.head.appendChild(s);
					}
					load('${viteServerUrl}/__dev-server/hmr-helpers', function(){
						load('${viteServerUrl}/__dev-server/hmr-client');
					});
				})();
                `;

			res.setHeader('Content-Type', 'application/javascript');
			res.setHeader('Cache-Control', 'no-cache');
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.end(bootstrap);
		});

		// Asset content endpoint
		server.middlewares.use('/__dev-server/asset-content', (req, res) => {
			const url = new URL(req.url!, `http://${req.headers.host}`);
			const assetPath = url.searchParams.get('path');

			if (!assetPath) {
				res.statusCode = 400;
				res.end('Missing path parameter');
				return;
			}

			const fullPath = this.findAssetPath(assetPath);
			if (!fullPath || !fs.existsSync(fullPath)) {
				res.statusCode = 404;
				res.end('Asset not found');
				return;
			}

			const content = fs.readFileSync(fullPath, 'utf-8');
			const ext = path.extname(fullPath);
			const contentType = ext === '.css' ? 'text/css' : 'text/plain';

			res.setHeader('Content-Type', contentType);
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.end(content);
		});

		// Main dev server endpoint (for WordPress PHP integration)
		server.middlewares.use('/vite-wordpress.json', (_req, res) => {
			const config = {
				server: {
					origin: `${server.config.server.https ? 'https' : 'http'}://localhost:${server.config.server.port}`,
					port: server.config.server.port,
				},
				base: server.config.base || '/',
				// Expose additional fields used by the PHP integration to resolve assets
				outDir: this.config.build?.outDir || 'build',
				srcDir: this.config.paths?.srcDir || 'resources',
				css: this.config.build?.css || 'css',
				hmr: { enabled: false, assets: this.getAllMonitoredAssets() },
				buildMap: this.buildMapResolver.getBuildMap() || {},
			};

			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.end(JSON.stringify(config));
		});
	}

	// Polling mode: no-op for hot updates; polling endpoint exposes mtimes
	handleHotUpdate(_file: string, _server: ViteDevServer): any[] | void {
		if (!this.isHMREnabled()) return;
		return [];
	}

	/**
	 * Process bundle for build map
	 */
	processBundleAndUpdate(bundle: any): void {
		this.buildMapResolver.processBundleAndUpdate(bundle);
	}

	/**
	 * Save build map
	 */
	saveBuildMap(): void {
		this.buildMapResolver.saveBuildMap();
	}

	/**
	 * Helper methods
	 */
	private isHMREnabled(): boolean {
		return this.config.hmr?.enabled !== false;
	}

	private getAllMonitoredAssets(): string[] {
		const assets = new Set<string>();

		// Add inline watch patterns
		const watchPatterns = this.config.hmr?.watch?.inline || [];
		for (const pattern of watchPatterns) {
			assets.add(pattern);
		}

		// Add block CSS assets (from block.json and conventional files)
		for (const [, block] of this.blockAssets) {
			const styleFiles = this.getStyleFilesForBlock(block);
			const scriptFiles = this.getScriptFilesForBlock(block);

			for (const stylePath of styleFiles) {
				assets.add(path.relative(process.cwd(), stylePath));
			}

			for (const scriptPath of scriptFiles) {
				assets.add(path.relative(process.cwd(), scriptPath));
			}
		}

		return Array.from(assets);
	}

	/**
	 * Normalize a path-like string into an absolute, normalized path.
	 * Returns the absolute path (whether or not it exists).
	 */
	private normalizePath(p: string): string {
		const absolute = path.isAbsolute(p)
			? p
			: path.resolve(process.cwd(), p);
		return path.normalize(absolute);
	}

	private findAssetPath(asset: string): string | null {
		// Skip globs here; caller should expand globs separately
		if (asset.includes('*') || asset.includes('?') || asset.includes('[')) {
			return null;
		}

		const abs = this.normalizePath(asset);
		return fs.existsSync(abs) ? abs : null;
	}

	/**
	 * Derive block CSS source files from block info
	 * - Reads block.blockJson style fields (style, editorStyle, viewStyle)
	 * - Includes conventional WordPress CSS files (editor.css, style.css)
	 */
	private getStyleFilesForBlock(block: BlockInfo): string[] {
		const results: string[] = [];
		const baseDir: string | undefined = block?.path;

		if (!baseDir) return results;

		// From block.json style fields (file:./...)
		const styleProps = ['style', 'editorStyle', 'viewStyle'];
		const blockJson = block?.blockJson || {};

		for (const prop of styleProps) {
			const val = blockJson[prop];
			if (typeof val === 'string') {
				const file = this.extractFileFromBlockJsonValue(val);
				if (file)
					this.pushIfExists(results, path.resolve(baseDir, file));
			} else if (Array.isArray(val)) {
				for (const item of val) {
					if (typeof item === 'string') {
						const file = this.extractFileFromBlockJsonValue(item);
						if (file)
							this.pushIfExists(
								results,
								path.resolve(baseDir, file)
							);
					}
				}
			}
		}

		// Conventional WP CSS files
		['editor.css', 'style.css'].forEach((fname) => {
			this.pushIfExists(results, path.resolve(baseDir, fname));
		});

		return results;
	}

	/**
	 * Derive block script source files from block info
	 * - Reads block.blockJson script fields (script, editorScript, viewScript)
	 * - Includes conventional files if present (index.js/ts/tsx/jsx, editor.*, view.*)
	 */
	private getScriptFilesForBlock(block: BlockInfo): string[] {
		const results: string[] = [];
		const baseDir: string | undefined = block?.path;

		if (!baseDir) return results;

		// From block.json script fields (file:./...)
		const scriptProps = ['script', 'editorScript', 'viewScript'] as const;
		const blockJson = block?.blockJson || ({} as any);

		for (const prop of scriptProps) {
			const val = blockJson[prop];
			if (typeof val === 'string') {
				const file = this.extractFileFromBlockJsonValue(val);
				if (file)
					this.pushIfExists(results, path.resolve(baseDir, file));
			} else if (Array.isArray(val)) {
				for (const item of val) {
					if (typeof item === 'string') {
						const file = this.extractFileFromBlockJsonValue(item);
						if (file)
							this.pushIfExists(
								results,
								path.resolve(baseDir, file)
							);
					}
				}
			}
		}

		// Conventional JS/TS entry files (if present)
		const conventionalFiles = [
			'index.js',
			'index.ts',
			'index.tsx',
			'index.jsx',
			'editor.js',
			'editor.ts',
			'editor.tsx',
			'editor.jsx',
			'view.js',
			'view.ts',
			'view.tsx',
			'view.jsx',
		];

		for (const fname of conventionalFiles) {
			this.pushIfExists(results, path.resolve(baseDir, fname));
		}

		return results;
	}

	/**
	 * Extract a file path from a block.json field value
	 * - Expects values like "file:./index.css"
	 * - Ignores non-file entries (e.g. "wp-blocks")
	 * @param val The block.json field value
	 * @return string|null The extracted file path or null if not applicable
	 */
	private extractFileFromBlockJsonValue(val: string): string | null {
		if (!val) return null;

		// Expect values like "file:./index.css"; ignore non-file entries
		if (val.startsWith('file:')) {
			return val.replace(/^file:\.\//, '');
		}

		return null;
	}

	/**
	 * Push a file path to the array if it exists
	 * @param arr The array to push the path into
	 * @param fullPath The full path to check and push
	 * @return void
	 */
	private pushIfExists(arr: string[], fullPath: string) {
		if (fullPath && fs.existsSync(fullPath)) {
			arr.push(fullPath);
		}
	}
}
