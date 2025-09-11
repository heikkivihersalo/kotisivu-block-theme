/**
 * Asset Content Middleware
 *
 * Serves asset content for HMR updates.
 */

import fs from 'fs';
import type { BlockAssetInfo, AssetInfo } from '../types.js';
import { findAssetPath } from './utils/asset-utils.js';
import { BaseMiddleware } from '../../../common/abstracts/BaseMiddleware.js';

/**
 * Asset Content Middleware Class
 */
export class AssetContentMiddleware extends BaseMiddleware {
	protected routePattern = /^\/__dev-server\/asset-content/;

	constructor(
		private getAllMonitoredAssets: () => string[],
		private blockAssets: Map<string, BlockAssetInfo>,
		private generalAssets?: Map<string, AssetInfo>,
		private serverConfig?: {
			host?: string;
			port?: number;
			protocol?: 'http' | 'https';
		}
	) {
		super();
	}

	async handle(req: any, res: any): Promise<void> {
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
		} else if (this.serverConfig?.host) {
			// Construct from server config
			const configProtocol = this.serverConfig.protocol || 'https';
			const configPort = this.serverConfig.port || 5173;
			baseUrl = `${configProtocol}://${this.serverConfig.host}:${configPort}`;
		} else {
			// Final fallback
			baseUrl = 'http://127.0.0.1:5173';
		}

		const url = new URL(req.url, baseUrl);
		const assetPath = url.searchParams.get('path');

		if (!assetPath) {
			this.sendBadRequest(res, 'Missing path parameter');
			return;
		}

		// Validate asset is monitored
		const allAssets = this.getAllMonitoredAssets();
		const isValidAsset = allAssets.some(
			(asset) => assetPath === asset || asset.endsWith(assetPath)
		);

		if (!isValidAsset) {
			this.logInfo('Invalid asset requested:', assetPath);
			this.sendNotFound(res, 'Asset not found');
			return;
		}

		const fullPath = findAssetPath(
			assetPath,
			this.blockAssets,
			this.generalAssets
		);

		if (fullPath && fs.existsSync(fullPath)) {
			const content = fs.readFileSync(fullPath, 'utf-8');
			const contentType = this.getContentTypeFromExtension(fullPath);

			this.setCommonHeaders(res, contentType);
			res.end(content);
		} else {
			this.logInfo('Asset not found:', assetPath);
			this.sendNotFound(res, 'Asset not found');
		}
	}
}
