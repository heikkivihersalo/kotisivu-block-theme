/**
 * Handler for CSS files
 */
export class CSSFileHandler {
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
		const links = document.querySelectorAll('link[rel="stylesheet"]');
		links.forEach((link) => {
			if (
				link.href &&
				assetPath.includes(this.extractFilename(link.href))
			) {
				const newHref = this.addTimestamp(link.href);
				link.href = newHref;
				console.log('[DevServer] Reloaded CSS file:', assetPath);
			}
		});
	}

	/**
	 * Extract filename from URL
	 * @param {string} url - Full URL
	 * @returns {string} Filename
	 */
	extractFilename(url) {
		return url.split('/').pop().split('?')[0];
	}

	/**
	 * Add timestamp to URL for cache busting
	 * @param {string} url - Original URL
	 * @returns {string} URL with timestamp
	 */
	addTimestamp(url) {
		const separator = url.includes('?') ? '&' : '?';
		return `${url}${separator}t=${Date.now()}`;
	}
}
