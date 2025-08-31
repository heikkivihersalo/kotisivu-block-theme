/**
 * HMR Client Template
 *
 * This template is used to generate the client-side HMR script.
 * Configuration will be injected via __VITE_INLINE_ASSETS_CONFIG__.
 */

console.log('[InlineAssets] HMR client loaded');

// Configuration will be available in the global scope
const CONFIG = window.__VITE_INLINE_ASSETS_CONFIG__ || {
	blockAssets: [],
	blockNamespace: 'wp',
	pollingInterval: 500,
	viteServerUrl: undefined
};

/**
 * Generate WordPress style ID from asset path
 */
function getStyleIdFromAsset(assetPath) {
	const blockAssets = new Map(CONFIG.blockAssets);

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
			return (
				CONFIG.blockNamespace +
				'-' +
				assetInfo.blockSlug +
				'-' +
				cssType +
				'-inline-css'
			);
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
	return assetId + '-inline-css';
}

/**
 * Get Vite server URL
 */
function getViteServerUrl() {
	if (CONFIG.viteServerUrl) {
		return CONFIG.viteServerUrl;
	}

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
	return protocol + '//' + location.hostname + ':5173';
}

/**
 * Update inline styles with new content
 */
async function updateInlineAsset(assetPath) {
	try {
		const viteServerUrl = getViteServerUrl();
		const contentUrl =
			viteServerUrl + '/__vite_inline_content/' + assetPath;
		const response = await fetch(contentUrl);

		if (response.ok) {
			const newContent = await response.text();
			const styleId = getStyleIdFromAsset(assetPath);

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
						styleElement = style;
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
function setupPollingHMR() {
	console.log(
		'[InlineAssets] Using polling fallback for WordPress integration'
	);
	const lastModified = {};

	const viteServerUrl = getViteServerUrl();
	console.log(
		'[InlineAssets] Polling Vite server at:',
		viteServerUrl || 'same origin'
	);

	async function pollForChanges() {
		try {
			const statusUrl = viteServerUrl + '/__vite_inline_content/status';
			const response = await fetch(statusUrl);
			if (response.ok) {
				const status = await response.json();
				for (const [asset, modified] of Object.entries(status)) {
					if (
						lastModified[asset] &&
						lastModified[asset] !== modified
					) {
						await updateInlineAsset(asset);
					}
					lastModified[asset] = modified;
				}
			}
		} catch (error) {
			// Silently fail for polling - this is expected when files don't exist yet
		}
	}

	setInterval(pollForChanges, CONFIG.pollingInterval || 500);
}

/**
 * Setup WebSocket-based HMR (secondary option)
 */
function setupWebSocketHMR() {
	try {
		const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
		let wsUrl;

		if (location.hostname === 'block-theme.local') {
			wsUrl = protocol + '//block-theme.local:5173';
		} else {
			const port = location.port || '5173';
			wsUrl = protocol + '//' + location.hostname + ':' + port;
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
					updateInlineAsset(data.data.asset);
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
function setupViteContextHMR() {
	if (typeof window !== 'undefined' && window.__viteHotContext) {
		console.log('[InlineAssets] Using Vite HMR context');
		try {
			window.__viteHotContext.on('inline-asset-update', ({ asset }) => {
				updateInlineAsset(asset);
			});
		} catch (e) {
			console.warn('[InlineAssets] Failed to connect via Vite context');
		}
	}
}

/**
 * Initialize all HMR methods
 */
function initializeHMR() {
	// Method 1: Polling (most reliable for WordPress + Vite)
	setupPollingHMR();

	// Method 2: WebSocket (secondary option)
	setupWebSocketHMR();

	// Method 3: Vite context (third option)
	setupViteContextHMR();

	console.log('[InlineAssets] HMR setup complete');
}

// Start HMR
initializeHMR();
