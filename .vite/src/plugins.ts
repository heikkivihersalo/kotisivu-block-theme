import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

/* *********************************************
 * External plugins required for the build process
 * ******************************************* */

const pwd = process.env.PWD || process.cwd();

const generatePlugins = ({
	blockPath = null,
	discoveredBlocks = [],
}: {
	outDir?: string | null;
	blockPath?: string | null;
	blockName?: string | null;
	discoveredBlocks?: any[];
} = {}) => {
	const finalBlockPath = blockPath || resolve(pwd, 'src');

	// Create copy targets for discovered blocks
	const copyTargets = [];

	if (discoveredBlocks.length > 0) {
		// Copy block.json files for each discovered block
		discoveredBlocks.forEach((block) => {
			// Use custom output path if available, otherwise fall back to block name
			const destPath = block.outputPath || block.name;
			copyTargets.push({
				src: resolve(block.path, 'block.json'),
				dest: destPath,
			});
			// Also copy any PHP files
			copyTargets.push({
				src: resolve(block.path, '*.php'),
				dest: destPath,
			});
		});
	} else {
		// Fallback to default behavior
		copyTargets.push(
			{
				src: resolve(finalBlockPath, 'block.json'),
				dest: '.',
			},
			{
				src: resolve(finalBlockPath, '*.php'),
				dest: '.',
			}
		);
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
