/**
 * External dependencies
 */
import type { Plugin } from 'vite';

/**
 * Shared dependencies
 */
import { FilePathResolver } from '../../common/services/FilePathResolver';
import type { ViteWordPressConfig } from '../../common/types';

/**
 * Internal dependencies
 */
import { config } from './config.ts';

/**
 * Vite 6 Modern Configuration Plugin for WordPress
 *
 * This plugin provides optimized Vite 6 configuration for WordPress development
 * with a fully modern approach
 */
export function ConfigPlugin(pluginConfig: ViteWordPressConfig): Plugin {
	const {
		build: { outDir, minify = 'esbuild', sourcemap = false },
		terserOptions = {},
		server = {},
		resolve = {},
	} = pluginConfig;

	return {
		name: 'vite-plugin-gutenberg-config',

		config: (_, { mode }) => {
			return config(
				{
					build: {
						outDir: outDir
							? (FilePathResolver.normalizePath(outDir) ??
								undefined)
							: undefined,
						minify,
						sourcemap,
					},
					terserOptions,
					server,
					resolve,
				},
				mode
			);
		},

		resolveId(id: string) {
			if (id === 'virtual:wordpress-entry') {
				return id;
			}
			return null;
		},

		load(id: string) {
			if (id === 'virtual:wordpress-entry') {
				// Return minimal content for virtual entry point
				// Actual builds happen through WordPress sideloading
				return 'console.log("WordPress blocks built via sideloading");';
			}
			return null;
		},
	};
}
