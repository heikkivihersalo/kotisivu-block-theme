/**
 * External dependencies
 */
import type { Plugin } from 'vite';

/**
 * Internal dependencies
 */
import { config as viteConfig } from './config/index.js';
import { normalizePath } from '../../common/index.js';

interface ConfigPluginConfig {
	outDir?: string | undefined;
	minify?: boolean | 'esbuild' | 'terser';
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	terserOptions?: {
		compress?: Record<string, any>;
		mangle?: Record<string, any>;
		format?: Record<string, any>;
		output?: Record<string, any>;
	};
}

/**
 * Vite plugin for configuring WordPress Gutenberg build settings
 *
 * This plugin is responsible for:
 * - Setting up Vite configuration optimized for WordPress
 * - Configuring build options, minification, and sourcemaps
 */
export function ConfigPlugin(pluginConfig: ConfigPluginConfig): Plugin {
	const {
		outDir,
		minify = true,
		sourcemap = false,
		terserOptions = {},
	} = pluginConfig;

	// Default aggressive Terser configuration optimized for WordPress
	const defaultTerserOptions = {
		compress: {
			drop_console: true,
			drop_debugger: true,
			pure_funcs: [
				'console.log',
				'console.info',
				'console.debug',
				'console.warn',
			],
			passes: 2,
		},
		mangle: {
			properties: false,
		},
		format: {
			comments: false,
			beautify: false,
			semicolons: true,
		},
	};

	// Deep merge user terserOptions with defaults
	const mergedTerserOptions = {
		compress: {
			...defaultTerserOptions.compress,
			...terserOptions.compress,
		},
		mangle: { ...defaultTerserOptions.mangle, ...terserOptions.mangle },
		format: {
			...defaultTerserOptions.format,
			...terserOptions.format,
			...terserOptions.output, // Support legacy 'output' option
		},
	};

	return {
		name: 'vite-plugin-gutenberg-config',

		config: () => {
			const configResult = viteConfig({
				outDir: normalizePath(outDir) || undefined,
				minify,
				terserOptions: mergedTerserOptions,
				sourcemap,
			});

			// Return a compatible config subset
			return {
				define: configResult.define,
				optimizeDeps: configResult.optimizeDeps,
				build: {
					cssCodeSplit: configResult.build.cssCodeSplit,
					outDir: configResult.build.outDir,
					rollupOptions: configResult.build.rollupOptions,
					target: configResult.build.target,
					minify: configResult.build.minify,
					...(configResult.build.terserOptions && {
						terserOptions: configResult.build.terserOptions,
					}),
				},
			};
		},
	};
}
