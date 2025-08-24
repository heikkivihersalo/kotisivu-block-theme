/**
 * External dependencies
 */
import type { Plugin } from 'vite';

/**
 * Shared dependencies
 */
import { normalizePath } from '../../common/utils';
import type { PluginConfig } from '../..//common/types/plugin.ts';

/**
 * Internal dependencies
 */
import { config } from './config.ts';

/**
 * Vite 6 Modern Configuration Plugin for WordPress
 *
 * This plugin provides optimized Vite 6 configuration for WordPress development
 * with no backward compatibility layers - fully modern approach
 */
export function ConfigPlugin(pluginConfig: PluginConfig): Plugin {
	const {
		build: { outDir, minify = 'esbuild', sourcemap = false },
		terserOptions = {},
	} = pluginConfig;

	return {
		name: 'vite-plugin-gutenberg-config',

		config: () => {
			return config({
				build: {
					outDir: outDir
						? (normalizePath(outDir) ?? undefined)
						: undefined,
					minify,
					sourcemap,
				},
				terserOptions,
			});
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
