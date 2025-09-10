/**
 * Simplified HMR Client for WordPress Block Theme
 *
 * This client handles Hot Module Replacement for WordPress themes by:
 * - Polling for asset changes
 * - Updating inline CSS styles in real-time
 * - Reloading linked stylesheets
 * - Providing hooks for JavaScript updates
 */

/**
 * Main HMR Client class
 */
class HMRClient {
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
			new CSSFileHandler(),
			new JSFileHandler(),
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
				`${this.config.viteServerUrl}/__dev-server/status`
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
			const contentUrl = `${this.config.viteServerUrl}/__dev-server/asset-content?path=${encodeURIComponent(assetPath)}`;
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

			// If already on the Vite server port, return empty string
			if (hostname === 'localhost' && port === '5173') {
				return '';
			}

			// Build Vite server URL
			return `${protocol}//${hostname}:5173`;
		}

		// Fallback
		return 'http://localhost:5173';
	}
}

/**
 * Handler for inline CSS styles
 */
class InlineCSSHandler {
	/**
	 * @param {Object} config - HMR configuration
	 */
	constructor(config) {
		this.config = config;
	}

	/**
	 * Check if this handler can process the asset type
	 * @param {string} type - Asset type
	 * @param {string} path - Asset path
	 * @returns {boolean} Whether this handler can process the asset
	 */
	canHandle(type, path) {
		return type === 'inline-css' && path.includes('inline');
	}

	/**
	 * Update inline CSS content
	 * @param {string} assetPath - Asset path
	 * @param {string} content - New CSS content
	 */
	async update(assetPath, content) {
		if (!content) return;

		const inlineStyles = document.querySelectorAll(
			'style[data-vite-dev-id]'
		);
		inlineStyles.forEach((style) => {
			if (
				style.dataset.viteDevId &&
				assetPath.includes(style.dataset.viteDevId)
			) {
				style.textContent = content;
				console.log('[DevServer] Updated inline CSS:', assetPath);
			}
		});
	}
}

/**
 * Handler for CSS files
 */
class CSSFileHandler {
	/**
	 * Check if this handler can process the asset type
	 * @param {string} type - Asset type
	 * @param {string} path - Asset path
	 * @returns {boolean} Whether this handler can process the asset
	 */
	canHandle(type, path) {
		return type === 'inline-css' && !path.includes('inline');
	}

	/**
	 * Update CSS file by reloading link elements
	 * @param {string} assetPath - Asset path
	 * @param {string} content - New CSS content (unused for file reloading)
	 */
	async update(assetPath, content) {
		const links = document.querySelectorAll('link[rel="stylesheet"]');
		links.forEach((link) => {
			if (
				link.href &&
				assetPath.includes(this.extractFilename(link.href))
			) {
				const newHref = this.addTimestamp(link.href);
				link.href = newHref;
				console.log('[DevServer] Reloaded CSS file:', assetPath);
			}
		});
	}

	/**
	 * Extract filename from URL
	 * @param {string} url - Full URL
	 * @returns {string} Filename
	 */
	extractFilename(url) {
		return url.split('/').pop().split('?')[0];
	}

	/**
	 * Add timestamp to URL for cache busting
	 * @param {string} url - Original URL
	 * @returns {string} URL with timestamp
	 */
	addTimestamp(url) {
		const separator = url.includes('?') ? '&' : '?';
		return `${url}${separator}t=${Date.now()}`;
	}
}

/**
 * Handler for JavaScript files
 */
class JSFileHandler {
	/**
	 * Check if this handler can process the asset type
	 * @param {string} type - Asset type
	 * @param {string} path - Asset path
	 * @returns {boolean} Whether this handler can process the asset
	 */
	canHandle(type, path) {
		return type === 'js-file';
	}

	/**
	 * Handle JavaScript file updates (currently logs only)
	 * @param {string} assetPath - Asset path
	 * @param {string} content - New JavaScript content
	 */
	async update(assetPath, content) {
		console.log('[DevServer] JavaScript file changed:', assetPath);
		// Note: Full JS HMR would require more complex module replacement
		// For now, just log the change
	}
}

// Export classes for testing and module usage
if (typeof module !== 'undefined' && module.exports) {
	// Node.js/CommonJS environment
	module.exports = {
		HMRClient,
		InlineCSSHandler,
		CSSFileHandler,
		JSFileHandler,
	};
} else if (
	typeof window !== 'undefined' &&
	window.define &&
	window.define.amd
) {
	// AMD environment
	window.define(() => ({
		HMRClient,
		InlineCSSHandler,
		CSSFileHandler,
		JSFileHandler,
	}));
} else if (typeof window !== 'undefined') {
	// Browser environment - also expose for global access
	window.HMRClient = HMRClient;
	window.InlineCSSHandler = InlineCSSHandler;
	window.CSSFileHandler = CSSFileHandler;
	window.JSFileHandler = JSFileHandler;
}

// ES6 exports for modern environments
export { HMRClient, InlineCSSHandler, CSSFileHandler, JSFileHandler };

// Initialize HMR client when DOM is ready (only in browser)
if (typeof document !== 'undefined') {
	const initializeWhenReady = () => {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', initializeWhenReady);
			return;
		}

		// Get configuration from global scope
		const config = window.__KOTISIVU_DEV_CONFIG__ || {
			blockAssets: new Map(),
			blockNamespace: 'kotisivu',
			pollingInterval: 1000,
			viteServerUrl: 'http://localhost:5173',
		};

		// Start HMR client
		window.__KOTISIVU_HMR_CLIENT__ = HMRClient.initialize(config);
	};

	initializeWhenReady();
}
