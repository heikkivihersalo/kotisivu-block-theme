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
 * Inline Assets			// Serve inline asset content
			server.middlewares.use(
				'/__vite_inline_content',
				async (req, res, next) => {
					const assetPath = req.url?.replace(
						/^\/__vite_inline_content\/?/,
						''
					);

					if (!assetPath) {
						return next();
					}HMR support in WordPress
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
									const buildCssPath = path.join(
										blockBuildDir,
										cssFile
									);

									if (fs.existsSync(sourceCssPath)) {
										const assetKey = `${blockSlug}-${cssFile.replace('.css', '')}`;
										blockAssets.set(assetKey, {
											buildPath: buildCssPath,
											sourcePath: sourceCssPath,
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
				const allAssets = getAllMonitoredAssets();
				res.setHeader('Content-Type', 'application/javascript');
				res.end(`
console.log('[InlineAssets] Script loaded successfully!');
console.log('[InlineAssets] Assets to monitor:', ${JSON.stringify(allAssets)});

if (import.meta.hot) {
	console.log('[InlineAssets] HMR is available!');
	
	// Find all current style tags
	const styleElements = document.querySelectorAll('style[id*="-inline-css"], style[id*="-css"]');
	console.log('[InlineAssets] Found style elements:', Array.from(styleElements).map(s => s.id));
	
	// Listen for changes
	import.meta.hot.on('inline-asset-update', ({ asset }) => {
		console.log('[InlineAssets] Asset updated:', asset);
	});
} else {
	console.warn('[InlineAssets] HMR not available');
}
			`);
					
					// Function to generate WordPress style ID from asset path
					function getStyleIdFromAsset(assetPath) {
						console.log('[InlineAssets] Generating style ID for:', assetPath);
						
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
								const styleId = blockNamespace + '-' + assetInfo.blockSlug + '-' + cssType + '-inline-css';
								console.log('[InlineAssets] Block asset style ID:', styleId);
								return styleId;
							}
						}
						
						// Handle theme inline assets
						if (assetPath.includes('sanitize.css')) {
							return 'kotisivu-sanitize-css-inline-css';
						} else if (assetPath.includes('inline.css')) {
							return 'kotisivu-inline-css-inline-css';
						} else if (assetPath.includes('tailwind-utilities.css')) {
							return 'kotisivu-tailwind-utility-css-inline-css';
						}
						
						// Fallback for other assets
						const assetId = assetPath.replace(/[^a-zA-Z0-9]/g, '-');
						const styleId = assetId + '-inline-css';
						console.log('[InlineAssets] Fallback style ID:', styleId);
						return styleId;
					}

					// Function to update inline styles
					async function updateInlineAsset(assetPath) {
						try {
							console.log('[InlineAssets] Updating asset:', assetPath);
							const response = await fetch('/__vite_inline_content/' + assetPath);
							if (response.ok) {
								const newContent = await response.text();
								const styleId = getStyleIdFromAsset(assetPath);
								
								console.log('[InlineAssets] Looking for style element with ID:', styleId);
								
								// Find the corresponding style tag by exact ID
								const styleElement = document.getElementById(styleId);
								if (styleElement) {
									if (styleElement.textContent !== newContent) {
										styleElement.textContent = newContent;
										console.log('[HMR] ✅ Updated inline asset:', assetPath, '(ID:', styleId, ')');
									} else {
										console.log('[HMR] ⚠️ Content unchanged for:', assetPath);
									}
									return;
								}
								
								// Fallback: try to find by pattern matching
								console.log('[InlineAssets] Exact ID not found, trying pattern matching...');
								const styleElements = document.querySelectorAll('style[id*="-inline-css"], style[id*="-css"]');
								let updated = false;
								const assetName = assetPath.split('/').pop()?.replace('.css', '') || '';
								
								styleElements.forEach(style => {
									if (style.id.includes(assetName)) {
										if (style.textContent !== newContent) {
											style.textContent = newContent;
											console.log('[HMR] ✅ Updated inline asset (pattern match):', assetPath, '(ID:', style.id, ')');
											updated = true;
										}
									}
								});
								
								if (!updated) {
									console.warn('[HMR] ❌ Could not find style element for:', assetPath);
									console.warn('Expected ID:', styleId);
									console.warn('Available style IDs:', Array.from(styleElements).map(s => s.id));
								}
							} else {
								console.error('[InlineAssets] Failed to fetch asset:', response.status, response.statusText);
							}
						} catch (error) {
							console.warn('[HMR] Failed to update inline asset', assetPath, ':', error);
						}
					}

					// Listen for inline asset updates
					if (import.meta.hot.on) {
						import.meta.hot.on('inline-asset-update', ({ asset }) => {
							console.log('[InlineAssets] Received HMR update for:', asset);
							updateInlineAsset(asset);
						});
					}
				} else {
					console.warn('[InlineAssets] HMR not available - import.meta.hot is undefined');
					console.log('[InlineAssets] This might be because:');
					console.log('1. Vite client script is not loaded');
					console.log('2. Script is not running as ES module');
					console.log('3. Development environment is not properly configured');
				}
			`);
			}); // Serve inline asset content
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
						`[InlineAssets] Invalid asset requested: ${assetPath}`
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
						res.end('Asset not found');
					}
				} catch (error) {
					res.statusCode = 500;
					res.end('Error reading asset');
				}
			});
		},

		buildStart() {
			// Discover block assets first
			discoverBlockAssets();

			// Add watch patterns for inline assets
			watchPatterns.forEach((pattern: string) => {
				// Convert glob pattern to actual files for watching
				this.addWatchFile(pattern);
			});

			// Add specific inline asset files to watch
			inlineAssets.forEach((asset: string) => {
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
			const isInlineAsset = inlineAssets.some((asset: string) => {
				const fullPath = path.resolve(asset);
				return file === fullPath || file.endsWith(asset);
			});

			// Check if the changed file is a block CSS file
			const isBlockAsset = Array.from(blockAssets.values()).some(
				(assetInfo) =>
					file === assetInfo.sourcePath ||
					file === assetInfo.buildPath
			);

			const isSourceFile = watchPatterns.some((pattern: string) => {
				// Simple pattern matching - in production you might want to use a glob library
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
						inlineAssets.find((asset: string) => {
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
					// For source files, we need to determine which built asset they affect
					// This is a simplified mapping - you might need more sophisticated logic
					if (file.includes('sanitize')) {
						affectedAsset = 'build/app/sanitize.css';
					} else if (file.includes('tailwind')) {
						affectedAsset = 'build/app/tailwind-utilities.css';
					} else {
						affectedAsset = 'build/app/inline.css';
					}
				}

				if (affectedAsset) {
					// Send HMR update for inline asset
					hotServer.ws.send({
						type: 'custom',
						event: 'inline-asset-update',
						data: { asset: affectedAsset },
					});

					console.log(`[HMR] Inline asset updated: ${affectedAsset}`);
				}

				// Return empty array to prevent default HMR behavior
				return [];
			}
		},
	};
}

export type { InlineAssetsConfig } from './types.js';
