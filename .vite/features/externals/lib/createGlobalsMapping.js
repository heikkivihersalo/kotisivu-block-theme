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
