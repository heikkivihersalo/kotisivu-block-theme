import { resolve } from 'node:path';
import { ESBUILD_CONFIG } from '../../constants.js';

/**
 * config
 *
 * Provides Vite config settings for multi-block builds.
 * Individual block entry points and build configurations are handled
 * by the sideload function during the build process.
 *
 * @see https://vitejs.dev/guide/api-plugin.html#config
 */
export const config = ({
	outDir = null,
	minify = true,
	terserOptions = {},
}: {
	outDir?: string | null;
	minify?: boolean | 'esbuild' | 'terser';
	terserOptions?: Record<string, any>;
} = {}) => {
	const pwd = process.env.PWD || process.cwd();

	// Multi-block builds only - output directory is handled by sideload function
	// Individual block entry points are processed during the sideload phase
	const outputPath = outDir
		? resolve(outDir)
		: resolve(pwd, '../../../build');

	return {
		define: { 'process.env.NODE_ENV': `"${process.env.NODE_ENV}"` },
		publicDir: false, // Disable public directory copying for WordPress builds
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler', // Use modern Sass API
				},
			},
		},
		optimizeDeps: {
			include: [], // Don't pre-bundle dependencies in WordPress context
		},
		build: {
			outDir: outputPath,
			rollupOptions: {
				// Use a dummy entry file since we handle building manually
				input: resolve(__dirname, '.vite-entry.js'),
				output: {
					// Don't output the dummy entry file to assets directory
					entryFileNames: () => '.vite-entry-[hash].js',
				},
				external: () => true, // Make everything external to prevent bundling
			},
			target: ESBUILD_CONFIG.TARGET,
			minify,
			...(minify === 'terser' && { terserOptions }),
			cssCodeSplit: true, // This option stops the default `styles.css` from being bundled
		},
	};
};
