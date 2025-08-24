/**
 * Base types that can be extended by other types
 */

/**
 * Common build configuration options shared across plugins
 */
export type BaseBuildConfig = {
	outDir?: string;
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	dependencies?: string[];
};

/**
 * Base plugin configuration properties
 */
export type BasePluginConfig = BaseBuildConfig & {
	watch?: string[];
};

/**
 * Directory mapping configuration
 */
export type DirectoryMapping = Record<string, string>;

/**
 * Path information for assets and files
 */
export type PathInfo = {
	sourcePath: string;
	outputPath: string;
	relativePath?: string;
};

/**
 * Asset identification
 */
export type AssetIdentifier = {
	name: string;
	fileName?: string;
};
