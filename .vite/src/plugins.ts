import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react';
import { resolve, sep } from 'node:path';

/* *********************************************
 * External plugins required for the build process
 * ******************************************* */

const pwd = process.env.PWD || process.cwd();
const block = pwd.split(sep).pop() || 'unknown';

const generatePlugins = ({
	outDir = null,
	blockPath = null,
	blockName = null,
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
			copyTargets.push({
				src: resolve(block.path, 'block.json'),
				dest: block.name,
			});
			// Also copy any PHP files
			copyTargets.push({
				src: resolve(block.path, '*.php'),
				dest: block.name,
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
