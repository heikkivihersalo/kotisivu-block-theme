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
	const configObject = {
		blockAssets: Array.from(config.blockAssets.entries()),
		blockNamespace: config.blockNamespace,
		pollingInterval: config.pollingInterval,
		viteServerUrl: config.viteServerUrl,
	};

	return `
// Set global configuration for HMR client
window.__VITE_INLINE_ASSETS_CONFIG__ = ${JSON.stringify(configObject, null, 2)};

console.log('[DevServer] Loading HMR client...');

// Load the actual HMR client module
(async function() {
	try {
		const { HMRClient } = await import('/__vite_hmr_client.js');
		const CONFIG = window.__VITE_INLINE_ASSETS_CONFIG__;
		
		HMRClient.initialize({
			blockAssets: new Map(CONFIG.blockAssets),
			blockNamespace: CONFIG.blockNamespace,
			pollingInterval: CONFIG.pollingInterval,
			viteServerUrl: CONFIG.viteServerUrl
		});
		
		console.log('[DevServer] HMR client loaded and initialized');
	} catch (error) {
		console.warn('[DevServer] Failed to load HMR client:', error);
		
		// Fallback: load via script tag
		const script = document.createElement('script');
		script.src = '/__vite_hmr_client.js';
		script.onload = () => {
			if (window.HMRClient) {
				const CONFIG = window.__VITE_INLINE_ASSETS_CONFIG__;
				window.HMRClient.initialize({
					blockAssets: new Map(CONFIG.blockAssets),
					blockNamespace: CONFIG.blockNamespace,
					pollingInterval: CONFIG.pollingInterval,
					viteServerUrl: CONFIG.viteServerUrl
				});
				console.log('[DevServer] HMR client loaded via fallback');
			}
		};
		script.onerror = () => console.error('[DevServer] Failed to load HMR client');
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
