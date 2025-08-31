/**
 * External dependencies
 */
import type { Plugin, UserConfig } from 'vite';

/**
 * Shared dependencies
 */
import { FilePathResolver } from '../../common/services/FilePathResolver';
import type { PluginConfig } from '../../common/types/plugin-config.ts';

/**
 * Internal dependencies
 */
import { config } from './config.ts';

// Global config storage for sharing between plugins
let resolvedConfig: PluginConfig | null = null;
let viteConfig: UserConfig | null = null;

/**
 * Vite 6 Modern Configuration Plugin for WordPress
 *
 * This plugin provides optimized Vite 6 configuration for WordPress development
 * with a fully modern approach. It serves as the single source of truth for all
 * plugin configuration.
 */
export function ConfigPlugin(pluginConfig: PluginConfig): Plugin {
	// Store the resolved config globally for other plugins to access
	resolvedConfig = {
		...pluginConfig,
		// Normalize outDir if provided
		build: {
			...pluginConfig.build,
			outDir: pluginConfig.build?.outDir
				? (FilePathResolver.normalizePath(pluginConfig.build.outDir) ??
					undefined)
				: undefined,
		},
	};

	return {
		name: 'vite-plugin-gutenberg-config',

		config: (_, { mode }) => {
			// Generate the Vite config from our unified config
			const generatedConfig = config(
				{
					build: {
						outDir: resolvedConfig?.build?.outDir,
						minify: resolvedConfig?.build?.minify ?? 'esbuild',
						sourcemap: resolvedConfig?.build?.sourcemap ?? false,
						target: resolvedConfig?.build?.target,
						cssCodeSplit: resolvedConfig?.build?.cssCodeSplit,
						terserOptions: resolvedConfig?.build?.terserOptions,
						resolve: resolvedConfig?.build?.resolve,
					},
					server: resolvedConfig?.server ?? {},
				},
				mode
			);

			// Store the generated Vite config for access by other plugins
			viteConfig = generatedConfig;

			return generatedConfig;
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

		// Expose the unified configuration through the plugin API
		api: {
			getResolvedConfig: () => resolvedConfig,
			getViteConfig: () => viteConfig,
		},
	};
}
