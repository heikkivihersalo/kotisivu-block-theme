/**
 * Path and file system related types
 */

/**
 * File path information
 */
export type FilePathInfo = {
	sourcePath: string;
	outputPath: string;
	relativePath?: string;
};

/**
 * Required file path information for discovered assets
 */
export type DiscoveredFilePathInfo = FilePathInfo & {
	relativePath: string; // Always required for discovered files
};

/**
 * File identification properties
 */
export type FileIdentifier = {
	name: string;
	fileName?: string;
};

/**
 * Directory mapping for source to output paths
 */
export type DirectoryMapping = Record<string, string>;

/**
 * Output directory configuration
 */
export type OutputDirectoryConfig = {
	basePath: string;
	blockOutputDir: string;
	outputPath?: string;
};
