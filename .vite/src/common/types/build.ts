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
	watch?: string[];
};

/**
 * Complete build configuration
 */
export type BuildConfig = BuildEnvironmentConfig & DependencyConfig;

/**
 * Terser-specific optimization options
 */
export type TerserConfig = {
	compress?: Record<string, any>;
	mangle?: Record<string, any>;
	format?: Record<string, any>;
	output?: Record<string, any>; // Alias for format (legacy support)
};
