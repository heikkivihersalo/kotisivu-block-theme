/**
 * Server Middleware Utilities
 *
 * Utilities for handling server-side HMR requests and asset serving.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { BlockAssetInfo, AssetInfo } from '../types.js';
import {
	generateScript,
	generateModuleScript,
	generateExternalScript,
} from '../utils/script-templates.js';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Find the actual file path for an asset
 */
function findAssetPath(
	assetPath: string,
	blockAssets: Map<string, BlockAssetInfo>,
	generalAssets?: Map<string, AssetInfo>
): string {
	// Try direct resolution first
	const directPath = path.resolve(assetPath);
	if (fs.existsSync(directPath)) {
		return directPath;
	}

	// Check block assets
	for (const [, assetInfo] of blockAssets) {
		for (const buildPath of Object.values(assetInfo.build)) {
			if (
				buildPath === assetPath ||
				buildPath.endsWith(assetPath) ||
				assetPath.endsWith(buildPath)
			) {
				const fullPath = path.resolve(buildPath);
				if (fs.existsSync(fullPath)) {
					return fullPath;
				}
			}
		}
	}

	// Check general assets
	if (generalAssets) {
		for (const [, assetInfo] of generalAssets) {
			if (
				assetInfo.buildPath === assetPath ||
				assetInfo.buildPath.endsWith(assetPath) ||
				assetPath.endsWith(assetInfo.buildPath)
			) {
				const fullPath = path.resolve(assetInfo.buildPath);
				if (fs.existsSync(fullPath)) {
					return fullPath;
				}
			}
		}
	}

	return '';
}

/**
 * Create HMR client middleware
 */
