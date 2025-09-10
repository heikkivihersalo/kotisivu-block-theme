/**
 * HMR Module Middleware
 *
 * Serves individual HMR client modules.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Create middleware for serving individual HMR client modules
 */
export function createHMRModuleMiddleware(): (
	req: any,
	res: any,
	next: any
) => void {
	return (req, res, next) => {
		// Define the client module routes
		const moduleRoutes = {
			'/HMRClient.js': '../client/HMRClient.js',
			'/handlers/InlineCSSHandler.js':
				'../client/handlers/InlineCSSHandler.js',
			'/handlers/CSSFileHandler.js':
				'../client/handlers/CSSFileHandler.js',
			'/handlers/JSFileHandler.js': '../client/handlers/JSFileHandler.js',
		};

		// Check if the request matches any of our module routes
		const relativePath = moduleRoutes[req.url as keyof typeof moduleRoutes];
		if (!relativePath) {
			return next();
		}

		try {
			// Get the path to the requested module file
			const modulePath = path.resolve(__dirname, relativePath);

			if (fs.existsSync(modulePath)) {
				// Read the module file content
				const content = fs.readFileSync(modulePath, 'utf-8');

				res.setHeader('Content-Type', 'application/javascript');
				res.setHeader('Cache-Control', 'no-cache');
				res.setHeader('Access-Control-Allow-Origin', '*');
				res.end(content);
			} else {
				console.warn(
					'[DevServer] HMR module file not found:',
					modulePath
				);
				res.statusCode = 404;
				res.end('Module not found');
			}
		} catch (error) {
			console.error('[DevServer] Error serving HMR module:', error);
			res.statusCode = 500;
			res.end('Internal server error');
		}
	};
}
