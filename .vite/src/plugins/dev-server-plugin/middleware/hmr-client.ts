/**
 * HMR Client Middleware
 *
 * Serves the HMR client JavaScript file.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
				'../client/client-entry.js'
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
