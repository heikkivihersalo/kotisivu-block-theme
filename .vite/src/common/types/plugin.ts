/**
 * Plugin configuration options for multi-block builds
 */
export type PluginConfig = {
	dependencies?: string[];
	terserOptions?: {
		compress?: Record<string, any>;
		mangle?: Record<string, any>;
		format?: Record<string, any>;
		output?: Record<string, any>; // Alias for format (legacy support)
	};
	build: {
		outDir?: string;
		minify?: boolean | 'esbuild' | 'terser';
		sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
		target?: string;
		assetsDir?: Record<string, string>;
		blocksDir?: Record<string, string>;
		watch?: string[];
		cssCodeSplit?: boolean;
	};
};
