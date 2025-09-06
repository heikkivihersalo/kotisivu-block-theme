/**
 * Server Middleware Utilities
 *
 * Utilities for handling server-side HMR requests and asset serving.
 */

import fs from 'fs';
import path from 'path';
import type { BlockAssetInfo, AssetInfo } from '../types.js';
import {
	generateScript,
	generateModuleScript,
	generateExternalScript,
} from '../utils/script-templates.js';

/**
 * Serve the HMR client script
 */
export function createClientScriptMiddleware(
	getBlockAssets: () => Map<string, BlockAssetInfo>,
	blockNamespace: string,
	method: 'inline' | 'external' | 'module' = 'inline',
	pollingInterval = 500,
	options: {
		themePrefix?: string;
		viteServerUrl?: string;
		vitePort?: string;
	} = {}
): (req: any, res: any) => void {
	return (_req, res) => {
		res.setHeader('Content-Type', 'application/javascript');
		res.setHeader('Cache-Control', 'no-cache');

		// Get current block assets dynamically
		const blockAssets = getBlockAssets();

		const scriptConfig = {
			blockAssets,
			blockNamespace,
			pollingInterval,
			...options,
		};

		let clientScript: string;

		switch (method) {
			case 'external':
				clientScript = generateExternalScript(scriptConfig);
				break;
			case 'module':
				clientScript = generateModuleScript(scriptConfig);
				break;
			case 'inline':
			default:
				clientScript = generateScript('hmr-client', scriptConfig);
				break;
		}

		res.end(clientScript);
	};
}

/**
 * Create status endpoint middleware
 * Updated to work with new BuildMapResolver and asset structures
 */
export function createStatusMiddleware(
	getAllMonitoredAssets: () => string[],
	blockAssets: Map<string, BlockAssetInfo>,
	generalAssets?: Map<string, AssetInfo>
): (req: any, res: any, next: any) => void {
	return async (req, res, next) => {
		if (req.url !== '/__vite_inline_content/status') {
			return next();
		}

		const allAssets = getAllMonitoredAssets();
		const status: Record<string, number> = {};

		for (const asset of allAssets) {
			try {
				let fullPath = path.resolve(asset);

				// Check block assets if direct path doesn't exist
				if (!fs.existsSync(fullPath)) {
					for (const [, assetInfo] of blockAssets) {
						// Check all build paths in the block asset
						for (const buildPath of Object.values(
							assetInfo.build
						)) {
							if (
								buildPath.endsWith(asset) ||
								buildPath === asset
							) {
								fullPath = fs.existsSync(buildPath)
									? buildPath
									: Object.values(assetInfo.src)[0] || ''; // Fallback to first source
								break;
							}
						}
						if (fs.existsSync(fullPath)) break;
					}
				}

				// Check general assets if still not found
				if (!fs.existsSync(fullPath) && generalAssets) {
					for (const [, assetInfo] of generalAssets) {
						if (
							assetInfo.buildPath.endsWith(asset) ||
							assetInfo.buildPath === asset
						) {
							fullPath = fs.existsSync(assetInfo.buildPath)
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
	};
}

/**
 * Create asset content middleware
 * Updated to work with new BuildMapResolver and asset structures
 */
export function createAssetContentMiddleware(
	getAllMonitoredAssets: () => string[],
	blockAssets: Map<string, BlockAssetInfo>,
	generalAssets?: Map<string, AssetInfo>
): (req: any, res: any, next: any) => void {
	return async (req, res, next) => {
		// Only handle our specific inline content endpoint
		if (!req.url?.startsWith('/__vite_inline_content/')) {
			return next();
		}

		const assetPath = req.url.replace('/__vite_inline_content/', '');

		if (!assetPath) {
			return next();
		}

		const allAssets = getAllMonitoredAssets();
		const isValidAsset = allAssets.some(
			(asset) => assetPath === asset || asset.endsWith(assetPath)
		);

		if (!isValidAsset) {
			console.log('[DevServer] Invalid asset requested:', assetPath);
			res.statusCode = 404;
			res.end('Asset not found');
			return;
		}

		try {
			// Try to find the actual file path
			let fullPath = '';

			// First, try direct resolution
			const directPath = path.resolve(assetPath);
			if (fs.existsSync(directPath)) {
				fullPath = directPath;
			}

			// If not found directly, check block assets
			if (!fullPath) {
				for (const [, assetInfo] of blockAssets) {
					// Check all build paths in the block asset
					for (const buildPath of Object.values(assetInfo.build)) {
						// Try exact match first
						if (buildPath === assetPath) {
							fullPath = path.resolve(buildPath);
							break;
						}
						// Try relative path match
						if (buildPath.endsWith(assetPath)) {
							fullPath = path.resolve(buildPath);
							break;
						}
						// Try if assetPath ends with buildPath
						if (assetPath.endsWith(buildPath)) {
							fullPath = path.resolve(buildPath);
							break;
						}
					}
					if (fullPath && fs.existsSync(fullPath)) break;
				}
			}

			// Check general assets if still not found
			if (!fullPath && generalAssets) {
				for (const [, assetInfo] of generalAssets) {
					// Try exact match first
					if (assetInfo.buildPath === assetPath) {
						fullPath = path.resolve(assetInfo.buildPath);
						break;
					}
					// Try relative path match
					if (assetInfo.buildPath.endsWith(assetPath)) {
						fullPath = path.resolve(assetInfo.buildPath);
						break;
					}
					// Try if assetPath ends with buildPath
					if (assetPath.endsWith(assetInfo.buildPath)) {
						fullPath = path.resolve(assetInfo.buildPath);
						break;
					}
				}
			}

			if (fullPath && fs.existsSync(fullPath)) {
				const content = fs.readFileSync(fullPath, 'utf-8');

				// Set appropriate content type based on file extension
				const ext = path.extname(fullPath).toLowerCase();
				const contentType =
					ext === '.js' ||
					ext === '.ts' ||
					ext === '.jsx' ||
					ext === '.tsx'
						? 'application/javascript'
						: 'text/css';

				res.setHeader('Content-Type', contentType);
				res.end(content);
			} else {
				console.log('[DevServer] Asset not found:', assetPath);
				console.log('[DevServer] Tried path:', fullPath);
				console.log(
					'[DevServer] Available block assets:',
					Array.from(blockAssets.values()).map((a) =>
						Object.values(a.build)
					)
				);
				res.statusCode = 404;
				res.end('Asset not found');
			}
		} catch (error) {
			console.error('[DevServer] Error serving asset:', error);
			res.statusCode = 500;
			res.end('Internal server error');
		}
	};
}
