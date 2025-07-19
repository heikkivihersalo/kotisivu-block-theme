import { resolve } from 'node:path';

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
		? resolve(blockPath, 'index.jsx')
		: resolve(pwd, 'src/index.jsx');

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
				fileName: () => 'index.js',
			},
			outDir: outputPath,
			rollupOptions: {},
			target: 'es2020',
			minify: true,
			cssCodeSplit: true, // This option stops the default `styles.css` from being bundled
		},
	};
};
