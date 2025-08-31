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
 * Generate inline HMR client script
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

	// Inline HMR client script
	return `
// Set global configuration for HMR client
window.__VITE_INLINE_ASSETS_CONFIG__ = ${JSON.stringify(configObject, null, 2)};

console.log('[DevServer] HMR client loaded');

// Configuration will be available in the global scope
const CONFIG = window.__VITE_INLINE_ASSETS_CONFIG__ || {
	blockAssets: [],
	blockNamespace: 'wp',
	pollingInterval: 500,
	viteServerUrl: undefined,
};

/**
 * Generate WordPress style ID from asset path
 */
function getStyleIdFromAsset(assetPath, themePrefix) {
	const blockAssets = new Map(CONFIG.blockAssets);

	// Check if it's a block asset
	for (const [, assetInfo] of blockAssets) {
		console.log('[HMR] Checking asset info:', assetInfo);
		if (assetPath.includes(assetInfo.blockSlug)) {
			// Determine CSS type from path
			let cssType = 'style';
			if (assetPath.includes('index.css') && !assetPath.includes('style-index.css')) {
				cssType = 'index';
			} else if (assetPath.includes('style-index.css')) {
				cssType = 'style';
			}
			const generatedId = CONFIG.blockNamespace + '-' + assetInfo.blockSlug + '-' + cssType + '-inline-css';
			console.log('[HMR] Generated block asset ID:', generatedId);
			return generatedId;
		}
	}

	// Fallback for other assets
	const assetId = assetPath.replace(/[^a-zA-Z0-9]/g, '-');
	console.log('[HMR] Using fallback ID:', assetId + '-inline-css');
	return assetId + '-inline-css';
}

/**
 * Get Vite server URL from configuration or auto-detect
 */
function getViteServerUrl() {
	if (CONFIG.viteServerUrl) {
		return CONFIG.viteServerUrl;
	}

	// Auto-detect based on current location
	if (location.port === '5173') {
		return '';
	}
	
	// Check if we're on a Local by Flywheel or custom domain setup
	if (location.hostname.includes('.local') || location.hostname.includes('.test') || location.hostname.includes('.ddev.site')) {
		const protocol = location.protocol;
		return protocol + '//' + location.hostname + ':5173';
	}
	
	// Default fallback for localhost
	const protocol = location.protocol;
	return protocol + '//' + location.hostname + ':5173';
}

/**
 * Update inline styles with new content
 */
async function updateInlineAsset(assetPath, themePrefix = 'theme') {
	try {
		const viteServerUrl = getViteServerUrl();
		const contentUrl = viteServerUrl + '/__vite_inline_content/' + assetPath;
		const response = await fetch(contentUrl);

		if (response.ok) {
			const newContent = await response.text();
			const styleId = getStyleIdFromAsset(assetPath, themePrefix);
			
			// Find the corresponding style tag by exact ID
			let styleElement = document.getElementById(styleId);

			// If exact ID not found, try pattern matching
			if (!styleElement) {
				const styleElements = document.querySelectorAll(
					'style[id*="-inline-css"], style[id*="-css"]'
				);
				const assetName = assetPath.split('/').pop()?.replace('.css', '') || '';

				for (const style of styleElements) {
					if (style.id.includes(assetName)) {
						styleElement = style;
						console.log('[HMR] Found matching style element:', style.id);
						break;
					}
				}
			}

			if (styleElement && styleElement.textContent !== newContent) {
				styleElement.textContent = newContent;
				console.log('[HMR] ✅ Updated inline asset:', assetPath);
			} else if (!styleElement) {
				console.warn('[HMR] No style element found for:', assetPath, 'with ID:', styleId);
			} else {
				console.log('[HMR] Content unchanged for:', assetPath);
			}
		}
	} catch (error) {
		console.warn('[HMR] Failed to update inline asset:', assetPath, error);
	}
}

/**
 * Setup polling-based HMR
 */
function setupPollingHMR(themePrefix) {
	console.log('[DevServer] Using polling for HMR');
	const lastModified = {};
	const viteServerUrl = getViteServerUrl();

	async function pollForChanges() {
		try {
			const statusUrl = viteServerUrl + '/__vite_inline_content/status';
			const response = await fetch(statusUrl);
			if (response.ok) {
				const status = await response.json();
				for (const [asset, modified] of Object.entries(status)) {
					if (lastModified[asset] && lastModified[asset] !== modified) {
						await updateInlineAsset(asset, themePrefix);
					}
					lastModified[asset] = modified;
				}
			}
		} catch (error) {
			// Silently fail for polling
		}
	}

	setInterval(pollForChanges, CONFIG.pollingInterval || 500);
}

/**
 * Initialize HMR
 */
function initializeHMR() {
	// Extract theme prefix from current domain or use default
	const themePrefix = location.hostname.split('.')[0] || 'theme';
	
	setupPollingHMR(themePrefix);

	console.log('[DevServer] HMR setup complete');
}

// Start HMR
initializeHMR();
`;
}

/**
 * Generate ES module script
 */
export function generateModuleScript(config: ScriptConfig): string {
	return `
import { initializeHMR } from '/__vite_inline_assets_module';

const blockAssetsMap = new Map(${JSON.stringify(Array.from(config.blockAssets.entries()))});
const hmrConfig = {
	blockAssets: blockAssetsMap,
	blockNamespace: '${config.blockNamespace}',
	pollingInterval: ${config.pollingInterval}
};

initializeHMR(hmrConfig);
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
