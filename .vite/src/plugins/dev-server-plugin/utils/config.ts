/**
 * Configuration Utilities
 *
 * Utilities for managing plugin configuration and script injection options.
 */

import type { InlineAssetsConfig, ProcessedInlineConfig } from '../types.js';

/**
 * Default configuration values
 */
export const DEFAULT_INLINE_CONFIG = {
	inlineAssets: ['assets/sanitize.css', 'assets/inline.css'],
	watchPatterns: [
		'src/app/styles/inline/**/*.css',
		'resources/app/styles/inline/**/*.css',
	],
	blocksConfig: {
		blocksDir: {} as Record<string, string>,
		outDir: 'build',
		blockNamespace: 'wp',
	},
	scriptInjection: {
		method: 'inline' as const,
		pollingInterval: 500,
		themePrefix: undefined,
		viteServerUrl: undefined,
		vitePort: '5173',
	},
};

/**
 * Process and validate inline assets configuration
 */
export function processInlineConfig(
	config: InlineAssetsConfig = {}
): ProcessedInlineConfig {
	const processed: ProcessedInlineConfig = {
		inlineAssets: config.inlineAssets || DEFAULT_INLINE_CONFIG.inlineAssets,
		watchPatterns:
			config.watchPatterns || DEFAULT_INLINE_CONFIG.watchPatterns,
		blocksConfig: {
			blocksDir:
				config.blocksConfig?.blocksDir ||
				DEFAULT_INLINE_CONFIG.blocksConfig.blocksDir,
			outDir:
				config.blocksConfig?.outDir ||
				DEFAULT_INLINE_CONFIG.blocksConfig.outDir,
			blockNamespace:
				config.blocksConfig?.blockNamespace ||
				DEFAULT_INLINE_CONFIG.blocksConfig.blockNamespace,
		},
		scriptInjection: {
			method:
				config.scriptInjection?.method ||
				DEFAULT_INLINE_CONFIG.scriptInjection.method,
			pollingInterval:
				config.scriptInjection?.pollingInterval ||
				DEFAULT_INLINE_CONFIG.scriptInjection.pollingInterval,
			themePrefix: config.scriptInjection?.themePrefix,
			viteServerUrl: config.scriptInjection?.viteServerUrl,
			vitePort:
				config.scriptInjection?.vitePort ||
				DEFAULT_INLINE_CONFIG.scriptInjection.vitePort,
		},
	};

	// Validate configuration
	validateInlineConfig(processed);

	return processed;
}

/**
 * Validate configuration values
 */
function validateInlineConfig(config: ProcessedInlineConfig): void {
	// Validate script injection method
	const validMethods = ['inline', 'external', 'module'];
	if (!validMethods.includes(config.scriptInjection.method)) {
		throw new Error(
			`Invalid script injection method: ${config.scriptInjection.method}. Must be one of: ${validMethods.join(', ')}`
		);
	}

	// Validate polling interval
	if (config.scriptInjection.pollingInterval < 100) {
		console.warn(
			`[DevServer] Polling interval of ${config.scriptInjection.pollingInterval}ms is very low and may impact performance.`
		);
	}

	// Validate block namespace
	if (!/^[a-z][a-z0-9-]*$/.test(config.blocksConfig.blockNamespace)) {
		console.warn(
			`[DevServer] Block namespace '${config.blocksConfig.blockNamespace}' should be lowercase with hyphens.`
		);
	}
}

/**
 * Generate script injection options based on method
 */
export function getScriptInjectionOptions(
	method: 'inline' | 'external' | 'module'
) {
	switch (method) {
		case 'inline':
			return {
				endpoint: '/__vite_inline_assets',
				inline: true,
				type: 'text/javascript',
			};
		case 'external':
			return {
				endpoint: '/__vite_inline_assets.js',
				inline: false,
				type: 'text/javascript',
			};
		case 'module':
			return {
				endpoint: '/__vite_inline_assets.mjs',
				inline: false,
				type: 'module',
			};
		default:
			return getScriptInjectionOptions('inline');
	}
}
