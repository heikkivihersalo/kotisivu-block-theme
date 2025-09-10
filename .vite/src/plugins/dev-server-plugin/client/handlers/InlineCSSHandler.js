/**
 * Handler for inline CSS styles
 */
export class InlineCSSHandler {
	/**
	 * @param {Object} config - HMR configuration
	 */
	constructor(config) {
		this.config = config;
	}

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

		const inlineStyles = document.querySelectorAll(
			'style[data-vite-dev-id]'
		);
		inlineStyles.forEach((style) => {
			if (
				style.dataset.viteDevId &&
				assetPath.includes(style.dataset.viteDevId)
			) {
				style.textContent = content;
				console.log('[DevServer] Updated inline CSS:', assetPath);
			}
		});
	}
}
