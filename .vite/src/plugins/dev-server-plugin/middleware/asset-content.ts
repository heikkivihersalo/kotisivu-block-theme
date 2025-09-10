/**
 * Asset Content Middleware
 *
 * Serves asset content for HMR updates.
 */

import fs from 'fs';
import path from 'path';
import type { BlockAssetInfo, AssetInfo } from '../types.js';
import { findAssetPath } from '../utils/asset-utils.js';

/**
 * Create asset content middleware
 * Serves asset content for HMR updates
 */
export function createAssetContentMiddleware(
	getAllMonitoredAssets: () => string[],
	blockAssets: Map<string, BlockAssetInfo>,
	generalAssets?: Map<string, AssetInfo>,
	serverConfig?: { host?: string; port?: number; protocol?: 'http' | 'https' }
): (req: any, res: any, next: any) => void {
	return async (req, res, next) => {
		if (!req.url?.startsWith('/__dev-server/asset-content')) {
			return next();
		}

		// Parse the asset path from query parameter
		// Use the request host from headers for URL construction
		const host = req.headers.host;
		const protocol =
			req.headers['x-forwarded-proto'] ||
			(req.connection?.encrypted ? 'https' : 'http');

		let baseUrl: string;
		if (host) {
			// Construct from request headers
			baseUrl = `${protocol}://${host}`;
		} else if (serverConfig?.host) {
			// Construct from server config
			const configProtocol = serverConfig.protocol || 'https';
			const configPort = serverConfig.port || 5173;
			baseUrl = `${configProtocol}://${serverConfig.host}:${configPort}`;
		} else {
			// Final fallback
			baseUrl = 'http://127.0.0.1:5173';
		}

		const url = new URL(req.url, baseUrl);
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
