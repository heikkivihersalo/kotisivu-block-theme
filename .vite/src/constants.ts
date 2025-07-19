/**
 * Common constants used throughout the Vite plugin
 */

/**
 * Supported file extensions
 */
export const FILE_EXTENSIONS = {
	SCRIPTS: ['.js', '.jsx', '.ts', '.tsx'] as const,
	STYLES: ['.css', '.scss', '.sass', '.less'] as const,
} as const;

/**
 * Common file names and patterns
 */
export const FILE_NAMES = {
	BLOCK_CONFIG: 'block.json',
	DEFAULT_SCRIPT_ENTRY: 'index.jsx',
	DEFAULT_SCRIPT_OUTPUT: 'index.js',
	DEFAULT_STYLE_ENTRY: 'index.css',
	STYLE_INDEX: 'style-index.css',
	EDITOR_STYLE: 'editor',
	MAIN_STYLE: 'style',
} as const;

/**
 * ESBuild configuration constants
 */
export const ESBUILD_CONFIG = {
	PLATFORM: 'browser' as const,
	TARGET: 'es2020' as const,
	JSX_TRANSFORM: 'transform' as const,
	LOADER_MAP: {
		'.js': 'jsx',
		'.jsx': 'jsx',
		'.ts': 'tsx',
		'.tsx': 'tsx',
	} as const,
} as const;

/**
 * WordPress-specific constants
 */
export const WORDPRESS_CONFIG = {
	JSX_FACTORY: 'wp.element.createElement',
	JSX_FRAGMENT: 'wp.element.Fragment',
} as const;

/**
 * Common style file patterns for WordPress blocks
 */
export const STYLE_FILE_PATTERNS = {
	INDEX_CSS_ALTERNATIVES: ['editor', 'style', 'index'],
	STYLE_INDEX_ALTERNATIVES: ['style', 'style-index', 'index'],
} as const;

/**
 * Regular expression patterns
 */
export const REGEX_PATTERNS = {
	CSS_FILE_EXTENSION: /\.(post|s)?css$/i,
	SCRIPT_FILE_EXTENSION: /\.(js|jsx|ts|tsx)$/,
	STYLE_FILE_EXTENSION: /\.(css|scss|sass|less)$/,
} as const;
