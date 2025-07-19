import { resolve } from 'node:path';
import { FILE_NAMES, ESBUILD_CONFIG } from './constants.js';

/**
 * config
 *
 * Provides Vite config settings required to build Gutenberg blocks
 *
 * @see https://vitejs.dev/guide/api-plugin.html#config
 */
export const config = ({
	outDir = null,
	blockPath = null,
}: {
	outDir?: string | null;
	blockFile?: any;
	blockPath?: string | null;
	blockName?: string | null;
} = {}) => {
	const pwd = process.env.PWD || process.cwd();
	const entryPath = blockPath
		? resolve(blockPath, FILE_NAMES.DEFAULT_SCRIPT_ENTRY)
		: resolve(pwd, 'src', FILE_NAMES.DEFAULT_SCRIPT_ENTRY);

	// For multi-block builds, use outDir directly without appending block name
	// The individual block paths will be handled by the sideload function
	const outputPath = outDir
		? resolve(outDir)
		: resolve(pwd, '../../../build');

	return {
		define: { 'process.env.NODE_ENV': `"${process.env.NODE_ENV}"` },
		build: {
			lib: {
				entry: entryPath,
				name: 'index',
				formats: ['iife'],
				fileName: () => FILE_NAMES.DEFAULT_SCRIPT_OUTPUT,
			},
			outDir: outputPath,
			rollupOptions: {},
			target: ESBUILD_CONFIG.TARGET,
			minify: true,
			cssCodeSplit: true, // This option stops the default `styles.css` from being bundled
		},
	};
};
