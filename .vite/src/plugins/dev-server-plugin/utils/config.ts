/**
 * Configuration Utilities
 *
 * Utilities for managing plugin configuration and script injection options.
 */

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