export function createHMRClientMiddleware(): (
	req: any,
	res: any,
	next: any
) => void {
	return (req, res, next) => {
		if (req.url !== '/__vite_hmr_client.js') {
			return next();
		}

		try {
			// Serve a simplified JavaScript version of the HMR client
			const content = `
/**
 * Simplified HMR Client for WordPress Block Theme
 */

class HMRClient {
	constructor(config) {
		this.lastModified = {};
		this.pollingInterval = null;
		this.isRunning = false;
		this.config = config;
		this.handlers = [
			new InlineCSSHandler(config),
			new CSSFileHandler(),
			new JSFileHandler()
		];
		this.storeGlobalConfig();
	}

	static initialize(config) {
		console.log('[DevServer] Initializing HMR client');
		const client = new HMRClient(config);
		client.start();
		console.log('[DevServer] HMR client initialized');
		return client;
	}

	start() {
		if (this.isRunning) {
			console.warn('[HMR] Client is already running');
			return;
		}

		console.log('[DevServer] Starting HMR with polling');
		this.isRunning = true;
		this.setupPolling();
	}

	stop() {
		if (!this.isRunning) return;

		console.log('[DevServer] Stopping HMR');
		this.isRunning = false;

		if (this.pollingInterval) {
			clearInterval(this.pollingInterval);
			this.pollingInterval = null;
		}
	}

	pause() {
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval);
			this.pollingInterval = null;
		}
		console.log('[DevServer] HMR polling paused');
	}

	resume() {
		if (this.isRunning && !this.pollingInterval) {
			this.setupPolling();
			console.log('[DevServer] HMR polling resumed');
		}
	}

	getConfig() {
		return { ...this.config };
	}

	updateConfig(newConfig) {
		this.config = { ...this.config, ...newConfig };
		this.storeGlobalConfig();

		if (newConfig.pollingInterval && this.isRunning) {
			this.pause();
			this.resume();
		}
	}

	storeGlobalConfig() {
		window.__VITE_INLINE_ASSETS_CONFIG__ = {
			blockAssets: Array.from(this.config.blockAssets.entries()),
			blockNamespace: this.config.blockNamespace,
			pollingInterval: this.config.pollingInterval,
			viteServerUrl: this.config.viteServerUrl,
		};
	}

	setupPolling() {
		const pollForChanges = async () => {
			if (!this.isRunning) return;

			try {
				const viteServerUrl = this.getViteServerUrl();
				const statusUrl = viteServerUrl + '/__vite_inline_content/status';
				const response = await fetch(statusUrl);

				if (response.ok) {
					const status = await response.json();
					const changes = [];

					for (const [asset, modified] of Object.entries(status)) {
						if (this.lastModified[asset] && this.lastModified[asset] !== modified) {
							const content = await this.fetchAssetContent(asset);
							if (content !== null) {
								changes.push({
									path: asset,
									content: content,
									type: this.determineAssetType(asset)
								});
							}
						}
						this.lastModified[asset] = modified;
					}

					await this.processChanges(changes);
				}
			} catch (error) {
				// Silently fail for polling to avoid console spam
			}
		};

		this.pollingInterval = window.setInterval(
			pollForChanges,
			this.config.pollingInterval || 500
		);
	}

	async fetchAssetContent(assetPath) {
		try {
			const viteServerUrl = this.getViteServerUrl();
			const contentUrl = viteServerUrl + '/__vite_inline_content/' + assetPath;
			const response = await fetch(contentUrl);

			return response.ok ? await response.text() : null;
		} catch (error) {
			console.warn('[HMR] Failed to fetch content for:', assetPath, error);
			return null;
		}
	}

	async processChanges(changes) {
		for (const change of changes) {
			const handler = this.handlers.find(h => h.canHandle(change.path));

			if (handler) {
				try {
					await handler.update(change.path, change.content);
				} catch (error) {
					console.warn('[HMR] Failed to update asset:', change.path, error);
				}
			} else {
				console.warn('[HMR] No handler found for asset:', change.path);
			}
		}
	}

	determineAssetType(assetPath) {
		if (assetPath.endsWith('.css')) {
			return 'inline-css';
		}
		if (assetPath.endsWith('.js') || assetPath.endsWith('.ts')) {
			return 'js-file';
		}
		return 'other';
	}

	getViteServerUrl() {
		if (this.config.viteServerUrl) {
			return this.config.viteServerUrl;
		}

		if (location.port === '5173') {
			return '';
		}

		if (location.hostname.includes('.local') || 
			location.hostname.includes('.test') || 
			location.hostname.includes('.ddev.site')) {
			return location.protocol + '//' + location.hostname + ':5173';
		}

		return location.protocol + '//' + location.hostname + ':5173';
	}
}

class InlineCSSHandler {
	constructor(config) {
		this.config = config;
	}

	canHandle(assetPath) {
		return assetPath.endsWith('.css');
	}

	async update(assetPath, content) {
		const styleId = this.getStyleIdFromAsset(assetPath);
		let styleElement = document.getElementById(styleId);

		if (!styleElement) {
			const foundElement = this.findStyleElementByPattern(assetPath);
			if (foundElement) {
				styleElement = foundElement;
			}
		}

		if (styleElement && styleElement.textContent !== content) {
			styleElement.textContent = content;
			console.log('[HMR] ✅ Updated inline CSS:', assetPath);
			return true;
		}

		if (!styleElement) {
			console.warn('[HMR] No style element found for:', assetPath, 'with ID:', styleId);
		}

		return false;
	}

	getStyleIdFromAsset(assetPath) {
		const blockAssets = this.config.blockAssets;

		for (const [, assetInfo] of blockAssets) {
			if (assetPath.includes(assetInfo.blockSlug || assetInfo.slug)) {
				let cssType = 'style';
				if (assetPath.includes('index.css')) {
					cssType = 'index';
				} else if (assetPath.includes('style-index.css')) {
					cssType = 'style-index';
				}
				return this.config.blockNamespace + '-' + (assetInfo.blockSlug || assetInfo.slug) + '-' + cssType + '-inline-css';
			}
		}

		const assetId = assetPath.replace(/[^a-zA-Z0-9]/g, '-');
		return assetId + '-inline-css';
	}

	findStyleElementByPattern(assetPath) {
		const styleElements = document.querySelectorAll('style[id*="-inline-css"], style[id*="-css"]');
		const assetName = assetPath.split('/').pop()?.replace('.css', '') || '';

		for (const style of styleElements) {
			if (style.id.includes(assetName)) {
				return style;
			}
		}

		return null;
	}
}

class CSSFileHandler {
	canHandle(assetPath) {
		return assetPath.endsWith('.css');
	}

	async update(assetPath, _content) {
		const linkElements = document.querySelectorAll('link[rel="stylesheet"]');

		for (const link of linkElements) {
			if (link.href.includes(assetPath.replace(/^\/+/, ''))) {
				const url = new URL(link.href);
				url.searchParams.set('t', Date.now().toString());
				link.href = url.toString();
				console.log('[HMR] ✅ Reloaded CSS file:', assetPath);
				return true;
			}
		}

		return false;
	}
}

class JSFileHandler {
	canHandle(assetPath) {
		return assetPath.endsWith('.js') || assetPath.endsWith('.ts');
	}

	async update(assetPath, _content) {
		console.log('[HMR] 🔄 JS file changed, consider page reload:', assetPath);
		return true;
	}
}

// Make HMRClient available globally
if (typeof window !== "undefined") {
	window.HMRClient = HMRClient;
}
`;

			res.setHeader('Content-Type', 'application/javascript');
			res.setHeader('Cache-Control', 'no-cache');
			res.end(content);
		} catch (error) {
			console.error('[DevServer] Error serving HMR client:', error);
			res.statusCode = 500;
			res.end('Internal server error');
		}
	};
}

