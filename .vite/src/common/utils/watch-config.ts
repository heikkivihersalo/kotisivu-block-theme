/**
 * Unified HMR Watch Configuration Utilities
 *
 * Provides a centralized system for managing Hot Module Replacement (HMR)
 * file watching patterns across all Vite plugins. This eliminates duplication
 * and ensures consistent watch behavior for development.
 */

import type { PluginConfig } from '../types/plugin-config.js';

/**
 * HMR watch configuration with categorized patterns
 */
export interface HMRWatchConfig {
	/** PHP files (templates, blocks, functions) */
	php: string[];
	/** CSS files (styles, assets) */
	css: string[];
	/** JavaScript/TypeScript files */
	scripts: string[];
	/** Block-specific files */
	blocks: string[];
	/** Inline asset patterns */
	inline: string[];
}

/**
 * Default HMR watch patterns organized by category
 */
export const DEFAULT_HMR_WATCH_PATTERNS: HMRWatchConfig = {
	php: [
		'./resources/widgets/**/*.php',
		'./app/**/*.php',
		'./functions.php',
		'./templates/**/*.php',
		'./parts/**/*.php',
	],
	css: ['./resources/app/styles/**/*.css', './src/app/styles/**/*.css'],
	scripts: [
		'./resources/app/scripts/**/*.ts',
		'./resources/app/scripts/**/*.js',
		'./src/app/scripts/**/*.ts',
		'./src/app/scripts/**/*.js',
	],
	blocks: [
		'./resources/widgets/block-library/**/*',
		'./resources/widgets/template-parts/**/*',
		'./resources/widgets/page-templates/**/*',
	],
	inline: [
		'./resources/app/styles/inline/**/*.css',
		'./src/app/styles/inline/**/*.css',
		'./build/assets/sanitize.css',
		'./build/assets/inline.css',
	],
};

/**
 * Process and normalize HMR watch configuration from unified config
 */
export function processHMRWatchConfig(
	config: PluginConfig = {}
): HMRWatchConfig {
	const hmrConfig = config.hmr?.watch || {};

	return {
		php: [...DEFAULT_HMR_WATCH_PATTERNS.php, ...(hmrConfig.php || [])],
		css: [...DEFAULT_HMR_WATCH_PATTERNS.css, ...(hmrConfig.css || [])],
		scripts: [
			...DEFAULT_HMR_WATCH_PATTERNS.scripts,
			...(hmrConfig.scripts || []),
		],
		blocks: [
			...DEFAULT_HMR_WATCH_PATTERNS.blocks,
			...(hmrConfig.blocks || []),
		],
		inline: [
			...DEFAULT_HMR_WATCH_PATTERNS.inline,
			...(hmrConfig.inline || []),
		],
	};
}

/**
 * Get all HMR watch patterns as a flat array
 */
export function getAllHMRWatchPatterns(watchConfig: HMRWatchConfig): string[] {
	return [
		...watchConfig.php,
		...watchConfig.css,
		...watchConfig.scripts,
		...watchConfig.blocks,
		...watchConfig.inline,
	];
}

/**
 * Get HMR watch patterns for specific categories
 */
export function getHMRWatchPatterns(
	watchConfig: HMRWatchConfig,
	categories: (keyof HMRWatchConfig)[]
): string[] {
	return categories.flatMap((category) => watchConfig[category]);
}

/**
 * Get inline asset specific watch patterns for HMR
 */
export function getInlineAssetWatchPatterns(
	watchConfig: HMRWatchConfig
): string[] {
	return [
		...watchConfig.inline,
		...watchConfig.css, // Include general CSS patterns for inline processing
	];
}

/**
 * Get block-specific watch patterns for HMR
 */
export function getBlockWatchPatterns(watchConfig: HMRWatchConfig): string[] {
	return [
		...watchConfig.blocks,
		...watchConfig.php.filter((pattern: string) =>
			pattern.includes('block')
		),
	];
}

/**
 * Check if HMR is enabled in configuration
 */
export function isHMREnabled(config: PluginConfig): boolean {
	return config.hmr?.enabled !== false; // Default to true unless explicitly disabled
}

/**
 * Get HMR server configuration
 */
export function getHMRServerConfig(config: PluginConfig) {
	return {
		enabled: isHMREnabled(config),
		port: config.hmr?.port || config.server?.port || 5173,
	};
}

/**
 * Legacy compatibility: convert to old watchPatterns format
 * @deprecated Use the new HMR-focused approach instead
 */
export function toLegacyWatchPatterns(watchConfig: HMRWatchConfig): string[] {
	console.warn(
		'[HMRWatchConfig] toLegacyWatchPatterns is deprecated. Use the new HMR-focused approach.'
	);
	return getAllHMRWatchPatterns(watchConfig);
}
