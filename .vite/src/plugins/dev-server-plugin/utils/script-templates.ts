/**
 * Script Template System
 *
 * System for generating HMR client scripts.
 */

import type { BlockAssetInfo } from '../types.js';

/**
 * Script generation configuration
 */
export interface ScriptConfig {
	blockAssets: Map<string, BlockAssetInfo>;
	blockNamespace: string;
	pollingInterval: number;
	viteServerUrl?: string;
}

/**
 * Generate inline HMR client script that loads the actual HMR client
 */
export function generateScript(
	_templateName: string,
	config: ScriptConfig
): string {
	// Prepare configuration object
	const configObject = {
		blockAssets: Array.from(config.blockAssets.entries()),
		blockNamespace: config.blockNamespace,
		pollingInterval: config.pollingInterval,
		viteServerUrl: config.viteServerUrl,
	};

	// Simple inline script that loads the actual HMR client
	return `
// Set global configuration for HMR client
window.__VITE_INLINE_ASSETS_CONFIG__ = ${JSON.stringify(configObject, null, 2)};

console.log('[DevServer] Loading HMR client...');

// Load the actual HMR client module dynamically
(async function() {
	try {
		// Try to load as ES module first
		const { HMRClient } = await import('/__vite_hmr_client.js');
		
		// Get configuration from global variable
		const CONFIG = window.__VITE_INLINE_ASSETS_CONFIG__ || {
			blockAssets: [],
			blockNamespace: 'wp',
			pollingInterval: 500,
			viteServerUrl: undefined,
		};

		// Initialize HMR with the real client
		const blockAssetsMap = new Map(CONFIG.blockAssets);
		const hmrConfig = {
			blockAssets: blockAssetsMap,
			blockNamespace: CONFIG.blockNamespace,
			pollingInterval: CONFIG.pollingInterval,
			viteServerUrl: CONFIG.viteServerUrl
		};

		HMRClient.initialize(hmrConfig);
		console.log('[DevServer] HMR client loaded and initialized');
	} catch (error) {
		console.warn('[DevServer] Failed to load HMR client:', error);
		
		// Fallback: load via script tag
		const script = document.createElement('script');
		script.src = '/__vite_hmr_client.js';
		script.onload = function() {
			// After script loads, the HMRClient should be available globally
			if (window.HMRClient) {
				const CONFIG = window.__VITE_INLINE_ASSETS_CONFIG__;
				const blockAssetsMap = new Map(CONFIG.blockAssets);
				const hmrConfig = {
					blockAssets: blockAssetsMap,
					blockNamespace: CONFIG.blockNamespace,
					pollingInterval: CONFIG.pollingInterval,
					viteServerUrl: CONFIG.viteServerUrl
				};
				window.HMRClient.initialize(hmrConfig);
				console.log('[DevServer] HMR client loaded via fallback and initialized');
			}
		};
		script.onerror = function() {
			console.error('[DevServer] Failed to load HMR client even with fallback');
		};
		document.head.appendChild(script);
	}
})();
`;
}

/**
 * Generate ES module script
 */
export function generateModuleScript(config: ScriptConfig): string {
	return `
import { HMRClient } from '/__vite_inline_assets_module';

const blockAssetsMap = new Map(${JSON.stringify(Array.from(config.blockAssets.entries()))});
const hmrConfig = {
	blockAssets: blockAssetsMap,
	blockNamespace: '${config.blockNamespace}',
	pollingInterval: ${config.pollingInterval},
	viteServerUrl: '${config.viteServerUrl || ''}'
};

HMRClient.initialize(hmrConfig);
`;
}

/**
 * Generate external script reference
 */
export function generateExternalScript(config: ScriptConfig): string {
	// Store config in global variable for external script to pick up
	return `
window.__VITE_INLINE_ASSETS_CONFIG__ = {
	blockAssets: new Map(${JSON.stringify(Array.from(config.blockAssets.entries()))}),
	blockNamespace: '${config.blockNamespace}',
	pollingInterval: ${config.pollingInterval}
};

// Load external script
const script = document.createElement('script');
script.src = '/__vite_inline_assets.js';
script.async = true;
document.head.appendChild(script);
`;
}
