/**
 * External dependencies
 */
import type { BuildOptions, UserConfig } from 'vite';

/**
 * Shared dependencies
 */
import { WORDPRESS_EXTERNALS } from '../../common/constants.js';

/**
 * Internal dependencies
 */
import type { ViteWordPressConfig } from '../../common/types';

/**
 * Generate optimized Vite 6 configuration for WordPress
 */
export function config(config: ViteWordPressConfig): UserConfig {
	const {
		build: {
			outDir = 'build',
			minify = 'esbuild',
			sourcemap = false,
			target = 'es2018',
			cssCodeSplit = true,
		},
		terserOptions = {},
	} = config;

	const buildConfig: BuildOptions = {
		outDir,
		minify,
		sourcemap:
			sourcemap === 'linked' ||
			sourcemap === 'external' ||
			sourcemap === 'both'
				? true
				: sourcemap,
		target,
		cssCodeSplit,

		// Vite 6 enhanced manifest generation
		manifest: true,

		// Rollup configuration optimized for WordPress
		rollupOptions: {
			// Provide virtual entry point to satisfy Vite's requirements
			// Actual building happens through WordPress plugin sideloading
			input: 'virtual:wordpress-entry',
			// Only externalize WordPress dependencies in production
			external: (id: string) => {
				// In development mode, don't externalize React/ReactDOM for HMR
				if (process.env.NODE_ENV === 'development') {
					// Allow React and ReactDOM to be bundled for HMR
					if (id === 'react' || id === 'react-dom') {
						return false;
					}
				}
				// Externalize other WordPress dependencies
				return Object.keys(WORDPRESS_EXTERNALS).includes(id);
			},
			output: {
				globals: WORDPRESS_EXTERNALS,
			},
			// Suppress unhelpful file overwrite warnings
			onwarn(warning, warn) {
				// Suppress warnings about overwriting previously emitted files
				if (warning.code === 'FILE_NAME_CONFLICT') {
					return;
				}
				// Use default warning behavior for other warnings
				warn(warning);
			},
		},

		// Terser options if specified
		...(minify === 'terser' && {
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
					...terserOptions.compress,
				},
				mangle: {
					properties: false,
					...terserOptions.mangle,
				},
				format: {
					comments: false,
					...terserOptions.format,
				},
			},
		}),
	};

	const viteConfig: UserConfig = {
		build: buildConfig,

		// Disable public directory copying for WordPress themes
		publicDir: false,

		// HMR configuration for WordPress development
		server: {
			host: 'localhost',
			port: 5173,
			strictPort: true,
			cors: true,
			// Allow serving files from outside the workspace
			fs: {
				allow: ['..', '.'],
			},
			// Configure HMR for WordPress
			hmr: {
				port: 5173,
				host: 'localhost',
			},
		},

		// Optimized for WordPress development
		define: {
			'process.env.NODE_ENV': JSON.stringify(
				process.env.NODE_ENV || 'production'
			),
		},

		// Enhanced optimization for WordPress dependencies
		optimizeDeps: {
			include: [
				// In development, include React for HMR
				...(process.env.NODE_ENV === 'development'
					? ['react', 'react-dom']
					: []),
				// Only include dependencies that aren't provided by WordPress
			],
			exclude: Object.keys(WORDPRESS_EXTERNALS).filter((dep) => {
				// In development, don't exclude React for HMR
				if (process.env.NODE_ENV === 'development') {
					return dep !== 'react' && dep !== 'react-dom';
				}
				return true;
			}),
		},

		// CSS handling optimized for WordPress
		css: {
			devSourcemap: sourcemap !== false,
			preprocessorOptions: {
				scss: {
					// Basic SCSS configuration
				},
				sass: {
					// Basic Sass configuration
				},
			},
			postcss: {
				plugins: [
					// Add postcss plugins as needed
				],
			},
		},

		// Add Vite 6 future flags
		future: {
			removePluginHookSsrArgument: 'warn',
		},
	};

	return viteConfig;
}
