/**
 * External dependencies for WordPress Gutenberg blocks
 * These are provided by WordPress core and should not be bundled
 */

// WordPress global dependencies mapping
const WORDPRESS_EXTERNALS = {
	'@wordpress/blocks': 'wp.blocks',
	'@wordpress/block-editor': 'wp.blockEditor',
	'@wordpress/components': 'wp.components',
	'@wordpress/element': 'wp.element',
	'@wordpress/i18n': 'wp.i18n',
	'@wordpress/data': 'wp.data',
	'@wordpress/api-fetch': 'wp.apiFetch',
	'@wordpress/url': 'wp.url',
	'@wordpress/compose': 'wp.compose',
	'@wordpress/hooks': 'wp.hooks',
	'@wordpress/rich-text': 'wp.richText',
	'@wordpress/editor': 'wp.editor',
	'@wordpress/core-data': 'wp.coreData',
	'@wordpress/notices': 'wp.notices',
	'@wordpress/server-side-render': 'wp.serverSideRender',
	'@wordpress/html-entities': 'wp.htmlEntities',
	'@wordpress/dom-ready': 'wp.domReady',
	'@wordpress/escape-html': 'wp.escapeHtml',
	'@wordpress/keycodes': 'wp.keycodes',
	'@wordpress/primitives': 'wp.primitives',
	'@wordpress/date': 'wp.date',
	'@wordpress/blob': 'wp.blob',
	'@wordpress/media-utils': 'wp.mediaUtils',
	'@wordpress/viewport': 'wp.viewport',
	'@wordpress/deprecated': 'wp.deprecated',
	'@wordpress/warning': 'wp.warning',
};

// React dependencies provided by WordPress
const REACT_EXTERNALS = {
	react: 'React',
	'react-dom': 'ReactDOM',
};

// Lodash utilities provided by WordPress
const LODASH_EXTERNALS = {
	lodash: 'lodash',
};

// All external dependencies combined
const ALL_EXTERNALS = {
	...WORDPRESS_EXTERNALS,
	...REACT_EXTERNALS,
	...LODASH_EXTERNALS,
};

/**
 * Create external function for Rollup to exclude WordPress dependencies
 * @returns {Function} External function for Rollup
 */
export function createExternalFunction() {
	return (id) => {
		return Object.keys(ALL_EXTERNALS).includes(id);
	};
}

/**
 * Create globals mapping for UMD builds
 * @returns {Object} Globals mapping for Rollup
 */
export function createGlobalsMapping() {
	return ALL_EXTERNALS;
}
