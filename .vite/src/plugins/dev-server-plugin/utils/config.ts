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

/**
 * Build development server URL from server configuration
 */
export function buildDevServerUrl(serverConfig: {
	host?: string;
	port?: number;
	protocol?: 'http' | 'https';
}): string | undefined {
	// Don't auto-generate if host is 0.0.0.0 (listen on all interfaces)
	// In this case, let the client auto-detect
	if (!serverConfig.host || serverConfig.host === '0.0.0.0') {
		return undefined;
	}

	// Use explicit protocol or default to https
	const protocol = serverConfig.protocol || 'https';
	const port = serverConfig.port || 5173;

	return `${protocol}://${serverConfig.host}:${port}`;
}
