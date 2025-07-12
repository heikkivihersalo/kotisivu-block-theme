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
 * This includes
 *  - block.json
 *  - render.php
 *  - style.css / style.scss
 *  - editor.css / editor.scss
 *  - index.js / index.ts / index.tsx / index.jsx
 *  - editor.js / editor.ts / editor.tsx / editor.jsx
 *  - view.js / view.ts / view.tsx / view.jsx
 *
 *  edit.js and save.js are imported as index.js so it is not included here.
 */
export const WORDPRESS_FILES = {
	BLOCK_JSON: {
		input: 'block.json',
		output: 'block.json',
	},
	RENDER_PHP: {
		input: 'render.php',
		output: 'render.php',
	},
	STYLE_CSS: {
		input: ['style.css', 'style.scss'],
		output: 'style-index.css',
	},
	EDITOR_CSS: {
		input: ['editor.css', 'editor.scss'],
		output: 'index.css',
	},
	INDEX_JS: {
		input: ['index.js', 'index.ts', 'index.tsx', 'index.jsx'],
		output: 'index.js',
	},
	EDITOR_JS: {
		input: ['editor.js', 'editor.ts', 'editor.tsx', 'editor.jsx'],
		output: 'editor.js',
	},
	VIEW_JS: {
		input: ['view.js', 'view.ts', 'view.tsx', 'view.jsx'],
		output: 'view.js',
	},
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
