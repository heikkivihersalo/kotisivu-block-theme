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
 * Legacy aliases for backward compatibility
 * These should be gradually phased out in favor of the more descriptive names above
 */

/**
 * @deprecated Use FilePathInfo instead
 */
export type PathInfo = FilePathInfo;

/**
 * @deprecated Use FileIdentifier instead
 */
export type AssetIdentifier = FileIdentifier;
