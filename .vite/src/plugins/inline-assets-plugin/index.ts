/**
 * External dependencies
 */
import type { Plugin, ViteDevServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

/**
 * Internal dependencies
 */
import type { InlineAssetsConfig } from './types.js';

/**
 * Inline Assets Plugin for HMR support in WordPress
 *
 * This plugin monitors inline CSS files and triggers browser updates when they change.
 * It works by injecting a client-side script that polls for changes to inline assets
 * and applies them automatically during development.
 */
export function InlineAssetsPlugin(config: InlineAssetsConfig = {}): Plugin {
	const {
		inlineAssets = ['build/assets/sanitize.css', 'build/assets/inline.css'],
		watchPatterns = [
			'src/app/styles/inline/**/*.css',
			'resources/app/styles/inline/**/*.css',
		],
		blocksConfig = {},
	} = config;

	const {
		blocksDir = {},
		outDir = 'build',
		blockNamespace = 'ksd',
	} = blocksConfig;

	let server: ViteDevServer;
	const watchedFiles = new Set<string>();
	const blockAssets = new Map<
		string,
		{ buildPath: string; sourcePath: string; blockSlug: string }
	>();

	/**
	 * Discover blocks and their CSS assets dynamically
	 */
	function discoverBlockAssets(): void {
		blockAssets.clear();

		Object.entries(blocksDir).forEach(([buildKey, sourcePath]) => {
			try {
				// Find all block.json files in the source directory
				const blockJsonFiles = glob.sync('**/block.json', {
					cwd: sourcePath as string,
					absolute: false,
				});

				blockJsonFiles.forEach((blockJsonPath) => {
					const fullBlockJsonPath = path.join(
						sourcePath as string,
						blockJsonPath
					);

					if (fs.existsSync(fullBlockJsonPath)) {
						try {
							const blockJson = JSON.parse(
								fs.readFileSync(fullBlockJsonPath, 'utf-8')
							);
							const blockName = blockJson.name;

							if (blockName && blockName.includes('/')) {
								// Extract block slug from name (e.g., 'ksd/part-logo' -> 'part-logo')
								const blockSlug = blockName.split('/')[1];
								const blockDir = path.dirname(blockJsonPath);

								// Check for style.css or other CSS files in the block directory
								const blockSourceDir = path.join(
									sourcePath as string,
									blockDir
								);
								const blockBuildDir = path.join(
									outDir,
									buildKey,
									blockDir
								);

								// Look for CSS files that could be used as inline styles
								const cssFiles = [
									'style.css',
									'index.css',
									'style-index.css',
								];

								cssFiles.forEach((cssFile) => {
									const sourceCssPath = path.join(
										blockSourceDir,
										cssFile
									);
									const buildCssPath = path
										.join(blockBuildDir, cssFile)
										.replace(/\\/g, '/');

									if (fs.existsSync(sourceCssPath)) {
										const assetKey = `${blockSlug}-${cssFile.replace('.css', '')}`;
										blockAssets.set(assetKey, {
											buildPath: buildCssPath,
											sourcePath: sourceCssPath.replace(
												/\\/g,
												'/'
											),
											blockSlug: blockSlug,
										});
									}
								});
							}
						} catch (error) {
							console.warn(
								`[InlineAssets] Error parsing block.json at ${fullBlockJsonPath}:`,
								error
							);
						}
					}
				});
			} catch (error) {
				console.warn(
					`[InlineAssets] Error discovering blocks in ${sourcePath}:`,
					error
				);
			}
		});

		console.log(
			`[InlineAssets] Discovered ${blockAssets.size} block CSS assets for HMR`
		);
	}

	/**
	 * Get all monitored assets (static + dynamic blocks)
	 */
	function getAllMonitoredAssets(): string[] {
		const dynamicAssets = Array.from(blockAssets.values()).map(
			(asset) => asset.buildPath
		);
		return [...inlineAssets, ...dynamicAssets];
	}

	return {
		name: 'vite-wordpress-inline-assets',
		enforce: 'post',

		configureServer(viteServer: ViteDevServer) {
			server = viteServer;

			// Discover block assets on server start
			discoverBlockAssets();

			// Add inline assets client script
			server.middlewares.use('/__vite_inline_assets', (_req, res) => {
				res.setHeader('Content-Type', 'application/javascript');
				res.setHeader('Cache-Control', 'no-cache');

				const clientScript = `
console.log('[InlineAssets] HMR client loaded');

// Function to generate WordPress style ID from asset path
function getStyleIdFromAsset(assetPath) {
	const blockAssets = new Map(${JSON.stringify(Array.from(blockAssets.entries()))});
	
	// Check if it's a block asset
	for (const [assetKey, assetInfo] of blockAssets) {
		if (assetPath.includes(assetInfo.blockSlug)) {
			// Determine CSS type from path
			let cssType = 'style';
			if (assetPath.includes('index.css')) {
				cssType = 'index';
			} else if (assetPath.includes('style-index.css')) {
				cssType = 'style-index';
			}
			return '${blockNamespace}-' + assetInfo.blockSlug + '-' + cssType + '-inline-css';
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

// Function to update inline styles
async function updateInlineAsset(assetPath) {
	try {
		// Determine the correct Vite server URL
		const viteServerUrl = (function() {
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
		})();
		
		const contentUrl = viteServerUrl + '/__vite_inline_content/' + assetPath;
		const response = await fetch(contentUrl);
		if (response.ok) {
			const newContent = await response.text();
			const styleId = getStyleIdFromAsset(assetPath);
			
			// Find the corresponding style tag by exact ID
			let styleElement = document.getElementById(styleId);
			
			// If exact ID not found, try pattern matching
			if (!styleElement) {
				const styleElements = document.querySelectorAll('style[id*="-inline-css"], style[id*="-css"]');
				const assetName = assetPath.split('/').pop()?.replace('.css', '') || '';
				
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

// Try to connect to Vite's HMR via multiple methods
function setupHMR() {
	// Method 1: Use polling for WordPress + Vite setup (most reliable)
	console.log('[InlineAssets] Using polling fallback for WordPress integration');
	let lastModified = {};
	
	// Determine the correct Vite server URL for polling
	const viteServerUrl = (function() {
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
	})();
	
	console.log('[InlineAssets] Polling Vite server at:', viteServerUrl || 'same origin');
	
	async function pollForChanges() {
		try {
			const statusUrl = viteServerUrl + '/__vite_inline_content/status';
			const response = await fetch(statusUrl);
			if (response.ok) {
				const status = await response.json();
				for (const [asset, modified] of Object.entries(status)) {
					if (lastModified[asset] && lastModified[asset] !== modified) {
						updateInlineAsset(asset);
					}
					lastModified[asset] = modified;
				}
			}
		} catch (error) {
			// Silently fail for polling - this is expected when files don't exist yet
		}
	}
	
	// Poll every 500ms for responsive updates
	setInterval(pollForChanges, 500);
	
	// Method 2: Try WebSocket connection as secondary option
	// Note: This typically won't work in WordPress + Vite setups due to CORS/proxy issues
	// but we'll try it quietly in case the setup supports it
	try {
		const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
		// For Vite dev server, we need to connect to the actual Vite port (5173)
		// not the proxy port that might be serving the page
		let wsUrl;
		if (location.hostname === 'block-theme.local') {
			// Connect directly to Vite's dev server port
			wsUrl = protocol + '//block-theme.local:5173';
		} else {
			// Fallback to current host if not on the known domain
			const port = location.port || '5173';
			wsUrl = protocol + '//' + location.hostname + ':' + port;
		}
		
		// Try WebSocket connection silently
		const ws = new WebSocket(wsUrl, 'vite-hmr');
		
		ws.addEventListener('open', () => {
			console.log('[InlineAssets] WebSocket connected - will use for instant updates');
		});
		
		ws.addEventListener('message', (event) => {
			try {
				const data = JSON.parse(event.data);
				if (data.type === 'custom' && data.event === 'inline-asset-update') {
					updateInlineAsset(data.data.asset);
				}
			} catch (e) {
				// Ignore non-JSON messages
			}
		});
		
		ws.addEventListener('error', (error) => {
			// Expected in WordPress + Vite setups - don't log as error
		});
		
		ws.addEventListener('close', () => {
			// Expected in WordPress + Vite setups - don't log
		});
		
	} catch (error) {
		// Expected in WordPress + Vite setups - don't log
	}

	// Method 3: Check for Vite HMR by looking for window.__viteHotContext
	// This is safer than checking import.meta directly
	if (typeof window !== 'undefined' && window.__viteHotContext) {
		console.log('[InlineAssets] Using Vite HMR context');
		// Connect to Vite's HMR through the window context
		try {
			window.__viteHotContext.on('inline-asset-update', ({ asset }) => {
				updateInlineAsset(asset);
			});
		} catch (e) {
			console.warn('[InlineAssets] Failed to connect via Vite context');
		}
	}
	
	return true;
}

// Initialize HMR
const hmrConnected = setupHMR();
console.log('[InlineAssets] HMR setup complete');
`;

				res.end(clientScript);
			});

			// Serve inline asset content
			server.middlewares.use(async (req, res, next) => {
				// Handle status endpoint for polling fallback
				if (req.url === '/__vite_inline_content/status') {
					const allAssets = getAllMonitoredAssets();
					const status: Record<string, number> = {};

					for (const asset of allAssets) {
						try {
							let fullPath = path.resolve(asset);

							// Check block assets if direct path doesn't exist
							if (!fs.existsSync(fullPath)) {
								for (const [, assetInfo] of blockAssets) {
									if (
										assetInfo.buildPath.endsWith(asset) ||
										assetInfo.buildPath === asset
									) {
										fullPath = fs.existsSync(
											assetInfo.buildPath
										)
											? assetInfo.buildPath
											: assetInfo.sourcePath;
										break;
									}
								}
							}

							if (fs.existsSync(fullPath)) {
								const stats = fs.statSync(fullPath);
								status[asset] = stats.mtime.getTime();
							}
						} catch (error) {
							// Skip assets that can't be read
						}
					}

					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify(status));
					return;
				}

				// Only handle our specific inline content endpoint
				if (!req.url?.startsWith('/__vite_inline_content/')) {
					return next();
				}

				const assetPath = req.url.replace(
					'/__vite_inline_content/',
					''
				);

				if (!assetPath) {
					return next();
				}

				const allAssets = getAllMonitoredAssets();
				const isValidAsset = allAssets.some(
					(asset) => assetPath === asset || asset.endsWith(assetPath)
				);

				if (!isValidAsset) {
					console.log(
						'[InlineAssets] Invalid asset requested:',
						assetPath
					);
					res.statusCode = 404;
					res.end('Asset not found');
					return;
				}

				try {
					// Try to find the actual file path
					let fullPath = path.resolve(assetPath);

					// If the direct path doesn't exist, check block assets
					if (!fs.existsSync(fullPath)) {
						for (const [, assetInfo] of blockAssets) {
							if (
								assetInfo.buildPath.endsWith(assetPath) ||
								assetInfo.buildPath === assetPath
							) {
								// In development, serve from source file if build doesn't exist
								fullPath = fs.existsSync(assetInfo.buildPath)
									? assetInfo.buildPath
									: assetInfo.sourcePath;
								break;
							}
						}
					}

					if (fs.existsSync(fullPath)) {
						const content = fs.readFileSync(fullPath, 'utf-8');
						res.setHeader('Content-Type', 'text/css');
						res.end(content);
					} else {
						res.statusCode = 404;
						res.end('File not found');
					}
				} catch (error) {
					console.error('[InlineAssets] Error serving asset:', error);
					res.statusCode = 500;
					res.end('Internal server error');
				}
			});
		},

		buildStart() {
			// Discover block assets first
			discoverBlockAssets();

			// Add watch patterns for inline assets
			watchPatterns.forEach((pattern) => {
				this.addWatchFile(pattern);
			});

			// Add specific inline asset files to watch
			inlineAssets.forEach((asset) => {
				const fullPath = path.resolve(asset);
				if (fs.existsSync(fullPath)) {
					this.addWatchFile(fullPath);
					watchedFiles.add(fullPath);
				}
			});

			// Add block source files to watch
			for (const [, assetInfo] of blockAssets) {
				this.addWatchFile(assetInfo.sourcePath);
				watchedFiles.add(assetInfo.sourcePath);
			}
		},

		handleHotUpdate({ file, server: hotServer }) {
			// Check if the changed file affects any inline assets
			const isInlineAsset = inlineAssets.some((asset) => {
				const fullPath = path.resolve(asset);
				return file === fullPath || file.endsWith(asset);
			});

			// Check if the changed file is a block CSS file
			const isBlockAsset = Array.from(blockAssets.values()).some(
				(assetInfo) =>
					file === assetInfo.sourcePath ||
					file === assetInfo.buildPath
			);

			// Check if it's a source file that affects inline assets
			const isSourceFile = watchPatterns.some((pattern) => {
				const regex = pattern
					.replace(/\*\*/g, '.*')
					.replace(/\*/g, '[^/]*');
				return new RegExp(regex).test(file);
			});

			if (isInlineAsset || isBlockAsset || isSourceFile) {
				// Determine which asset was affected
				let affectedAsset = '';

				if (isInlineAsset) {
					affectedAsset =
						inlineAssets.find((asset) => {
							const fullPath = path.resolve(asset);
							return file === fullPath || file.endsWith(asset);
						}) || '';
				} else if (isBlockAsset) {
					// Find the block asset that was changed
					for (const [, assetInfo] of blockAssets) {
						if (
							file === assetInfo.sourcePath ||
							file === assetInfo.buildPath
						) {
							affectedAsset = assetInfo.buildPath;
							break;
						}
					}
				} else {
					// For source files, determine which built asset they affect
					if (file.includes('sanitize')) {
						affectedAsset = 'build/assets/sanitize.css';
					} else if (file.includes('tailwind')) {
						affectedAsset = 'build/assets/tailwind-utilities.css';
					} else {
						affectedAsset = 'build/assets/inline.css';
					}
				}

				if (affectedAsset) {
					console.log(`[HMR] Inline asset updated: ${affectedAsset}`);

					// Send HMR update for inline asset
					hotServer.ws.send({
						type: 'custom',
						event: 'inline-asset-update',
						data: { asset: affectedAsset },
					});

					// Return empty array to prevent default HMR behavior
					return [];
				}
			}

			// Let Vite handle other files normally
			return undefined;
		},
	};
}

export type { InlineAssetsConfig } from './types.js';
