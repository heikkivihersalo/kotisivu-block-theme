/**
 * WordPress packages that should be externalized
 */
const WORDPRESS_PACKAGES = [
	'@wordpress/blocks',
	'@wordpress/block-editor',
	'@wordpress/components',
	'@wordpress/compose',
	'@wordpress/core-data',
	'@wordpress/data',
	'@wordpress/element',
	'@wordpress/i18n',
	'@wordpress/notices',
	'@wordpress/server-side-render',
	'@wordpress/api-fetch',
	'@wordpress/url',
	'@wordpress/html-entities',
	'@wordpress/rich-text',
	'@wordpress/editor',
	'@wordpress/plugins',
	'@wordpress/edit-post',
	'@wordpress/date',
	'@wordpress/keycodes',
	'@wordpress/primitives',
	'@wordpress/icons',
];

/**
 * Third-party libraries provided by WordPress
 */
const THIRD_PARTY_LIBRARIES = ['lodash', 'moment', 'jquery'];

/**
 * Create external dependencies function for Rollup
 * @returns {Function} External function for Rollup configuration
 */
export function createExternalFunction() {
	return (id) => {
		// Check for WordPress packages
		if (
			WORDPRESS_PACKAGES.some(
				(pkg) => id === pkg || id.startsWith(pkg + '/')
			)
		) {
			return true;
		}

		// React packages - provided by WordPress via wp.element
		// More comprehensive React detection to catch all variants
		if (
			id === 'react' ||
			id === 'react-dom' ||
			id.startsWith('react/') ||
			id.includes('react/jsx-runtime') ||
			id.includes('react/jsx-dev-runtime') ||
			id.includes('node_modules/react/') ||
			id.includes('/react/') ||
			id.includes('react.development.js') ||
			id.includes('react-jsx-dev-runtime') ||
			id.includes('react.js') ||
			id.endsWith('react/index.js') ||
			id.includes('commonjs-') // Catch commonjs variants
		) {
			return true;
		}

		// Third-party libraries provided by WordPress
		if (THIRD_PARTY_LIBRARIES.includes(id)) {
			return true;
		}

		return false;
	};
}

/**
 * Create globals mapping for external dependencies
 * @returns {Object} Globals mapping for Rollup output configuration
 */
export function createGlobalsMapping() {
	const globals = {};

	// WordPress packages
	globals['@wordpress/blocks'] = 'wp.blocks';
	globals['@wordpress/block-editor'] = 'wp.blockEditor';
	globals['@wordpress/components'] = 'wp.components';
	globals['@wordpress/compose'] = 'wp.compose';
	globals['@wordpress/core-data'] = 'wp.coreData';
	globals['@wordpress/data'] = 'wp.data';
	globals['@wordpress/element'] = 'wp.element';
	globals['@wordpress/i18n'] = 'wp.i18n';
	globals['@wordpress/notices'] = 'wp.notices';
	globals['@wordpress/server-side-render'] = 'wp.serverSideRender';
	globals['@wordpress/api-fetch'] = 'wp.apiFetch';
	globals['@wordpress/url'] = 'wp.url';
	globals['@wordpress/html-entities'] = 'wp.htmlEntities';
	globals['@wordpress/rich-text'] = 'wp.richText';
	globals['@wordpress/editor'] = 'wp.editor';
	globals['@wordpress/plugins'] = 'wp.plugins';
	globals['@wordpress/edit-post'] = 'wp.editPost';
	globals['@wordpress/date'] = 'wp.date';
	globals['@wordpress/keycodes'] = 'wp.keycodes';
	globals['@wordpress/primitives'] = 'wp.primitives';
	globals['@wordpress/icons'] = 'wp.icons';

	// React - provided by WordPress via wp.element
	globals['react'] = 'wp.element';
	globals['react-dom'] = 'wp.element';
	globals['react/jsx-runtime'] = 'wp.element';
	globals['react/jsx-dev-runtime'] = 'wp.element';

	// Third-party libraries
	globals['lodash'] = 'lodash';
	globals['moment'] = 'moment';
	globals['jquery'] = 'jQuery';

	return globals;
}
