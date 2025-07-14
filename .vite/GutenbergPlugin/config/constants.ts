/**
 * Constants and configuration for the Gutenberg Blocks plugin
 */

import type {
	BlockPatterns,
	WordPressFileOutput,
	AssetFolders,
} from '../types.js';

// File patterns for block discovery
export const BLOCK_PATTERNS: BlockPatterns = {
	BLOCK_JSON: '**/block.json',
	SCRIPT_EXTENSIONS: ['.js', '.jsx', '.ts', '.tsx'] as const,
	STYLE_EXTENSIONS: ['.css', '.scss', '.sass'] as const,
};

// WordPress file naming conventions
export const WORDPRESS_FILE_OUTPUT: WordPressFileOutput = {
	EDITOR_SCRIPT: 'index.js',
	EDITOR_STYLE: 'index.css',
	STYLE: 'style-index.css',
	VIEW_SCRIPT: 'view.js',
	RENDER: 'render.php',
	BLOCK_JSON: 'block.json',
};

// Asset folder names for organized chunk structure
export const ASSET_FOLDERS: AssetFolders = {
	COMMON: 'assets/common',
	FRONTEND: 'assets/frontend',
	EDITOR: 'assets/editor',
};
