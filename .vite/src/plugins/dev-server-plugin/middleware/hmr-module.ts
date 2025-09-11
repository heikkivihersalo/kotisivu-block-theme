/**
 * HMR Module Middleware
 *
 * Serves individual HMR client modules.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { BaseMiddleware } from '../../../common/abstracts/BaseMiddleware.js';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * HMR Module Middleware Class
 */
export class HMRModuleMiddleware extends BaseMiddleware {
	protected routePattern = /^\/(?:HMRClient\.js|handlers\/\w+\.js)$/;

	private readonly moduleRoutes = {
		'/HMRClient.js': '../client/HMRClient.js',
		'/handlers/InlineCSSHandler.js':
			'../client/handlers/InlineCSSHandler.js',
		'/handlers/CSSFileHandler.js': '../client/handlers/CSSFileHandler.js',
		'/handlers/JSFileHandler.js': '../client/handlers/JSFileHandler.js',
	};

	protected matches(url: string): boolean {
		return url in this.moduleRoutes;
	}

	handle(req: any, res: any): void {
		// Check if the request matches any of our module routes
		const relativePath =
			this.moduleRoutes[req.url as keyof typeof this.moduleRoutes];

		if (!relativePath) {
			this.sendNotFound(res, 'Module not found');
			return;
		}

		// Get the path to the requested module file
		const modulePath = path.resolve(__dirname, relativePath);

		// Set CORS header for modules
		res.setHeader('Access-Control-Allow-Origin', '*');

		this.sendFileContent(res, modulePath, 'application/javascript');
	}
}
