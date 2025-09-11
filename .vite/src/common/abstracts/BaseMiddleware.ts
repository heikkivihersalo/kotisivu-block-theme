/**
 * Base Middleware Class
 *
 * Provides common functionality for all middleware classes.
 */

import fs from 'fs';
import path from 'path';

/**
 * Base middleware class
 */
export abstract class BaseMiddleware {
	protected abstract routePattern: string | RegExp;

	/**
	 * Check if the request matches this middleware's route
	 */
	protected matches(url: string): boolean {
		if (typeof this.routePattern === 'string') {
			return url === this.routePattern;
		}
		return this.routePattern.test(url);
	}

	/**
	 * Handle the request
	 */
	abstract handle(req: any, res: any): Promise<void> | void;

	/**
	 * Set common headers for development server responses
	 */
	protected setCommonHeaders(res: any, contentType: string): void {
		res.setHeader('Content-Type', contentType);
		res.setHeader('Cache-Control', 'no-cache');
	}

	/**
	 * Set JavaScript content headers
	 */
	protected setJavaScriptHeaders(res: any): void {
		this.setCommonHeaders(res, 'application/javascript');
	}

	/**
	 * Set JSON content headers
	 */
	protected setJsonHeaders(res: any): void {
		this.setCommonHeaders(res, 'application/json');
	}

	/**
	 * Set CSS content headers
	 */
	protected setCssHeaders(res: any): void {
		this.setCommonHeaders(res, 'text/css');
	}

	/**
	 * Determine content type based on file extension
	 */
	protected getContentTypeFromExtension(filePath: string): string {
		const ext = path.extname(filePath).toLowerCase();

		if (['.js', '.ts', '.jsx', '.tsx'].includes(ext)) {
			return 'application/javascript';
		}
		if (['.css', '.scss', '.sass', '.less'].includes(ext)) {
			return 'text/css';
		}
		if (['.json'].includes(ext)) {
			return 'application/json';
		}
		if (['.html', '.htm'].includes(ext)) {
			return 'text/html';
		}

		return 'text/plain';
	}

	/**
	 * Send a 404 not found response
	 */
	protected sendNotFound(res: any, message = 'Not found'): void {
		res.statusCode = 404;
		res.end(message);
	}

	/**
	 * Send a 400 bad request response
	 */
	protected sendBadRequest(res: any, message = 'Bad request'): void {
		res.statusCode = 400;
		res.end(message);
	}

	/**
	 * Send a 500 internal server error response
	 */
	protected sendInternalError(
		res: any,
		message = 'Internal server error'
	): void {
		res.statusCode = 500;
		res.end(message);
	}

	/**
	 * Read file content safely and send response
	 */
	protected sendFileContent(
		res: any,
		filePath: string,
		contentType?: string
	): boolean {
		try {
			if (!fs.existsSync(filePath)) {
				this.logWarning(`File not found: ${filePath}`);
				this.sendNotFound(res, 'File not found');
				return false;
			}

			const content = fs.readFileSync(filePath, 'utf-8');
			const finalContentType =
				contentType || this.getContentTypeFromExtension(filePath);

			this.setCommonHeaders(res, finalContentType);
			res.end(content);
			return true;
		} catch (error) {
			this.logError(`Error reading file ${filePath}:`, error);
			this.sendInternalError(res);
			return false;
		}
	}

	/**
	 * Log a warning message with DevServer prefix
	 */
	protected logWarning(message: string, ...args: any[]): void {
		console.warn(`[DevServer] ${message}`, ...args);
	}

	/**
	 * Log an error message with DevServer prefix
	 */
	protected logError(message: string, ...args: any[]): void {
		console.error(`[DevServer] ${message}`, ...args);
	}

	/**
	 * Log an info message with DevServer prefix
	 */
	protected logInfo(message: string, ...args: any[]): void {
		console.log(`[DevServer] ${message}`, ...args);
	}

	/**
	 * Create middleware function
	 */
	create() {
		return async (req: any, res: any, next: any) => {
			if (!this.matches(req.url)) {
				return next();
			}

			try {
				await this.handle(req, res);
			} catch (error) {
				this.logError(`Error in ${this.constructor.name}:`, error);
				this.sendInternalError(res);
			}
		};
	}
}
