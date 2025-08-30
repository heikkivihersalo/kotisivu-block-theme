/**
 * Internal dependencies
 */
import type { BasePluginConfig, DirectoryMapping } from './base.ts';

/**
 * Development server configuration
 */
export type DevServerConfig = {
	host?: string;
	port?: number;
	devServerUrl?: string;
};

/**
 * Plugin configuration options for multi-block builds
 */
export type PluginConfig = BasePluginConfig & {
	terserOptions?: {
		compress?: Record<string, any>;
		mangle?: Record<string, any>;
		format?: Record<string, any>;
	};
	devServer?: DevServerConfig;
	build: BasePluginConfig & {
		minify?: boolean | 'esbuild' | 'terser';
		target?: string;
		assetsDir?: DirectoryMapping;
		blocksDir?: DirectoryMapping;
		cssCodeSplit?: boolean;
	};
};
