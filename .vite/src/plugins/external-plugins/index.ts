/**
 * External dependencies
 */
import react from '@vitejs/plugin-react';

const generatePlugins = () => {
	const pluginReact = react({
		jsxRuntime: 'classic',
		jsxImportSource: '@wordpress/element',
	});

	// Note: vite-plugin-static-copy was removed as it had no targets configured
	// Re-add when static file copying is needed
	return [pluginReact];
};

export default generatePlugins;
