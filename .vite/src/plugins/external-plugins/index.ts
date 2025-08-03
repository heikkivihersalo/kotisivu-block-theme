import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { FILE_NAMES } from '../../common/constants.js';
import type { BlockInfo } from '../../common/types/index.js';

/* *********************************************
 * External plugins required for the build process
 * ******************************************* */

const generatePlugins = ({
	discoveredBlocks = [],
}: {
	discoveredBlocks?: BlockInfo[];
} = {}) => {
	// Create copy targets for discovered blocks (multi-block builds only)
	const copyTargets: Array<{ src: string; dest: string }> = [];

	if (discoveredBlocks.length > 0) {
		// Copy block.json files for each discovered block
		discoveredBlocks.forEach((block) => {
			// Use custom output path if available, otherwise fall back to block name
			const destPath = block.outputPath || block.name;
			copyTargets.push({
				src: resolve(block.path, FILE_NAMES.BLOCK_CONFIG),
				dest: destPath,
			});
			// Also copy any PHP files
			copyTargets.push({
				src: resolve(block.path, '*.php'),
				dest: destPath,
			});
		});
	}

	const pluginCopy = viteStaticCopy({
		silent: true,
		targets: copyTargets,
	});

	const pluginReact = react({
		jsxRuntime: 'classic',
		jsxImportSource: '@wordpress/element',
	});

	return [pluginCopy, pluginReact];
};

export default generatePlugins;
