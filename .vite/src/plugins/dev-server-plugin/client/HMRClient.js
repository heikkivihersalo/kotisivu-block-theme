import { InlineCSSHandler } from './handlers/InlineCSSHandler.js';
import { CSSFileHandler } from './handlers/CSSFileHandler.js';
import { JSFileHandler } from './handlers/JSFileHandler.js';

/**
 * Main HMR Client class
 */
export class HMRClient {
	/**
	 * @param {Object} config - HMR configuration
	 * @param {Map} config.blockAssets - Map of block assets
	 * @param {string} config.blockNamespace - WordPress block namespace
	 * @param {number} config.pollingInterval - Polling interval in milliseconds
	 * @param {string} config.viteServerUrl - Vite server URL
	 */
	constructor(config) {
		this.lastModified = {};
		this.pollingInterval = null;
		this.isRunning = false;
		this.config = config;
		this.handlers = [
			new InlineCSSHandler(config),
			new CSSFileHandler(config),
			new JSFileHandler(config),
		];
		this.storeGlobalConfig();
	}

	/**
	 * Initialize and start the HMR client
	 * @param {Object} config - HMR configuration
	 * @returns {HMRClient} The initialized client
	 */
	static initialize(config) {
		console.log('[DevServer] Initializing HMR client');
		const client = new HMRClient(config);
		client.start();
		console.log('[DevServer] HMR client initialized');
		return client;
	}

	/**
	 * Store configuration globally for dev tools access
	 */
	storeGlobalConfig() {
		if (typeof window !== 'undefined') {
			window.__DEV_SERVER_CONFIG__ = this.config;
			window.__VITE_INLINE_ASSETS_CONFIG__ = this.config;
		}
	}

	/**
	 * Get the current configuration
	 * @returns {Object} Current configuration
	 */
	getConfig() {
		return { ...this.config };
	}

	/**
	 * Update configuration
	 * @param {Object} newConfig - New configuration values
	 */
	updateConfig(newConfig) {
		this.config = { ...this.config, ...newConfig };
		this.storeGlobalConfig();
	}

	/**
	 * Pause the HMR client (alias for stop)
	 */
	pause() {
		this.stop();
	}

	/**
	 * Resume the HMR client (alias for start)
	 */
	resume() {
		this.start();
	}

	/**
	 * Start the HMR polling process
	 */
	start() {
		if (this.isRunning) return;
		this.isRunning = true;
		this.poll();
	}

	/**
	 * Stop the HMR polling process
	 */
	stop() {
		if (!this.isRunning) return;
		this.isRunning = false;
		if (this.pollingInterval) {
			clearTimeout(this.pollingInterval);
			this.pollingInterval = null;
		}
	}

	/**
	 * Poll for asset changes
	 */
	async poll() {
		if (!this.isRunning) return;

		try {
			const response = await fetch(
				`${this.getViteServerUrl()}/__dev-server/status`
			);
			const status = await response.json();
			this.handleStatusUpdate(status);
		} catch (error) {
			console.warn('[DevServer] Failed to fetch status:', error);
		}

		if (this.isRunning) {
			this.pollingInterval = setTimeout(
				() => this.poll(),
				this.config.pollingInterval
			);
		}
	}

	/**
	 * Handle status update response
	 * @param {Object} status - Status object from server
	 */
	handleStatusUpdate(status) {
		if (!status || !status.assets) return;

		const changes = [];
		for (const [assetPath, assetInfo] of Object.entries(status.assets)) {
			if (
				!this.lastModified[assetPath] ||
				this.lastModified[assetPath] !== assetInfo.mtime
			) {
				this.lastModified[assetPath] = assetInfo.mtime;
				changes.push({
					path: assetPath,
					type: this.determineAssetType(assetPath),
					mtime: assetInfo.mtime,
				});
			}
		}

		if (changes.length > 0) {
			this.processChanges(changes);
		}
	}

	/**
	 * Fetch asset content from dev server
	 * @param {string} assetPath - Path to the asset
	 * @returns {Promise<string|null>} Asset content or null if failed
	 */
	async fetchAssetContent(assetPath) {
		try {
			const contentUrl = `${this.getViteServerUrl()}/__dev-server/asset-content?path=${encodeURIComponent(assetPath)}`;
			const response = await fetch(contentUrl);
			return response.ok ? await response.text() : null;
		} catch (error) {
			console.warn('[DevServer] Failed to fetch asset content:', error);
			return null;
		}
	}

	/**
	 * Process asset changes
	 * @param {Array} changes - Array of change objects
	 */
	async processChanges(changes) {
		for (const change of changes) {
			try {
				change.content = await this.fetchAssetContent(change.path);
				for (const handler of this.handlers) {
					if (handler.canHandle(change.type, change.path)) {
						await handler.update(change.path, change.content);
						break;
					}
				}
			} catch (error) {
				console.error('[DevServer] Error processing change:', error);
			}
		}
	}

	/**
	 * Determine asset type from path
	 * @param {string} assetPath - Asset file path
	 * @returns {string} Asset type
	 */
	determineAssetType(assetPath) {
		if (assetPath.endsWith('.css')) return 'inline-css';
		if (assetPath.endsWith('.js') || assetPath.endsWith('.ts'))
			return 'js-file';
		return 'other';
	}

	/**
	 * Get Vite server URL
	 * @returns {string} Vite server URL
	 */
	getViteServerUrl() {
		// If viteServerUrl is explicitly set in config, use it
		if (this.config.viteServerUrl) {
			return this.config.viteServerUrl;
		}

		// Detect from location if available (check both window.location and global.location for testing)
		const location =
			(typeof window !== 'undefined' && window.location) ||
			(typeof global !== 'undefined' && global.location);

		if (location) {
			const { hostname, port, protocol } = location;

			// If we're already on the Vite dev server port, return empty string for relative URLs
			if (port === '5173') {
				return '';
			}

			// Build Vite server URL based on current location
			// Use same protocol as current page, but always use port 5173 for Vite
			return `${protocol}//${hostname}:5173`;
		}

		// Fallback to relative URLs if no location available
		return '';
	}
}
