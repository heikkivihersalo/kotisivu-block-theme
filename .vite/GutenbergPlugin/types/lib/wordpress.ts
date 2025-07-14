/**
 * WordPress-specific types and configurations
 */

// Block patterns and file extensions
export type BlockPatterns = {
	BLOCK_JSON: string;
	SCRIPT_EXTENSIONS: readonly string[];
	STYLE_EXTENSIONS: readonly string[];
};

// WordPress file output conventions
export type WordPressFileOutput = {
	EDITOR_SCRIPT: string;
	EDITOR_STYLE: string;
	STYLE: string;
	VIEW_SCRIPT: string;
	RENDER: string;
	BLOCK_JSON: string;
};

// Asset folder structure
export type AssetFolders = {
	COMMON: string;
	FRONTEND: string;
	EDITOR: string;
};
