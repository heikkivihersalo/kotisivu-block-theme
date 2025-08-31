/**
 * Build and compilation configuration types
 */

/**
 * Build environment configuration options
 */
export type BuildEnvironmentConfig = {
	outDir?: string;
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	minify?: boolean | 'esbuild' | 'terser';
	target?: string;
	cssCodeSplit?: boolean;
};

/**
 * Dependency configuration for builds
 */
export type DependencyConfig = {
	dependencies?: string[];
};

/**
 * HMR configuration for builds
 */
export type HMRBuildConfig = {
	enabled?: boolean;
	watch?: {
		php?: string[];
		css?: string[];
		scripts?: string[];
		blocks?: string[];
		inline?: string[];
	};
};

/**
 * Complete build configuration
 */
export type BuildConfig = BuildEnvironmentConfig &
	DependencyConfig &
	HMRBuildConfig;

/**
 * Terser-specific optimization options
 */
export type TerserConfig = {
	compress?: Record<string, any>;
	mangle?: Record<string, any>;
	format?: Record<string, any>;
};
