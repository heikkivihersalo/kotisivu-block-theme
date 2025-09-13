/**
 * Simplified HMR Client for WordPress Block Theme
 *
 * A lightweight, consolidated client that handles Hot Module Replacement for WordPress themes.
 */

// Try to use shared helpers if available (loaded by dev server), else fall back
const Helpers =
	(typeof window !== 'undefined' && window.__VITE_HMR_HELPERS__) || null;

class Client {
	constructor(config = {}) {
		// Auto-detect server URL from current page
		const currentProtocol =
			window.location.protocol === 'https:' ? 'https:' : 'http:';
		const currentHost = window.location.hostname;
		const vitePort = '5173'; // Default Vite port

		this.config = {
			pollingInterval: 1000,
			viteServerUrl: `${currentProtocol}//${currentHost}:${vitePort}`,
			...config,
		};

		this.lastModTimes = new Map();
		this.pollingTimer = null;
		this.isActive = false;
	}

	/**
	 * Initialize and start the HMR client
	 */
	static initialize(config) {
		const client = new Client(config);
		client.start();
		return client;
	}

	/**
	 * Start HMR monitoring
	 */
	start() {
		if (this.isActive) return;

		this.isActive = true;
		this.log('Starting dev client (polling only)');

		// Start polling for changes
		this.startPolling();
	}

	/**
	 * Stop HMR monitoring
	 */
	stop() {
		if (!this.isActive) return;

		this.isActive = false;
		this.log('Stopping dev client');

		if (this.pollingTimer) {
			clearInterval(this.pollingTimer);
			this.pollingTimer = null;
		}
	}

	/**
	 * Start polling for file changes
	 */
	startPolling() {
		this.pollingTimer = setInterval(() => {
			this.checkForChanges();
		}, this.config.pollingInterval);
	}

	/**
	 * Check for file changes via status endpoint
	 */
	async checkForChanges() {
		try {
			const response = await fetch(
				`${this.config.viteServerUrl}/__dev-server/status`
			);
			if (!response.ok) return;

			const status = await response.json();

			for (const [file, modTime] of Object.entries(status)) {
				const lastModTime = this.lastModTimes.get(file);

				if (lastModTime && modTime > lastModTime) {
					this.handleFileChange({ file, timestamp: modTime });
				}

				this.lastModTimes.set(file, modTime);
			}
		} catch (e) {
			// Ignore network errors
		}
	}

	/**
	 * Handle file changes
	 */
	async handleFileChange({ file }) {
		if (file.endsWith('.css')) {
			await this.updateCSS(file);
		} else if (file.endsWith('.js')) {
			this.reloadPage();
		}
	}

	/**
	 * Update CSS files
	 */
	async updateCSS(file) {
		try {
			// Try to get new content
			const response = await fetch(
				`${this.config.viteServerUrl}/__dev-server/asset-content?path=${encodeURIComponent(file)}`
			);

			if (!response.ok) {
				this.reloadPage();
				return;
			}

			const newContent = await response.text();

			console.log('Fetched new CSS content:', newContent);

			// Update inline styles
			const updated = this.updateInlineStyles(file, newContent);

			// Update linked stylesheets
			if (!updated) {
				this.updateLinkedStylesheets(file);
			}
		} catch (e) {
			this.reloadPage();
		}
	}

	/**
	 * Update inline styles
	 */
	updateInlineStyles(file, newContent) {
		let updated = false;
		const id = (
			Helpers?.relativePathToInlineStyleId ||
			Client.relativePathToInlineStyleId
		)(this.config.blockNamespace, file);

		if (!id) return updated;

		const styleEl = document.getElementById(id);
		if (styleEl) {
			const currentContent = styleEl.textContent || '';
			if (
				(Helpers?.contentDiffers || Client.contentDiffers)(
					currentContent,
					newContent
				)
			) {
				styleEl.textContent = newContent;
				updated = true;
				this.log(`Updated inline style for ${file}`);
			}
		}

		return updated;
	}

	/**
	 * Update linked stylesheets
	 */
	updateLinkedStylesheets(file) {
		document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
			const href = link.getAttribute('href');
			if (
				href &&
				(href.includes(file.replace(/\.(scss|sass|less)$/, '.css')) ||
					href.includes(file.replace(/^.*\//, '')))
			) {
				// Force reload by adding timestamp
				const url = new URL(href, window.location.origin);
				url.searchParams.set('t', Date.now().toString());
				link.setAttribute('href', url.toString());
				this.log(`Reloaded stylesheet: ${href}`);
			}
		});
	}

	/**
	 * Convert relative file path to inline style ID for a given file (<path>/<block_name>/style.css)
	 * ID is always in a form of <namespace>-<block_name>-style-inline-css
	 * Made static so it can be used from non-browser environments (e.g., dev server).
	 */
	static relativePathToInlineStyleId(namespace, file) {
		const match = file.match(/^(.*\/)?([^/]+)\/style\.css$/);
		if (!match) return null;
		if (!namespace) return null;
		const blockName = match[2];
		return `${namespace}-${blockName}-style-inline-css`;
	}

	/**
	 * Check if content differs significantly
	 * Made static so it can be used from non-browser environments.
	 */
	static contentDiffers(content1, content2) {
		// Remove whitespace and comments for comparison
		const normalize = (str) =>
			str
				.replace(/\/\*[\s\S]*?\*\//g, '')
				.replace(/\s+/g, ' ')
				.trim();

		return normalize(content1) !== normalize(content2);
	}

	/**
	 * Reload the page
	 */
	reloadPage() {
		this.log('Reloading page');
		window.location.reload();
	}

	/**
	 * Log messages with prefix
	 */
	log(message) {
		console.log(`[HMR] ${message}`);
	}
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Get configuration from global scope
 */
function getHMRConfig() {
	return window.__VITE_INLINE_ASSETS_CONFIG__ || {};
}

/**
 * Initialize HMR client when DOM is ready
 */
function initializeHMR() {
	if (window.__VITE_HMR_CLIENT__) return;

	const config = getHMRConfig();
	window.__VITE_HMR_CLIENT__ = Client.initialize(config);
}

// Auto-initialize in browser environment
if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initializeHMR);
	} else {
		initializeHMR();
	}
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { Client };
}

// Export for ES modules
if (typeof window !== 'undefined') {
	window.Client = Client;
}
