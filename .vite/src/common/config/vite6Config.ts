/**
 * Vite 6 Enhanced Configuration Helpers
 *
 * Leverages Vite 6's improved configuration options and environment handling
 */

import type { UserConfig, BuildOptions } from 'vite';
import { WORDPRESS_EXTERNALS } from '../constants.js';

interface WordPressViteConfig {
	outDir?: string;
	minify?: boolean | 'esbuild' | 'terser';
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	terserOptions?: any;
	target?: string | string[];
	cssCodeSplit?: boolean;
	enableFuture?: boolean;
}

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
			external: Object.keys(WORDPRESS_EXTERNALS),
			output: {
				globals: WORDPRESS_EXTERNALS,
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

/**
 * Create environment-specific build configurations
 * Leverages Vite 6's multi-environment support
 */
export function createEnvironmentConfigs(baseConfig: WordPressViteConfig = {}) {
	const baseViteConfig = createWordPressViteConfig(baseConfig);

	return {
		// Client environment (default)
		client: {
			...baseViteConfig,
			build: {
				...baseViteConfig.build,
				outDir: `${baseConfig.outDir || 'build'}/client`,
			},
		},

		// Admin environment (if needed)
		admin: {
			...baseViteConfig,
			build: {
				...baseViteConfig.build,
				outDir: `${baseConfig.outDir || 'build'}/admin`,
				rollupOptions: {
					...baseViteConfig.build?.rollupOptions,
					input: {
						admin: 'src/admin/main.js',
					},
				},
			},
		},

		// Block editor environment
		editor: {
			...baseViteConfig,
			build: {
				...baseViteConfig.build,
				outDir: `${baseConfig.outDir || 'build'}/editor`,
				rollupOptions: {
					...baseViteConfig.build?.rollupOptions,
					input: {
						editor: 'src/editor/main.js',
					},
				},
			},
		},
	};
}
