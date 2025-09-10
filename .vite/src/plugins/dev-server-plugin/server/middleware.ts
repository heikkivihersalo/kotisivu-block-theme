/**
 * Server Middleware Utilities
 *
 * Utilities for handling server-side HMR requests and asset serving.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { BlockAssetInfo, AssetInfo } from '../types.js';
import {
	generateScript,
	generateModuleScript,
	generateExternalScript,
} from '../utils/script-templates.js';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Find the actual file path for an asset
 */
function findAssetPath(
	assetPath: string,
	blockAssets: Map<string, BlockAssetInfo>,
	generalAssets?: Map<string, AssetInfo>
): string {
	// Try direct resolution first
	const directPath = path.resolve(assetPath);
	if (fs.existsSync(directPath)) {
		return directPath;
	}

	// Check block assets
	for (const [, assetInfo] of blockAssets) {
		for (const buildPath of Object.values(assetInfo.build)) {
			if (
				buildPath === assetPath ||
				buildPath.endsWith(assetPath) ||
				assetPath.endsWith(buildPath)
			) {
				const fullPath = path.resolve(buildPath);
				if (fs.existsSync(fullPath)) {
					return fullPath;
				}
			}
		}
	}

	// Check general assets
	if (generalAssets) {
		for (const [, assetInfo] of generalAssets) {
			if (
				assetInfo.buildPath === assetPath ||
				assetInfo.buildPath.endsWith(assetPath) ||
				assetPath.endsWith(assetInfo.buildPath)
			) {
				const fullPath = path.resolve(assetInfo.buildPath);
				if (fs.existsSync(fullPath)) {
					return fullPath;
				}
			}
		}
	}

	return '';
}

/**
 * Create HMR client middleware
 */
export function createHMRClientMiddleware(): (
	req: any,
	res: any,
	next: any
) => void {
	return (req, res, next) => {
		if (req.url !== '/__dev-server/hmr-client') {
			return next();
		}

		try {
			// Get the path to the HMR client JavaScript file
			const hmrClientPath = path.resolve(
				__dirname,
				'../client/hmr-client.js'
			);

			if (fs.existsSync(hmrClientPath)) {
				// Read the JavaScript file content
				const content = fs.readFileSync(hmrClientPath, 'utf-8');

				res.setHeader('Content-Type', 'application/javascript');
				res.setHeader('Cache-Control', 'no-cache');
				res.end(content);
			} else {
				console.warn(
					'[DevServer] HMR client file not found:',
					hmrClientPath
				);
				res.statusCode = 404;
				res.end('HMR client not found');
			}
		} catch (error) {
			console.error('[DevServer] Error serving HMR client:', error);
			res.statusCode = 500;
			res.end('Internal server error');
		}
	};
}

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
 * Returns modification timestamps for monitored assets
 */
export function createStatusMiddleware(
	getAllMonitoredAssets: () => string[],
	blockAssets: Map<string, BlockAssetInfo>,
	generalAssets?: Map<string, AssetInfo>
): (req: any, res: any, next: any) => void {
	return async (req, res, next) => {
		if (req.url !== '/__dev-server/status') {
			return next();
		}

		const allAssets = getAllMonitoredAssets();
		const status: Record<string, number> = {};

		for (const asset of allAssets) {
			try {
				const fullPath = findAssetPath(
					asset,
					blockAssets,
					generalAssets
				);

				if (fullPath && fs.existsSync(fullPath)) {
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
 * Serves asset content for HMR updates
 */
export function createAssetContentMiddleware(
	getAllMonitoredAssets: () => string[],
	blockAssets: Map<string, BlockAssetInfo>,
	generalAssets?: Map<string, AssetInfo>
): (req: any, res: any, next: any) => void {
	return async (req, res, next) => {
		if (!req.url?.startsWith('/__dev-server/asset-content')) {
			return next();
		}

		// Parse the asset path from query parameter
		const url = new URL(req.url, 'http://localhost');
		const assetPath = url.searchParams.get('path');

		if (!assetPath) {
			res.statusCode = 400;
			res.end('Missing path parameter');
			return;
		}

		// Validate asset is monitored
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
			const fullPath = findAssetPath(
				assetPath,
				blockAssets,
				generalAssets
			);

			if (fullPath && fs.existsSync(fullPath)) {
				const content = fs.readFileSync(fullPath, 'utf-8');
				const ext = path.extname(fullPath).toLowerCase();
				const contentType = ['.js', '.ts', '.jsx', '.tsx'].includes(ext)
					? 'application/javascript'
					: 'text/css';

				res.setHeader('Content-Type', contentType);
				res.end(content);
			} else {
				console.log('[DevServer] Asset not found:', assetPath);
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
