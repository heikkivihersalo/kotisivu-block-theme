import { BaseHandler } from './BaseHandler.js';
import {
	findElementsByDataAttribute,
	replaceElementContent,
} from '../utils/dom-utils.js';

/**
 * Handler for inline CSS styles
 */
export class InlineCSSHandler extends BaseHandler {
	/**
	 * Check if this handler can process the asset type
	 * @param {string} type - Asset type
	 * @param {string} path - Asset path
	 * @returns {boolean} Whether this handler can process the asset
	 */
	canHandle(type, path) {
		return type === 'inline-css' && path.includes('inline');
	}

	/**
	 * Update inline CSS content
	 * @param {string} assetPath - Asset path
	 * @param {string} content - New CSS content
	 */
	async update(assetPath, content) {
		if (!content) return;

		const inlineStyles = findElementsByDataAttribute('vite-dev-id');

		inlineStyles.forEach((style) => {
			const viteDevId = style.dataset.viteDevId;
			if (viteDevId && assetPath.includes(viteDevId)) {
				replaceElementContent(style, content);
				this.log('Updated inline CSS', assetPath);
			}
		});
	}
}
