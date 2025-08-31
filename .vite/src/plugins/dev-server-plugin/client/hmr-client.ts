/**
 * HMR Client for Inline Assets
 *
 * Client-side script for handling Hot Module Replacement of inline CSS assets.
 * This script runs in the browser and polls for changes to inline assets,
 * automatically updating styles when changes are detected.
 */

/**
 * HMR Client Configuration Interface
 */
interface HMRConfig {
	blockAssets: Map<string, any>;
	blockNamespace: string;
	pollingInterval: number;
	viteServerUrl?: string;
}

/**
 * Initialize HMR client with given configuration
 */
export function initializeHMR(config: HMRConfig): void {
	console.log('[DevServer] Initializing HMR client');

	// Store config globally for access by other functions
	(window as any).__VITE_INLINE_ASSETS_CONFIG__ = {
		blockAssets: Array.from(config.blockAssets.entries()),
		blockNamespace: config.blockNamespace,
		pollingInterval: config.pollingInterval,
		viteServerUrl: config.viteServerUrl,
	};

	// Setup polling-based HMR
	setupPollingHMR(config);

	console.log('[DevServer] HMR client initialized');
}

/**
 * Setup polling-based HMR
 */
function setupPollingHMR(config: HMRConfig): void {
	console.log('[DevServer] Using polling for HMR');
	const lastModified: Record<string, number> = {};

	function getViteServerUrl(): string {
		if (config.viteServerUrl) {
			return config.viteServerUrl;
		}

		// Auto-detect based on current location
		if (location.port === '5173') {
			return '';
		}
		// Default fallback
		const protocol = location.protocol;
		return `${protocol}//${location.hostname}:5173`;
	}

	async function pollForChanges(): Promise<void> {
		try {
			const viteServerUrl = getViteServerUrl();
			const statusUrl = `${viteServerUrl}/__vite_inline_content/status`;
			const response = await fetch(statusUrl);

			if (response.ok) {
				const status: Record<string, number> = await response.json();
				for (const [asset, modified] of Object.entries(status)) {
					if (
						lastModified[asset] &&
						lastModified[asset] !== modified
					) {
						await updateInlineAsset(asset, config);
					}
					lastModified[asset] = modified;
				}
			}
		} catch (error) {
			// Silently fail for polling
		}
	}

	setInterval(pollForChanges, config.pollingInterval || 500);
}

/**
 * Update inline styles with new content
 */
async function updateInlineAsset(
	assetPath: string,
	config: HMRConfig
): Promise<void> {
	try {
		const viteServerUrl = config.viteServerUrl || '';
		const contentUrl = `${viteServerUrl}/__vite_inline_content/${assetPath}`;
		const response = await fetch(contentUrl);

		if (response.ok) {
			const newContent = await response.text();
			const styleId = getStyleIdFromAsset(assetPath, config);

			// Find the corresponding style tag by exact ID
			let styleElement = document.getElementById(styleId);

			// If exact ID not found, try pattern matching
			if (!styleElement) {
				const styleElements = document.querySelectorAll(
					'style[id*="-inline-css"], style[id*="-css"]'
				);
				const assetName =
					assetPath.split('/').pop()?.replace('.css', '') || '';

				for (const style of styleElements) {
					if (style.id.includes(assetName)) {
						styleElement = style as HTMLElement;
						break;
					}
				}
			}

			if (styleElement && styleElement.textContent !== newContent) {
				styleElement.textContent = newContent;
				console.log('[HMR] ✅ Updated inline asset:', assetPath);
			}
		}
	} catch (error) {
		console.warn('[HMR] Failed to update inline asset:', assetPath, error);
	}
}

/**
 * Generate WordPress style ID from asset path
 */
function getStyleIdFromAsset(assetPath: string, config: HMRConfig): string {
	const blockAssets = new Map(
		(window as any).__VITE_INLINE_ASSETS_CONFIG__?.blockAssets || []
	);

	// Check if it's a block asset
	for (const [, assetInfo] of blockAssets) {
		const typedAssetInfo = assetInfo as {
			blockSlug: string;
			sourcePath: string;
			buildPath?: string;
		};
		if (assetPath.includes(typedAssetInfo.blockSlug)) {
			// Determine CSS type from path
			let cssType = 'style';
			if (assetPath.includes('index.css')) {
				cssType = 'index';
			} else if (assetPath.includes('style-index.css')) {
				cssType = 'style-index';
			}
			return `${config.blockNamespace}-${typedAssetInfo.blockSlug}-${cssType}-inline-css`;
		}
	}

	// Handle theme inline assets
	const assetId = assetPath.replace(/[^a-zA-Z0-9]/g, '-');
	return `${assetId}-inline-css`;
}
