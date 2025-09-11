/**
 * HMR Client Entry Point for WordPress Block Theme
 *
 * This client handles Hot Module Replacement for WordPress themes by:
 * - Polling for asset changes
 * - Updating inline CSS styles in real-time
 * - Reloading linked stylesheets
 * - Providing hooks for JavaScript updates
 */

import { HMRClient } from './HMRClient.js';
import { BaseHandler } from './handlers/BaseHandler.js';
import { InlineCSSHandler } from './handlers/InlineCSSHandler.js';
import { CSSFileHandler } from './handlers/CSSFileHandler.js';
import { JSFileHandler } from './handlers/JSFileHandler.js';

// =============================================================================
// MODULE EXPORTS
// =============================================================================

/**
 * All HMR-related classes for external use
 */
const HMRModules = {
	HMRClient,
	BaseHandler,
	InlineCSSHandler,
	CSSFileHandler,
	JSFileHandler,
};

/**
 * Configure module exports for different environments
 */
function setupModuleExports() {
	// Node.js/CommonJS environment
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = HMRModules;
		return;
	}

	// AMD environment (RequireJS)
	if (typeof window !== 'undefined' && window.define?.amd) {
		window.define(() => HMRModules);
		return;
	}

	// Browser environment - expose globally
	if (typeof window !== 'undefined') {
		Object.assign(window, HMRModules);
	}
}

// ES6 exports for modern environments
export {
	HMRClient,
	BaseHandler,
	InlineCSSHandler,
	CSSFileHandler,
	JSFileHandler,
};

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Default configuration for HMR client
 */
const DEFAULT_CONFIG = {
	blockAssets: new Map(),
	blockNamespace: 'kotisivu',
	pollingInterval: 1000,
	viteServerUrl: undefined, // Auto-detected
};

/**
 * Get HMR configuration from global scope with fallbacks
 */
function getHMRConfig() {
	return (
		window.__KOTISIVU_DEV_CONFIG__ ||
		window.__VITE_INLINE_ASSETS_CONFIG__ ||
		DEFAULT_CONFIG
	);
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize HMR client when DOM is ready
 */
function initializeHMRClient() {
	const config = getHMRConfig();
	window.__KOTISIVU_HMR_CLIENT__ = HMRClient.initialize(config);
}

/**
 * Setup DOM ready handler
 */
function setupDOMReadyHandler() {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initializeHMRClient);
	} else {
		initializeHMRClient();
	}
}

// =============================================================================
// BOOTSTRAP
// =============================================================================

// Setup module exports for different environments
setupModuleExports();

// Initialize HMR client in browser environment
if (typeof document !== 'undefined') {
	setupDOMReadyHandler();
}
