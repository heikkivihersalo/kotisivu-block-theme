/**
 * External dependencies
 */
import type { Plugin } from 'vite';

/**
 * Shared dependencies
 */
import { normalizePath } from '../../common/utils';
/**
 * Internal dependencies
 */
import { createWordPressViteConfig } from './utils';

type ConfigPluginConfig = {
	outDir?: string;
	minify?: boolean | 'esbuild' | 'terser';
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	terserOptions?: {
		compress?: Record<string, any>;
		mangle?: Record<string, any>;
		format?: Record<string, any>;
		output?: Record<string, any>;
	};
};

/**
 * Vite 6 Modern Configuration Plugin for WordPress
 *
 * This plugin provides optimized Vite 6 configuration for WordPress development
 * with no backward compatibility layers - fully modern approach
 */
export function ConfigPlugin(pluginConfig: ConfigPluginConfig): Plugin {
	const {
		outDir,
		minify = 'esbuild',
		sourcemap = false,
		terserOptions = {},
	} = pluginConfig;

	return {
		name: 'vite-plugin-gutenberg-config',

		config: () => {
			return createWordPressViteConfig({
				outDir: outDir
					? (normalizePath(outDir) ?? undefined)
					: undefined,
				minify,
				terserOptions,
				sourcemap,
				enableFuture: true,
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
