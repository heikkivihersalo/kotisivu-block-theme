/**
 * Constants for external dependencies configuration
 * These constants are shared across external function files
 */

/**
 * WordPress packages with their global variable mappings
 */
export const WORDPRESS_DEPENDENCIES = {
	'@wordpress/blocks': 'wp.blocks',
	'@wordpress/block-editor': 'wp.blockEditor',
	'@wordpress/components': 'wp.components',
	'@wordpress/compose': 'wp.compose',
	'@wordpress/core-data': 'wp.coreData',
	'@wordpress/data': 'wp.data',
	'@wordpress/element': 'wp.element',
	'@wordpress/i18n': 'wp.i18n',
	'@wordpress/notices': 'wp.notices',
	'@wordpress/server-side-render': 'wp.serverSideRender',
	'@wordpress/api-fetch': 'wp.apiFetch',
	'@wordpress/url': 'wp.url',
	'@wordpress/html-entities': 'wp.htmlEntities',
	'@wordpress/rich-text': 'wp.richText',
	'@wordpress/editor': 'wp.editor',
	'@wordpress/plugins': 'wp.plugins',
	'@wordpress/edit-post': 'wp.editPost',
	'@wordpress/date': 'wp.date',
	'@wordpress/keycodes': 'wp.keycodes',
	'@wordpress/primitives': 'wp.primitives',
	'@wordpress/icons': 'wp.icons',
};

/**
 * Third-party libraries with their global variable mappings
 */
export const THIRD_PARTY_DEPENDENCIES = {
	lodash: 'lodash',
	moment: 'moment',
	jquery: 'jQuery',
};

/**
 * React packages to global variable mappings
 */
export const REACT_GLOBALS = {
	react: 'wp.element',
	'react-dom': 'wp.element',
	'react/jsx-runtime': 'wp.element',
	'react/jsx-dev-runtime': 'wp.element',
};

/**
 * Helper functions to extract keys and values from dependency objects
 */

/**
 * Get WordPress package names (for externalization)
 * @returns {string[]} Array of WordPress package names
 */
export const getWordPressPackages = () => Object.keys(WORDPRESS_DEPENDENCIES);

/**
 * Get WordPress globals mapping
 * @returns {Object} WordPress packages to globals mapping
 */
export const getWordPressGlobals = () => WORDPRESS_DEPENDENCIES;

/**
 * Get third-party library names (for externalization)
 * @returns {string[]} Array of third-party library names
 */
export const getThirdPartyLibraries = () =>
	Object.keys(THIRD_PARTY_DEPENDENCIES);

/**
 * Get third-party globals mapping
 * @returns {Object} Third-party libraries to globals mapping
 */
export const getThirdPartyGlobals = () => THIRD_PARTY_DEPENDENCIES;
