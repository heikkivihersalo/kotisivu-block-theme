/**
 * Constants and configuration for the Gutenberg Blocks plugin
 */

// File patterns for block discovery
export const BLOCK_PATTERNS = {
	BLOCK_JSON: '**/block.json',
	SCRIPT_EXTENSIONS: ['.js', '.jsx', '.ts', '.tsx'],
	STYLE_EXTENSIONS: ['.css', '.scss', '.sass'],
};

// WordPress file naming conventions
export const WORDPRESS_FILE_OUTPUT = {
	EDITOR_SCRIPT: 'index.js',
	EDITOR_STYLE: 'index.css',
	STYLE: 'style-index.css',
	VIEW_SCRIPT: 'view.js',
	RENDER: 'render.php',
	BLOCK_JSON: 'block.json',
};

// Asset folder names for organized chunk structure
export const ASSET_FOLDERS = {
	COMMON: 'assets/common',
	FRONTEND: 'assets/frontend',
	EDITOR: 'assets/editor',
};
