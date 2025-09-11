/**
 * DOM Utilities for HMR Client
 *
 * Common DOM manipulation utilities used by handlers
 */

/**
 * Extract filename from URL
 * @param {string} url - Full URL
 * @returns {string} Filename
 */
export function extractFilename(url) {
	return url.split('/').pop().split('?')[0];
}

/**
 * Add timestamp to URL for cache busting
 * @param {string} url - Original URL
 * @returns {string} URL with timestamp
 */
export function addTimestamp(url) {
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
export function elementMatchesAsset(element, assetPath, attribute = 'href') {
	const elementUrl = element[attribute];
	if (!elementUrl) return false;

	const elementFilename = extractFilename(elementUrl);
	return assetPath.includes(elementFilename);
}

/**
 * Query DOM elements with optional filtering
 * @param {string} selector - CSS selector
 * @param {function} filter - Optional filter function
 * @returns {Element[]} Filtered elements
 */
export function queryElements(selector, filter = null) {
	const elements = Array.from(document.querySelectorAll(selector));
	return filter ? elements.filter(filter) : elements;
}

/**
 * Create a new DOM element with attributes
 * @param {string} tagName - Element tag name
 * @param {Object} attributes - Element attributes
 * @param {string} textContent - Element text content
 * @returns {Element} Created element
 */
export function createElement(tagName, attributes = {}, textContent = '') {
	const element = document.createElement(tagName);

	Object.entries(attributes).forEach(([key, value]) => {
		element.setAttribute(key, value);
	});

	if (textContent) {
		element.textContent = textContent;
	}

	return element;
}

/**
 * Safely replace an element's content
 * @param {Element} element - Element to update
 * @param {string} content - New content
 * @param {string} contentType - Type of content ('text' or 'html')
 */
export function replaceElementContent(element, content, contentType = 'text') {
	if (!element || !content) return;

	if (contentType === 'html') {
		element.innerHTML = content;
	} else {
		element.textContent = content;
	}
}

/**
 * Find elements by data attribute
 * @param {string} dataAttribute - Data attribute name (without 'data-' prefix)
 * @param {string} value - Optional value to match
 * @returns {Element[]} Matching elements
 */
export function findElementsByDataAttribute(dataAttribute, value = null) {
	const selector = value
		? `[data-${dataAttribute}="${value}"]`
		: `[data-${dataAttribute}]`;
	return Array.from(document.querySelectorAll(selector));
}
