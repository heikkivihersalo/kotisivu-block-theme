/**
 * Environment helpers for Vite 6 `this.environment` API
 */

interface ViteEnvironment {
	config?: {
		consumer?: string;
		build?: {
			outDir?: string;
			cssCodeSplit?: boolean;
		};
	};
	name?: string;
	moduleGraph?: any;
}

/**
 * Check if current environment is server-side rendering
 * Uses Vite 6's new this.environment API instead of options.ssr
 */
export function isServerEnvironment(environment?: ViteEnvironment): boolean {
	// Vite 6 way: check environment.config.consumer
	if (environment?.config?.consumer === 'server') {
		return true;
	}

	// Fallback for environment name checking
	if (environment?.name === 'ssr') {
		return true;
	}

	return false;
}

/**
 * Check if current environment is client-side
 */
export function isClientEnvironment(environment?: ViteEnvironment): boolean {
	return !isServerEnvironment(environment);
}

/**
 * Get environment-specific output directory
 */
export function getEnvironmentOutDir(
	environment?: ViteEnvironment,
	fallback: string = 'dist'
): string {
	return environment?.config?.build?.outDir || fallback;
}

/**
 * Check if CSS code splitting is enabled for current environment
 */
export function isCssCodeSplitEnabled(environment?: ViteEnvironment): boolean {
	return environment?.config?.build?.cssCodeSplit !== false;
}

/**
 * Get environment name for logging/debugging
 */
export function getEnvironmentName(environment?: ViteEnvironment): string {
	return environment?.name || environment?.config?.consumer || 'unknown';
}

/**
 * Create environment context for plugin hooks
 */
export function createEnvironmentContext(environment?: ViteEnvironment) {
	return {
		isServer: isServerEnvironment(environment),
		isClient: isClientEnvironment(environment),
		name: getEnvironmentName(environment),
		outDir: getEnvironmentOutDir(environment),
		cssCodeSplit: isCssCodeSplitEnabled(environment),
		environment,
	};
}
