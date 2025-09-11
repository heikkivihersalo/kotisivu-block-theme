import { BaseHandler } from './BaseHandler.js';

/**
 * Handler for CSS files
 */
export class CSSFileHandler extends BaseHandler {
	/**
	 * Check if this handler can process the asset type
	 * @param {string} type - Asset type
	 * @param {string} path - Asset path
	 * @returns {boolean} Whether this handler can process the asset
	 */
	canHandle(type, path) {
		return type === 'inline-css' && !path.includes('inline');
	}

	/**
	 * Update CSS file by reloading link elements
	 * @param {string} assetPath - Asset path
	 * @param {string} content - New CSS content (unused for file reloading)
	 */
	async update(assetPath, content) {
		const links = this.queryElements('link[rel="stylesheet"]');

		links.forEach((link) => {
			if (
				link.href &&
				this.elementMatchesAsset(link, assetPath, 'href')
			) {
				const newHref = this.addTimestamp(link.href);
				link.href = newHref;
				this.log('Reloaded CSS file', assetPath);
			}
		});
	}
}