/**
 * Serve the HMR client script
 */
export function createClientScriptMiddleware(
	getBlockAssets: () => Map<string, BlockAssetInfo>,
	blockNamespace: string,
	method: 'inline' | 'external' | 'module' = 'inline',
	pollingInterval = 500,
	options: {
		themePrefix?: string;
		viteServerUrl?: string;
		vitePort?: string;
	} = {}
): (req: any, res: any) => void {
	return (_req, res) => {
		res.setHeader('Content-Type', 'application/javascript');
		res.setHeader('Cache-Control', 'no-cache');

		// Get current block assets dynamically
		const blockAssets = getBlockAssets();

		const scriptConfig = {
			blockAssets,
			blockNamespace,
			pollingInterval,
			...options,
		};

		let clientScript: string;

		switch (method) {
			case 'external':
				clientScript = generateExternalScript(scriptConfig);
				break;
			case 'module':
				clientScript = generateModuleScript(scriptConfig);
				break;
			case 'inline':
			default:
				clientScript = generateScript('hmr-client', scriptConfig);
				break;
		}

		res.end(clientScript);
	};
}

/**
 * Create status endpoint middleware
 * Returns modification timestamps for monitored assets
 */
export function createStatusMiddleware(
	getAllMonitoredAssets: () => string[],
	blockAssets: Map<string, BlockAssetInfo>,
	generalAssets?: Map<string, AssetInfo>
): (req: any, res: any, next: any) => void {
	return async (req, res, next) => {
		if (req.url !== '/__vite_inline_content/status') {
			return next();
		}

		const allAssets = getAllMonitoredAssets();
		const status: Record<string, number> = {};

		for (const asset of allAssets) {
			try {
				const fullPath = findAssetPath(
					asset,
					blockAssets,
					generalAssets
				);

				if (fullPath && fs.existsSync(fullPath)) {
					const stats = fs.statSync(fullPath);
					status[asset] = stats.mtime.getTime();
				}
			} catch (error) {
				// Skip assets that can't be read
			}
		}

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(status));
	};
}

/**
 * Create asset content middleware
 * Serves asset content for HMR updates
 */
export function createAssetContentMiddleware(
	getAllMonitoredAssets: () => string[],
	blockAssets: Map<string, BlockAssetInfo>,
	generalAssets?: Map<string, AssetInfo>
): (req: any, res: any, next: any) => void {
	return async (req, res, next) => {
		if (!req.url?.startsWith('/__vite_inline_content/')) {
			return next();
		}

		const assetPath = req.url.replace('/__vite_inline_content/', '');
		if (!assetPath) {
			return next();
		}

		// Validate asset is monitored
		const allAssets = getAllMonitoredAssets();
		const isValidAsset = allAssets.some(
			(asset) => assetPath === asset || asset.endsWith(assetPath)
		);

		if (!isValidAsset) {
			console.log('[DevServer] Invalid asset requested:', assetPath);
			res.statusCode = 404;
			res.end('Asset not found');
			return;
		}

		try {
			const fullPath = findAssetPath(
				assetPath,
				blockAssets,
				generalAssets
			);

			if (fullPath && fs.existsSync(fullPath)) {
				const content = fs.readFileSync(fullPath, 'utf-8');
				const ext = path.extname(fullPath).toLowerCase();
				const contentType = ['.js', '.ts', '.jsx', '.tsx'].includes(ext)
					? 'application/javascript'
					: 'text/css';

				res.setHeader('Content-Type', contentType);
				res.end(content);
			} else {
				console.log('[DevServer] Asset not found:', assetPath);
				res.statusCode = 404;
				res.end('Asset not found');
			}
		} catch (error) {
			console.error('[DevServer] Error serving asset:', error);
			res.statusCode = 500;
			res.end('Internal server error');
		}
	};
}
