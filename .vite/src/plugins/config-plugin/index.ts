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
 * Resolve plugin configuration with defaults
 * This is the single source of truth for all default values
 */
export function resolvePluginConfig(pluginConfig: PluginConfig) {
	return {
		...pluginConfig,
		// Provide default build configuration
		build: {
			// First spread the original config
			...pluginConfig.build,
			// Then apply defaults for any undefined values
			outDir: pluginConfig.build?.outDir
				? (FilePathResolver.normalizePath(pluginConfig.build.outDir) ??
					'build')
				: 'build',
			minify: pluginConfig.build?.minify ?? 'esbuild',
			sourcemap: pluginConfig.build?.sourcemap ?? false,
			target: pluginConfig.build?.target ?? 'es2018',
			cssCodeSplit: pluginConfig.build?.cssCodeSplit ?? true,
			manifest: pluginConfig.build?.manifest ?? true,
			generatePhpManifest:
				pluginConfig.build?.generatePhpManifest ?? true,
			css: pluginConfig.build?.css ?? 'css',
			terserOptions: pluginConfig.build?.terserOptions ?? {},
			resolve: pluginConfig.build?.resolve ?? {},
		},
		// Provide default server configuration
		server: {
			host: pluginConfig.server?.host ?? 'localhost',
			port: pluginConfig.server?.port ?? 5173,
			strictPort: pluginConfig.server?.strictPort ?? true,
			cors: pluginConfig.server?.cors ?? true,
			base: pluginConfig.server?.base ?? '/',
			...pluginConfig.server,
		},
		// Provide default paths configuration
		paths: {
			srcDir: pluginConfig.paths?.srcDir ?? 'resources',
			assetFiles: pluginConfig.paths?.assetFiles ?? {},
			inlineFiles: pluginConfig.paths?.inlineFiles ?? {},
			blocksDir: pluginConfig.paths?.blocksDir ?? {},
			...pluginConfig.paths,
		},
		// Provide default WordPress configuration
		wordpress: {
			dependencies: pluginConfig.wordpress?.dependencies ?? [],
			textDomain: pluginConfig.wordpress?.textDomain ?? 'textdomain',
			namespace: pluginConfig.wordpress?.namespace ?? 'wp',
			discoveredBlocks: pluginConfig.wordpress?.discoveredBlocks ?? [],
			...pluginConfig.wordpress,
		},
		// Provide default HMR configuration
		hmr: {
			enabled: pluginConfig.hmr?.enabled ?? true,
			port: pluginConfig.hmr?.port,
			watch: {
				php: pluginConfig.hmr?.watch?.php || [],
				css: pluginConfig.hmr?.watch?.css || [],
				scripts: pluginConfig.hmr?.watch?.scripts || [],
				blocks: pluginConfig.hmr?.watch?.blocks || [],
				inline: pluginConfig.hmr?.watch?.inline || [],
			},
			scriptInjection: {
				method: pluginConfig.hmr?.scriptInjection?.method || 'inline',
				pollingInterval:
					pluginConfig.hmr?.scriptInjection?.pollingInterval || 500,
			},
		},
	};
}

export type ResolvedPluginConfig = ReturnType<typeof resolvePluginConfig>;

/**
 * Vite 6 Modern Configuration Plugin for WordPress
 *
 * This plugin provides optimized Vite 6 configuration for WordPress development
 * with a fully modern approach. It serves as the single source of truth for all
 * plugin configuration.
 */
export function ConfigPlugin(pluginConfig: PluginConfig): Plugin {
	// Resolve configuration once with all defaults applied
	resolvedConfig = resolvePluginConfig(pluginConfig);

	return {
		name: 'vite-plugin-gutenberg-config',

		config: (_, { mode }) => {
			// Generate the Vite config from our unified config
			const generatedConfig = config(
				resolvedConfig as ResolvedPluginConfig,
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
			getPluginConfig: () => resolvedConfig, // Resolved plugin config
			getViteConfig: () => viteConfig, // Vite user config
		},
	};
}
