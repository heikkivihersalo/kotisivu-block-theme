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

			// Check general assets if still not found
			if (!fs.existsSync(fullPath) && generalAssets) {
				for (const [, assetInfo] of generalAssets) {
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
			console.error('[DevServer] Error serving asset:', error);
			res.statusCode = 500;
			res.end('Internal server error');
		}
	};
}
