/**
 * Shared helpers for Dev Server and HMR Client
 * Loaded in the browser via a classic <script>, so avoid ESM syntax.
 * Exposes a global: window.__VITE_HMR_HELPERS__
 */

/**
 * Convert relative file path to inline style ID for a given file (<path>/<block_name>/style.css)
 * ID is always in a form of <namespace>-<block_name>-style-inline-css
 *
 * @param {string|undefined|null} namespace
 * @param {string} file
 * @returns {string|null}
 */
function relativePathToInlineStyleId(namespace, file) {
	if (!file) return null;
	const match = file.match(/^(.*\/)?([^/]+)\/style\.css$/);
	if (!match) return null;
	if (!namespace) return null;
	const blockName = match[2];
	return `${namespace}-${blockName}-style-inline-css`;
}

/**
 * Check if content differs significantly (ignoring comments and redundant whitespace)
 *
 * @param {string} content1
 * @param {string} content2
 * @returns {boolean}
 */
function contentDiffers(content1, content2) {
	const normalize = (str) =>
		String(str || '')
			.replace(/\/\*[\s\S]*?\*\//g, '')
			.replace(/\s+/g, ' ')
			.trim();
	return normalize(content1) !== normalize(content2);
}

// Attach to window for client usage
(function attachGlobal() {
	const g =
		typeof window !== 'undefined'
			? window
			: typeof globalThis !== 'undefined'
				? globalThis
				: {};
	g.__VITE_HMR_HELPERS__ = {
		relativePathToInlineStyleId,
		contentDiffers,
	};
})();
