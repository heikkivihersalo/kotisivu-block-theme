/**
 * HMR Client for WordPress Inline Assets
 *
 * This client-side script handles hot reloading of inline CSS assets in WordPress.
 * It supports multiple connection methods and polling fallback for WordPress + Vite setups.
 */

export interface BlockAssetInfo {
	buildPath: string;
	sourcePath: string;
	blockSlug: string;
}

export interface HMRClientConfig {
	blockAssets: Map<string, BlockAssetInfo>;
	blockNamespace: string;
	pollingInterval?: number;
	themePrefix?: string;
	viteServerUrl?: string;
	vitePort?: string;
}

/**
 * Generate WordPress style ID from asset path
 */
export function getStyleIdFromAsset(
	assetPath: string,
	blockAssets: Map<string, BlockAssetInfo>,
	blockNamespace: string,
	themePrefix = 'theme'
): string {
	// Check if it's a block asset
	for (const [, assetInfo] of blockAssets) {
		if (assetPath.includes(assetInfo.blockSlug)) {
			// Determine CSS type from path
			let cssType = 'style';
			if (assetPath.includes('index.css')) {
				cssType = 'index';
			} else if (assetPath.includes('style-index.css')) {
				cssType = 'style-index';
			}
			return `${blockNamespace}-${assetInfo.blockSlug}-${cssType}-inline-css`;
		}
	}

	// Handle theme inline assets with configurable prefix
	if (assetPath.includes('sanitize.css')) {
		return `${themePrefix}-sanitize-css`;
	} else if (assetPath.includes('inline.css')) {
		return `${themePrefix}-inline-css`;
	} else if (assetPath.includes('tailwind-utilities.css')) {
		return `${themePrefix}-tailwind-utility-css-inline-css`;
	}

	// Fallback for other assets
	const assetId = assetPath.replace(/[^a-zA-Z0-9]/g, '-');
	return `${assetId}-inline-css`;
}

/**
 * Get the Vite server URL for different environments
 */
export function getViteServerUrl(
	customUrl?: string,
	customPort = '5173'
): string {
	// Use custom URL if provided
	if (customUrl) {
		return customUrl;
	}

	// If we're already on the Vite server, use relative URLs
	if (location.port === customPort) {
		return '';
	}

	// Auto-detect based on current environment
	const protocol = location.protocol;
	return `${protocol}//${location.hostname}:${customPort}`;
}

/**
 * Update inline styles with new content
 */
