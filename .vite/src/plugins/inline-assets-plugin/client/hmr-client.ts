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
}

/**
 * Generate WordPress style ID from asset path
 */
export function getStyleIdFromAsset(
	assetPath: string,
	blockAssets: Map<string, BlockAssetInfo>,
	blockNamespace: string
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

	// Handle theme inline assets
	if (assetPath.includes('sanitize.css')) {
		return 'kotisivu-sanitize-css';
	} else if (assetPath.includes('inline.css')) {
		return 'kotisivu-inline-css';
	} else if (assetPath.includes('tailwind-utilities.css')) {
		return 'kotisivu-tailwind-utility-css-inline-css';
	}

	// Fallback for other assets
	const assetId = assetPath.replace(/[^a-zA-Z0-9]/g, '-');
	return `${assetId}-inline-css`;
}

/**
 * Get the Vite server URL for different environments
 */
export function getViteServerUrl(): string {
	// If we're on block-theme.local (WordPress), connect to Vite on port 5173
	if (location.hostname === 'block-theme.local') {
		return 'https://block-theme.local:5173';
	}
	// If we're already on the Vite server, use relative URLs
	if (location.port === '5173') {
		return '';
	}
	// Fallback: assume Vite is on port 5173
	const protocol = location.protocol;
	return `${protocol}//${location.hostname}:5173`;
}

/**
 * Update inline styles with new content
 */
export async function updateInlineAsset(
	assetPath: string,
	blockAssets: Map<string, BlockAssetInfo>,
	blockNamespace: string
): Promise<void> {
	try {
		const viteServerUrl = getViteServerUrl();
		const contentUrl = `${viteServerUrl}/__vite_inline_content/${assetPath}`;

		const response = await fetch(contentUrl);
		if (response.ok) {
			const newContent = await response.text();
			const styleId = getStyleIdFromAsset(
				assetPath,
				blockAssets,
				blockNamespace
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
	pollingInterval = 500
): void {
	console.log(
		'[InlineAssets] Using polling fallback for WordPress integration'
	);
	const lastModified: Record<string, number> = {};

	const viteServerUrl = getViteServerUrl();
	console.log(
		'[InlineAssets] Polling Vite server at:',
		viteServerUrl || 'same origin'
	);

	async function pollForChanges(): Promise<void> {
		try {
			const statusUrl = `${viteServerUrl}/__vite_inline_content/status`;
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
							blockNamespace
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
	blockNamespace: string
): void {
	try {
		const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
		let wsUrl: string;

		if (location.hostname === 'block-theme.local') {
			// Connect directly to Vite's dev server port
			wsUrl = `${protocol}//block-theme.local:5173`;
		} else {
			// Fallback to current host if not on the known domain
			const port = location.port || '5173';
			wsUrl = `${protocol}//${location.hostname}:${port}`;
		}

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
						blockNamespace
					);
				}
			} catch (e) {
				// Ignore non-JSON messages
			}
		});

		ws.addEventListener('error', () => {
			// Expected in WordPress + Vite setups - don't log as error
		});

		ws.addEventListener('close', () => {
			// Expected in WordPress + Vite setups - don't log
		});
	} catch (error) {
		// Expected in WordPress + Vite setups - don't log
	}
}

/**
 * Setup Vite HMR context (third option)
 */
export function setupViteContextHMR(
	blockAssets: Map<string, BlockAssetInfo>,
	blockNamespace: string
): void {
	// Check for Vite HMR by looking for window.__viteHotContext
	if (typeof window !== 'undefined' && (window as any).__viteHotContext) {
		console.log('[InlineAssets] Using Vite HMR context');
		try {
			(window as any).__viteHotContext.on(
				'inline-asset-update',
				({ asset }: { asset: string }) => {
					updateInlineAsset(asset, blockAssets, blockNamespace);
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

	const { blockAssets, blockNamespace, pollingInterval } = config;

	// Method 1: Polling (most reliable for WordPress + Vite)
	setupPollingHMR(blockAssets, blockNamespace, pollingInterval);

	// Method 2: WebSocket (secondary option)
	setupWebSocketHMR(blockAssets, blockNamespace);

	// Method 3: Vite context (third option)
	setupViteContextHMR(blockAssets, blockNamespace);

	console.log('[InlineAssets] HMR setup complete');
	return true;
}
