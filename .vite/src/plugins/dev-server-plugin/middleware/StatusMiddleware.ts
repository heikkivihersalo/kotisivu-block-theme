/**
 * Status Middleware
 *
 * Returns modification timestamps for monitored assets.
 */

import fs from 'fs';
import type { BlockAssetInfo, AssetInfo } from '../types.js';
import { findAssetPath } from '../utils/asset-utils.ts';
import { BaseMiddleware } from '../../../common/abstracts/BaseMiddleware.js';

/**
 * Status Middleware Class
 */
export class StatusMiddleware extends BaseMiddleware {
	protected routePattern = '/__dev-server/status';

	constructor(
		private getAllMonitoredAssets: () => string[],
		private blockAssets: Map<string, BlockAssetInfo>,
		private generalAssets?: Map<string, AssetInfo>
	) {
		super();
	}

	async handle(_req: any, res: any): Promise<void> {
		const allAssets = this.getAllMonitoredAssets();
		const status: Record<string, number> = {};

		for (const asset of allAssets) {
			try {
				const fullPath = findAssetPath(
					asset,
					this.blockAssets,
					this.generalAssets
				);

				if (fullPath && fs.existsSync(fullPath)) {
					const stats = fs.statSync(fullPath);
					status[asset] = stats.mtime.getTime();
				}
			} catch (error) {
				// Skip assets that can't be read
			}
		}

		this.setJsonHeaders(res);
		res.end(JSON.stringify(status));
	}
}