export async function updateInlineAsset(
	assetPath: string,
	blockAssets: Map<string, BlockAssetInfo>,
	blockNamespace: string,
	options: {
		themePrefix?: string;
		viteServerUrl?: string;
		vitePort?: string;
	} = {}
): Promise<void> {
	try {
		const { themePrefix = 'theme', viteServerUrl, vitePort } = options;
		const serverUrl = getViteServerUrl(viteServerUrl, vitePort);
		const contentUrl = `${serverUrl}/__vite_inline_content/${assetPath}`;

		const response = await fetch(contentUrl);
		if (response.ok) {
			const newContent = await response.text();
			const styleId = getStyleIdFromAsset(
				assetPath,
				blockAssets,
				blockNamespace,
				themePrefix
			);

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
						styleElement = style as HTMLStyleElement;
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
 * Setup polling-based HMR (most reliable for WordPress + Vite)
 */
export function setupPollingHMR(
	blockAssets: Map<string, BlockAssetInfo>,
	blockNamespace: string,
	options: {
		pollingInterval?: number;
		themePrefix?: string;
		viteServerUrl?: string;
		vitePort?: string;
	} = {}
): void {
	const {
		pollingInterval = 500,
		themePrefix = 'theme',
		viteServerUrl,
		vitePort,
	} = options;

	console.log('[InlineAssets] Using polling for HMR');
	const lastModified: Record<string, number> = {};

	const serverUrl = getViteServerUrl(viteServerUrl, vitePort);
	console.log(
		'[InlineAssets] Polling Vite server at:',
		serverUrl || 'same origin'
	);

	async function pollForChanges(): Promise<void> {
		try {
			const statusUrl = `${serverUrl}/__vite_inline_content/status`;
			const response = await fetch(statusUrl);
			if (response.ok) {
				const status = await response.json();
				for (const [asset, modified] of Object.entries(status)) {
					if (
						lastModified[asset] &&
						lastModified[asset] !== modified
					) {
						await updateInlineAsset(
							asset,
							blockAssets,
							blockNamespace,
							{ themePrefix, viteServerUrl, vitePort }
						);
					}
					lastModified[asset] = modified as number;
				}
			}
		} catch (error) {
			// Silently fail for polling - this is expected when files don't exist yet
		}
	}

	setInterval(pollForChanges, pollingInterval);
}

/**
 * Setup WebSocket-based HMR (secondary option)
 */
export function setupWebSocketHMR(
	blockAssets: Map<string, BlockAssetInfo>,
	blockNamespace: string,
	options: {
		themePrefix?: string;
		viteServerUrl?: string;
		vitePort?: string;
	} = {}
): void {
	try {
		const { vitePort = '5173' } = options;
		const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
		const port = location.port || vitePort;
		const wsUrl = `${protocol}//${location.hostname}:${port}`;

		const ws = new WebSocket(wsUrl, 'vite-hmr');

		ws.addEventListener('open', () => {
			console.log(
				'[InlineAssets] WebSocket connected - will use for instant updates'
			);
		});

		ws.addEventListener('message', (event) => {
			try {
				const data = JSON.parse(event.data);
				if (
					data.type === 'custom' &&
					data.event === 'inline-asset-update'
				) {
					updateInlineAsset(
						data.data.asset,
						blockAssets,
						blockNamespace,
						options
					);
				}
			} catch (e) {
				// Ignore non-JSON messages
			}
		});

		ws.addEventListener('error', () => {
			// Expected in some setups - don't log as error
		});

		ws.addEventListener('close', () => {
			// Expected in some setups - don't log
		});
	} catch (error) {
		// Expected in some setups - don't log
	}
}

/**
 * Setup Vite HMR context (third option)
 */
export function setupViteContextHMR(
	blockAssets: Map<string, BlockAssetInfo>,
	blockNamespace: string,
	options: {
		themePrefix?: string;
		viteServerUrl?: string;
		vitePort?: string;
	} = {}
): void {
	// Check for Vite HMR by looking for window.__viteHotContext
	if (typeof window !== 'undefined' && (window as any).__viteHotContext) {
		console.log('[InlineAssets] Using Vite HMR context');
		try {
			(window as any).__viteHotContext.on(
				'inline-asset-update',
				({ asset }: { asset: string }) => {
					updateInlineAsset(
						asset,
						blockAssets,
						blockNamespace,
						options
					);
				}
			);
		} catch (e) {
			console.warn('[InlineAssets] Failed to connect via Vite context');
		}
	}
}

/**
 * Initialize HMR with multiple fallback methods
 */
export function initializeHMR(config: HMRClientConfig): boolean {
	console.log('[InlineAssets] HMR client loaded');

	const {
		blockAssets,
		blockNamespace,
		pollingInterval,
		themePrefix,
		viteServerUrl,
		vitePort,
	} = config;

	const options = { themePrefix, viteServerUrl, vitePort };

	// Method 1: Polling (most reliable for WordPress + Vite)
	setupPollingHMR(blockAssets, blockNamespace, {
		pollingInterval,
		...options,
	});

	// Method 2: WebSocket (secondary option)
	setupWebSocketHMR(blockAssets, blockNamespace, options);

	// Method 3: Vite context (third option)
	setupViteContextHMR(blockAssets, blockNamespace, options);

	console.log('[InlineAssets] HMR setup complete');
	return true;
}
