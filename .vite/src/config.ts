import { resolve, sep } from 'node:path';

/**
 * config
 *
 * Provides Vite config settings required to build Gutenberg blocks
 *
 * @see https://vitejs.dev/guide/api-plugin.html#config
 */
export const config = ({
	outDir = null,
	blockFile = null,
	blockPath = null,
	blockName = null,
}: {
	outDir?: string | null;
	blockFile?: any;
	blockPath?: string | null;
	blockName?: string | null;
} = {}) => {
	const pwd = process.env.PWD || process.cwd();
	const defaultBlockName = pwd.split(sep).pop() || 'unknown';
	const finalBlockName = blockName || defaultBlockName;
	const entryPath = blockPath
		? resolve(blockPath, 'index.jsx')
		: resolve(pwd, 'src/index.jsx');
	const outputPath = outDir
		? resolve(outDir, finalBlockName)
		: resolve(pwd, '../../../build', finalBlockName);

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
