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
									const buildCssPath = path.join(
										blockBuildDir,
										cssFile
									).replace(/\\/g, '/');

									if (fs.existsSync(sourceCssPath)) {
										const assetKey = `${blockSlug}-${cssFile.replace('.css', '')}`;
										blockAssets.set(assetKey, {
											buildPath: buildCssPath,
											sourcePath: sourceCssPath.replace(/\\/g, '/'),
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

if (import.meta.hot) {
	console.log('[InlineAssets] HMR available');
	
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
			const response = await fetch('/__vite_inline_content/' + assetPath);
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

	// Listen for inline asset updates
	import.meta.hot.on('inline-asset-update', ({ asset }) => {
		updateInlineAsset(asset);
	});
} else {
	console.warn('[InlineAssets] HMR not available');
}
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
