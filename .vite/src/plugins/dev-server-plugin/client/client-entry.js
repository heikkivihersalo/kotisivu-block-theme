/**
 * Simplified HMR Client for WordPress Block Theme
 *
 * This client handles Hot Module Replacement for WordPress themes by:
 * - Polling for asset changes
 * - Updating inline CSS styles in real-time
 * - Reloading linked stylesheets
 * - Providing hooks for JavaScript updates
 */

// Import the modular classes
import { HMRClient } from './HMRClient.js';
import { InlineCSSHandler } from './handlers/InlineCSSHandler.js';
import { CSSFileHandler } from './handlers/CSSFileHandler.js';
import { JSFileHandler } from './handlers/JSFileHandler.js';

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
		const config = window.__KOTISIVU_DEV_CONFIG__ ||
			window.__VITE_INLINE_ASSETS_CONFIG__ || {
				blockAssets: new Map(),
				blockNamespace: 'kotisivu',
				pollingInterval: 1000,
				viteServerUrl: undefined, // Will be auto-detected
			};

		// Start HMR client
		window.__KOTISIVU_HMR_CLIENT__ = HMRClient.initialize(config);
	};

	initializeWhenReady();
}
