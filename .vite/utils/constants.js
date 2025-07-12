/**
 * Shared constants across utils
 * These constants are used by multiple utils but don't create cross-dependencies
 */

/**
 * File patterns for block discovery
 */
export const BLOCK_PATTERNS = {
	BLOCK_JSON: '**/block.json',
	SCRIPT_EXTENSIONS: ['index.ts', 'index.tsx', 'index.js', 'index.jsx'],
	STYLE_EXTENSIONS: ['style.css', 'style.scss', 'editor.css', 'editor.scss'],
};

/**
 * WordPress file naming conventions
 */
export const WORDPRESS_FILES = {
	BLOCK_JSON: 'block.json',
	RENDER_PHP: 'render.php',
	STYLE_CSS: 'style.css',
	EDITOR_CSS: 'editor.css',
};

/**
 * Build output conventions
 */
export const OUTPUT_PATTERNS = {
	INDEX_CSS: 'index-css',
	STYLE_INDEX: 'style-index',
	EDITOR_DEPENDENCIES: 'editor-dependencies',
	REACT_RUNTIME: 'react-runtime',
};

/**
 * Chunk naming patterns for file organization
 */
export const CHUNK_PATTERNS = {
	ROOT_SUFFIX: '__ROOT__',
	EDITOR_SUFFIX: '__EDITOR__',
	REACT_RUNTIME: 'react-runtime',
	EDITOR_DEPENDENCIES: 'editor-dependencies',
	WP_EDITOR: 'wp-editor',
};
