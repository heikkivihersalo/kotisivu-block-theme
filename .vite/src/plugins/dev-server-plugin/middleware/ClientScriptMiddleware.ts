/**
 * Client Script Middleware
 *
 * Serves the HMR client script with configuration.
 */

import type { BlockAssetInfo } from '../types.js';
import {
	generateScript,
	generateModuleScript,
	generateExternalScript,
} from '../utils/script-templates.js';
import { BaseMiddleware } from '../../../common/abstracts/BaseMiddleware.js';

/**
 * Client Script Middleware Class
 */
export class ClientScriptMiddleware extends BaseMiddleware {
	protected routePattern: RegExp;

	constructor(
		private getBlockAssets: () => Map<string, BlockAssetInfo>,
		private blockNamespace: string,
		private method: 'inline' | 'external' | 'module' = 'inline',
		private pollingInterval = 500,
		private options: {
			themePrefix?: string;
			viteServerUrl?: string;
			vitePort?: string;
		} = {},
		endpoint: string = '/__dev-server/client-script'
	) {
		super();
		// Convert endpoint to regex pattern, escaping special regex characters
		const escapedEndpoint = endpoint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		this.routePattern = new RegExp(`^${escapedEndpoint}$`);
	}

	handle(_req: any, res: any): void {
		this.setJavaScriptHeaders(res);

		// Get current block assets dynamically
		const blockAssets = this.getBlockAssets();

		const scriptConfig = {
			blockAssets,
			blockNamespace: this.blockNamespace,
			pollingInterval: this.pollingInterval,
			...this.options,
		};

		let clientScript: string;

		switch (this.method) {
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

	/**
	 * Create middleware function for use with a specific path (skips route matching)
	 */
	createForPath() {
		return async (req: any, res: any) => {
			try {
				await this.handle(req, res);
			} catch (error) {
				this.logError(`Error in ${this.constructor.name}:`, error);
				this.sendInternalError(res);
			}
		};
	}

	/**
	 * Middleware function for client script (no next handler needed)
	 */
	clientMiddleware() {
		return (_req: any, res: any) => {
			try {
				this.handle(_req, res);
			} catch (error) {
				this.logError(`Error in ${this.constructor.name}:`, error);
				this.sendInternalError(res);
			}
		};
	}
}
