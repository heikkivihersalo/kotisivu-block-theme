/**
 * External dependencies
 */
import type { BuildOptions, UserConfig } from 'vite';

/**
 * Shared dependencies
 */
import { WORDPRESS_EXTERNALS } from '../../../../common/constants.js';

/**
 * Internal dependencies
 */
import type { WordPressViteConfig } from '../../types.ts';

/**
 * Generate optimized Vite 6 configuration for WordPress
 */
export function createWordPressViteConfig(
	config: WordPressViteConfig = {}
): UserConfig {
	const {
		outDir = 'build',
		minify = 'esbuild',
		sourcemap = false,
		terserOptions = {},
		target = 'es2018',
		cssCodeSplit = true,
		enableFuture = true,
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

		// Improved module preload for WordPress
		modulePreload: {
			polyfill: true,
			resolveDependencies: (_url: string, deps: string[]) => {
				// Filter WordPress externals from preload using constants
				const wpExternalKeys = Object.keys(WORDPRESS_EXTERNALS);
				return deps.filter(
					(dep) =>
						!wpExternalKeys.some((external) =>
							dep.includes(external)
						)
				);
			},
		},

		// Rollup configuration optimized for WordPress
		rollupOptions: {
			// Provide virtual entry point to satisfy Vite's requirements
			// Actual building happens through WordPress plugin sideloading
			input: 'virtual:wordpress-entry',
			external: Object.keys(WORDPRESS_EXTERNALS),
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

		// Optimized for WordPress development
		define: {
			'process.env.NODE_ENV': JSON.stringify(
				process.env.NODE_ENV || 'production'
			),
		},

		// Enhanced optimization for WordPress dependencies
		optimizeDeps: {
			include: [
				// Only include dependencies that aren't provided by WordPress
			],
			exclude: Object.keys(WORDPRESS_EXTERNALS),
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
	};

	// Add Vite 6 future flags if enabled
	if (enableFuture) {
		viteConfig.future = {
			removePluginHookSsrArgument: 'warn',
		};
	}

	return viteConfig;
}
