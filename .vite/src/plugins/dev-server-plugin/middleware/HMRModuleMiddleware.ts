/**
 * HMR Module Middleware
 *
 * Serves individual HMR client modules.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { BaseMiddleware } from '../../../common/abstracts/BaseMiddleware.js';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * HMR Module Middleware Class
 */
export class HMRModuleMiddleware extends BaseMiddleware {
	protected routePattern =
		/^\/(?:HMRClient\.js|handlers\/\w+\.js|utils\/\w+\.js)$/;

	private readonly moduleRoutes = {
		'/HMRClient.js': '../client/HMRClient.js',
		'/handlers/BaseHandler.js': '../client/handlers/BaseHandler.js',
		'/handlers/InlineCSSHandler.js':
			'../client/handlers/InlineCSSHandler.js',
		'/handlers/CSSFileHandler.js': '../client/handlers/CSSFileHandler.js',
		'/handlers/JSFileHandler.js': '../client/handlers/JSFileHandler.js',
		'/utils/dom-utils.js': '../client/utils/dom-utils.js',
		'/utils/logger.js': '../client/utils/logger.js',
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

		try {
			// Read and transform the module content
			if (!fs.existsSync(modulePath)) {
				this.sendNotFound(res, 'Module file not found');
				return;
			}

			let content = fs.readFileSync(modulePath, 'utf-8');

			// Transform relative imports to absolute paths for all modules
			content = content
				.replace(
					/from '\.\/handlers\/BaseHandler\.js'/g,
					"from '/handlers/BaseHandler.js'"
				)
				.replace(
					/from '\.\/handlers\/InlineCSSHandler\.js'/g,
					"from '/handlers/InlineCSSHandler.js'"
				)
				.replace(
					/from '\.\/handlers\/CSSFileHandler\.js'/g,
					"from '/handlers/CSSFileHandler.js'"
				)
				.replace(
					/from '\.\/handlers\/JSFileHandler\.js'/g,
					"from '/handlers/JSFileHandler.js'"
				)
				.replace(
					/from '\.\/utils\/dom-utils\.js'/g,
					"from '/utils/dom-utils.js'"
				)
				.replace(
					/from '\.\/utils\/logger\.js'/g,
					"from '/utils/logger.js'"
				)
				.replace(
					/from '\.\/BaseHandler\.js'/g,
					"from '/handlers/BaseHandler.js'"
				)
				.replace(
					/from '\.\.\/utils\/dom-utils\.js'/g,
					"from '/utils/dom-utils.js'"
				)
				.replace(
					/from '\.\.\/utils\/logger\.js'/g,
					"from '/utils/logger.js'"
				);

			// Set headers
			res.setHeader('Content-Type', 'application/javascript');
			res.setHeader('Cache-Control', 'no-cache');
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.end(content);
		} catch (error) {
			this.logError('Error serving module:', error);
			this.sendInternalError(res);
		}
	}
}
