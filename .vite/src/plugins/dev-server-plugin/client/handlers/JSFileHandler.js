import { BaseHandler } from './BaseHandler.js';

/**
 * Handler for JavaScript files
 */
export class JSFileHandler extends BaseHandler {
	/**
	 * Check if this handler can process the asset type
	 * @param {string} type - Asset type
	 * @param {string} path - Asset path
	 * @returns {boolean} Whether this handler can process the asset
	 */
	canHandle(type, path) {
		return type === 'js-file';
	}

	/**
	 * Handle JavaScript file updates (currently logs only)
	 * @param {string} assetPath - Asset path
	 * @param {string} content - New JavaScript content
	 */
	async update(assetPath, content) {
		this.log('JavaScript file changed', assetPath);
		// Note: Full JS HMR would require more complex module replacement
		// For now, just log the change
	}
}
