/**
 * Internal dependencies
 */
import type { BasePluginConfig, DirectoryMapping } from './base.ts';

/**
 * Plugin configuration options for multi-block builds
 */
export type PluginConfig = BasePluginConfig & {
	terserOptions?: {
		compress?: Record<string, any>;
		mangle?: Record<string, any>;
		format?: Record<string, any>;
	};
	build: BasePluginConfig & {
		minify?: boolean | 'esbuild' | 'terser';
		target?: string;
		assetsDir?: DirectoryMapping;
		blocksDir?: DirectoryMapping;
		cssCodeSplit?: boolean;
	};
};
