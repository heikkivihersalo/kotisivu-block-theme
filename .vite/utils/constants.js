/**
 * Shared constants across utils
 * These constants are used by multiple utils but don't create cross-dependencies
 */

/**
 * File patterns for block discovery
 */
export const BLOCK_PATTERNS = {
	BLOCK_JSON: '**/block.json',
	SCRIPT_EXTENSIONS: ['.ts', '.tsx', '.js', '.jsx'],
	STYLE_EXTENSIONS: ['.css', '.scss'],
};

/**
 * WordPress file naming conventions
 * These are used to standardize input/output file names across the build process.
 *
 */
export const WORDPRESS_FILE_OUTPUT = {
    /**
     * This is copied from the block folder
     * It is used to define the block's metadata and structure.
     */
	BLOCK_JSON: 'block.json',
    /**
     * This is copied from the block folder
     * It is used to define block's rendering logic in PHP.
     */
	RENDER_PHP: 'render.php',
    /**
     * This is bundled from the index.js|index.jsx|index.ts|index.tsx file
     * It is the main entry point for the block's JavaScript logic.
     * It is used to register the block in WordPress.
     */
	FRONTEND_CSS: 'style-index.css',
    /**
     * This is bundled from the edit.js|edit.jsx|edit.ts|edit.tsx file
     * It is used to define the block's editor-specific styles.
     */
	EDITOR_CSS: 'index.css',
    /**
     * This is bundled from the index.js|index.jsx|index.ts|index.tsx file
     * It is used to define the block's main JavaScript logic.
     */
	INDEX_JS: 'index.js',
    /**
     * This is bundled from the view.js|view.jsx|view.ts|view.tsx file
     * It is used to define the block's frontend rendering logic.
     */
	VIEW_JS: 'view.js',
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

/**
 * Build output conventions
 */
export const OUTPUT_PATTERNS = {
	INDEX_CSS: 'index-css',
	STYLE_INDEX: 'style-index',
	EDITOR_DEPENDENCIES: 'editor-dependencies',
	REACT_RUNTIME: 'react-runtime',
};
