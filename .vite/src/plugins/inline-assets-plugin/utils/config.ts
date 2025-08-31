/**
 * Configuration Utilities
 *
 * Utilities for managing plugin configuration and script injection options.
 */

import type { InlineAssetsConfig } from '../types.js';

export interface ProcessedConfig {
	inlineAssets: string[];
	watchPatterns: string[];
	blocksConfig: {
		blocksDir: Record<string, string>;
		outDir: string;
		blockNamespace: string;
	};
	scriptInjection: {
		method: 'inline' | 'external' | 'module';
		pollingInterval: number;
	};
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG = {
	inlineAssets: ['build/assets/sanitize.css', 'build/assets/inline.css'],
	watchPatterns: [
		'src/app/styles/inline/**/*.css',
		'resources/app/styles/inline/**/*.css',
	],
	blocksConfig: {
		blocksDir: {} as Record<string, string>,
		outDir: 'build',
		blockNamespace: 'ksd',
	},
	scriptInjection: {
		method: 'inline' as const,
		pollingInterval: 500,
	},
};

/**
 * Process and validate configuration
 */
export function processConfig(
	config: InlineAssetsConfig = {}
): ProcessedConfig {
	const processed: ProcessedConfig = {
		inlineAssets: config.inlineAssets || DEFAULT_CONFIG.inlineAssets,
		watchPatterns: config.watchPatterns || DEFAULT_CONFIG.watchPatterns,
		blocksConfig: {
			blocksDir:
				config.blocksConfig?.blocksDir ||
				DEFAULT_CONFIG.blocksConfig.blocksDir,
			outDir:
				config.blocksConfig?.outDir ||
				DEFAULT_CONFIG.blocksConfig.outDir,
			blockNamespace:
				config.blocksConfig?.blockNamespace ||
				DEFAULT_CONFIG.blocksConfig.blockNamespace,
		},
		scriptInjection: {
			method:
				config.scriptInjection?.method ||
				DEFAULT_CONFIG.scriptInjection.method,
			pollingInterval:
				config.scriptInjection?.pollingInterval ||
				DEFAULT_CONFIG.scriptInjection.pollingInterval,
		},
	};

	// Validate configuration
	validateConfig(processed);

	return processed;
}

/**
 * Validate configuration values
 */
function validateConfig(config: ProcessedConfig): void {
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
			`[InlineAssets] Polling interval of ${config.scriptInjection.pollingInterval}ms is very low and may impact performance.`
		);
	}

	// Validate block namespace
	if (!/^[a-z][a-z0-9-]*$/.test(config.blocksConfig.blockNamespace)) {
		console.warn(
			`[InlineAssets] Block namespace '${config.blocksConfig.blockNamespace}' should be lowercase with hyphens.`
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
