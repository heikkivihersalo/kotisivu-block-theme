/**
 * HMR Client Middleware
 *
 * Serves the HMR client JavaScript file.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { BaseMiddleware } from '../../../common/abstracts/BaseMiddleware.js';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * HMR Client Middleware Class
 */
export class HMRClientMiddleware extends BaseMiddleware {
	protected routePattern = '/__dev-server/hmr-client';

	handle(_req: any, res: any): void {
		// Get the path to the HMR client JavaScript file
		const hmrClientPath = path.resolve(
			__dirname,
			'../client/client-entry.js'
		);

		this.sendFileContent(res, hmrClientPath, 'application/javascript');
	}
}
