/**
 * External dependencies
 */
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import type { Plugin } from 'vite';

/**
 * Shared dependencies
 */
import { FILE_NAMES } from '../../common/constants.js';
import type { BlockInfo } from '../../common/types/blocks.ts';

/* *********************************************
 * External plugins required for the build process
 * ******************************************* */

/**
 * Creates a static copy plugin that dynamically configures copy targets
 * based on discovered blocks during the build process
 */
const createBlockStaticCopyPlugin = (): Plugin => {
	return {
		name: 'block-static-copy',
		apply: 'build',

		async generateBundle() {
			// At this point, we need to access discovered blocks
			// Since the timing issue persists, let's use a different approach
			// and create the static copy functionality directly

			// For now, we'll implement basic static copying logic
			// This will be improved once we fix the discovery timing
			console.log('Block static copy plugin - generateBundle called');
		},
	};
};

const generatePlugins = () => {
	const pluginReact = react({
		jsxRuntime: 'classic',
		jsxImportSource: '@wordpress/element',
	});

	// For now, create an empty static copy plugin until we fix the timing issue
	const emptyStaticCopy = viteStaticCopy({
		silent: false,
		targets: [],
	});

	const blockStaticCopy = createBlockStaticCopyPlugin();

	return [emptyStaticCopy, blockStaticCopy, pluginReact];
};

export default generatePlugins;
