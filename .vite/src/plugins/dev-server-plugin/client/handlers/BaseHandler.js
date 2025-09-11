/**
 * Base handler class for HMR asset updates
 * Provides common functionality for all asset handlers
 */
export class BaseHandler {
	/**
	 * @param {Object} config - Handler configuration
	 */
	constructor(config = {}) {
		this.config = config;
	}

	/**
	 * Check if this handler can process the asset type
	 * Must be implemented by subclasses
	 * @param {string} type - Asset type
	 * @param {string} path - Asset path
	 * @returns {boolean} Whether this handler can process the asset
	 */
	canHandle(type, path) {
		throw new Error('canHandle method must be implemented by subclass');
	}

	/**
	 * Update asset content
	 * Must be implemented by subclasses
	 * @param {string} assetPath - Asset path
	 * @param {string} content - New asset content
	 */
	async update(assetPath, content) {
		throw new Error('update method must be implemented by subclass');
	}

	/**
	 * Log a DevServer message with consistent formatting
	 * @param {string} action - Action being performed
	 * @param {string} assetPath - Asset path
	 * @param {string} level - Log level (log, warn, error)
	 */
	log(action, assetPath, level = 'log') {
		console[level](`[DevServer] ${action}:`, assetPath);
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

	/**
	 * Check if an element matches the asset path
	 * @param {Element} element - DOM element to check
	 * @param {string} assetPath - Asset path to match
	 * @param {string} attribute - Attribute to check (href, src, etc.)
	 * @returns {boolean} Whether the element matches
	 */
	elementMatchesAsset(element, assetPath, attribute = 'href') {
		const elementUrl = element[attribute];
		if (!elementUrl) return false;

		const elementFilename = this.extractFilename(elementUrl);
		return assetPath.includes(elementFilename);
	}

	/**
	 * Query DOM elements with optional filtering
	 * @param {string} selector - CSS selector
	 * @param {function} filter - Optional filter function
	 * @returns {Element[]} Filtered elements
	 */
	queryElements(selector, filter = null) {
		const elements = Array.from(document.querySelectorAll(selector));
		return filter ? elements.filter(filter) : elements;
	}
}
