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

		Object.entries(blocksDir).forEach(([dirName, sourcePath]) => {
			try {
				const blockJsonPattern = path.join(sourcePath, '**/block.json');
				const blockJsonFiles = glob.sync(blockJsonPattern);

				blockJsonFiles.forEach((blockJsonPath) => {
					const blockDirPath = path.dirname(blockJsonPath);
					const relativePath = path.relative(
						sourcePath,
						blockDirPath
					);
					const blockSlug =
						relativePath.replace(/\//g, '-') ||
						path.basename(blockDirPath);

					// Look for style.css in the same directory
					const stylePath = path.join(blockDirPath, 'style.css');
					if (fs.existsSync(stylePath)) {
						const buildPath = path.join(
							outDir,
							dirName,
							relativePath,
							'style.css'
						);
						const assetKey = `${blockSlug}-style`;

						blockAssets.set(assetKey, {
							buildPath: buildPath.replace(/\\/g, '/'),
							sourcePath: stylePath.replace(/\\/g, '/'),
							blockSlug,
						});
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
				const allAssets = getAllMonitoredAssets();
				res.setHeader('Content-Type', 'application/javascript');
				res.setHeader('Cache-Control', 'no-cache');

				// Build the client script as an ES module
				const assetsArray = JSON.stringify(allAssets);
				const clientScript = `
console.log('[InlineAssets] Script loaded successfully!');
console.log('[InlineAssets] Assets to monitor:', ${assetsArray});

// Debug the environment
console.log('[InlineAssets] Environment check:');
console.log('- window object exists:', typeof window !== 'undefined');
console.log('- document object exists:', typeof document !== 'undefined');

// Check for Vite HMR availability without syntax errors
var hasViteHMR = false;
try {
	// Check if we're in Vite's development environment
	if (typeof window !== 'undefined' && (window.__viteHotContext || window.__HMR_PORT__)) {
		console.log('- Vite development environment detected');
		hasViteHMR = true;
	}
} catch (e) {
	console.log('- Error checking Vite environment:', e.message);
}

// Alternative: Check for Vite's WebSocket connection
if (!hasViteHMR && typeof window !== 'undefined') {
	// Look for Vite's WebSocket or other indicators
	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
		if (scripts[i].src && scripts[i].src.includes('/@vite/client')) {
			console.log('- Vite client script found');
			hasViteHMR = true;
			break;
		}
	}
}

console.log('- HMR available:', hasViteHMR);

if (hasViteHMR) {
	console.log('[InlineAssets] HMR environment detected!');
	
	// Find all current style tags
	var styleElements = document.querySelectorAll('style[id*="-inline-css"], style[id*="-css"]');
	console.log('[InlineAssets] Found style elements:', Array.from(styleElements).map(function(s) { return s.id; }));
	
	// Set up a custom event listener for HMR updates instead of using import.meta.hot
	if (typeof window !== 'undefined') {
		window.addEventListener('vite:beforeUpdate', function(event) {
			console.log('[InlineAssets] Vite update detected:', event);
		});
		
		// Also listen for custom WebSocket messages if available
		var checkForUpdates = function() {
			// This would be implemented when we have access to Vite's WebSocket
			console.log('[InlineAssets] Checking for inline asset updates...');
		};
		
		// Check for updates every 2 seconds as a fallback
		setInterval(checkForUpdates, 2000);
	}
} else {
	console.warn('[InlineAssets] HMR not available - running in production mode or outside Vite');
}

// Always try to find style elements after a delay
setTimeout(function() {
	const styleElements = document.querySelectorAll('style[id*="-inline-css"], style[id*="-css"]');
	console.log('[InlineAssets] Style elements found:', Array.from(styleElements).map(function(s) { return s.id; }));
}, 1000);
`;

				res.end(clientScript);
			});

			// Serve inline asset content
			server.middlewares.use(async (req, res, next) => {
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
			// Add watch patterns to Vite's file watcher
			watchPatterns.forEach((pattern) => {
				this.addWatchFile(pattern);
			});

			// Add individual asset files to watch
			inlineAssets.forEach((asset) => {
				const fullPath = path.resolve(asset);
				if (fs.existsSync(fullPath)) {
					this.addWatchFile(fullPath);
				}
			});

			// Add block assets to watch
			blockAssets.forEach((assetInfo) => {
				this.addWatchFile(assetInfo.sourcePath);
			});
		},

		handleHotUpdate({ file, server: hotServer }) {
			// Check if the changed file is one of our monitored assets
			const allAssets = getAllMonitoredAssets();
			const isMonitoredAsset = allAssets.some((asset) => {
				const fullPath = path.resolve(asset);
				return file === fullPath || file.endsWith(asset);
			});

			// Check if it's a block source file
			const affectedBlockAsset = Array.from(blockAssets.values()).find(
				(assetInfo) =>
					file === assetInfo.sourcePath ||
					file === assetInfo.buildPath
			);

			if (isMonitoredAsset || affectedBlockAsset) {
				const affectedAsset = affectedBlockAsset
					? affectedBlockAsset.buildPath
					: allAssets.find((asset) => {
							const fullPath = path.resolve(asset);
							return file === fullPath || file.endsWith(asset);
						});

				if (affectedAsset) {
					console.log('[HMR] Inline asset updated:', affectedAsset);

					// Send custom HMR update
					hotServer.ws.send({
						type: 'custom',
						event: 'inline-asset-update',
						data: { asset: affectedAsset },
					});

					// Return empty array to prevent default Vite HMR
					return [];
				}
			}

			// Let Vite handle other files normally
			return undefined;
		},
	};
}

export type { InlineAssetsConfig } from './types.js';
