/**
 * Modern Vite 6 constants for WordPress plugin
 */

/**
 * Configuration object for block discovery behavior
 */
export const DISCOVERY_CONFIG = {
	MAX_RECURSION_DEPTH: 10,
	SKIP_DIRECTORIES: ['node_modules', '.git', 'dist', 'build'],
	VALID_EXTENSIONS: ['.js', '.jsx', '.ts', '.tsx'],
};

/**
 * Supported file extensions
 */
export const FILE_EXTENSIONS = {
	SCRIPTS: ['.js', '.jsx', '.ts', '.tsx'] as const,
	STYLES: ['.css', '.scss', '.sass', '.less'] as const,
} as const;

/**
 * Style file patterns for discovery
 */
export const STYLE_FILE_PATTERNS = [
	'index.css',
	'style.css',
	'editor.css',
	'main.scss',
	'style.scss',
] as const;

export const STYLE_FILE_ALTERNATIVES = {
	INDEX_CSS_ALTERNATIVES: ['index.css', 'main.scss'],
	STYLE_INDEX_ALTERNATIVES: ['style.css', 'style.scss'],
} as const;

/**
 * Common file names and patterns
 */
export const FILE_NAMES = {
	BLOCK_CONFIG: 'block.json',
	DEFAULT_SCRIPT_ENTRY: 'index.jsx',
	DEFAULT_SCRIPT_OUTPUT: 'index.js',
	DEFAULT_STYLE_ENTRY: 'index.css',
	STYLE_INDEX: 'index.css',
} as const;

/**
 * WordPress-specific constants for modern builds
 */
export const WORDPRESS_CONFIG = {
	JSX_FACTORY: 'wp.element.createElement',
	JSX_FRAGMENT: 'wp.element.Fragment',
} as const;

/**
 * ESBuild configuration for consistent builds
 */
export const ESBUILD_CONFIG = {
	PLATFORM: 'browser' as const,
	TARGET: 'es2020',
	JSX_TRANSFORM: 'automatic' as const,
	LOADER_MAP: {
		'.js': 'jsx',
		'.jsx': 'jsx',
		'.ts': 'tsx',
		'.tsx': 'tsx',
		'.css': 'css',
		'.scss': 'css',
		'.sass': 'css',
		'.less': 'css',
	} as const,
} as const;

/**
 * Regular expression patterns
 */
export const REGEX_PATTERNS = {
	CSS_FILE_EXTENSION: /\.(css|scss|sass|less|postcss)$/i,
	SCRIPT_FILE_EXTENSION: /\.(js|jsx|ts|tsx)$/,
	STYLE_FILE_EXTENSION: /\.(css|scss|sass|less)$/,
} as const;

/**
 * WordPress external dependencies (handled by WordPress core)
 */
export const WORDPRESS_EXTERNALS: Record<string, string> = {
	react: 'window.React',
	'react-dom': 'window.ReactDOM',
	'@wordpress/element': 'window.wp.element',
	'@wordpress/blocks': 'window.wp.blocks',
	'@wordpress/block-editor': 'window.wp.blockEditor',
	'@wordpress/components': 'window.wp.components',
	'@wordpress/data': 'window.wp.data',
	'@wordpress/i18n': 'window.wp.i18n',
	'@wordpress/api-fetch': 'window.wp.apiFetch',
	'@wordpress/compose': 'window.wp.compose',
	'@wordpress/hooks': 'window.wp.hooks',
	'@wordpress/notices': 'window.wp.notices',
	'@wordpress/rich-text': 'window.wp.richText',
	'@wordpress/url': 'window.wp.url',
	jquery: 'window.jQuery',
	lodash: 'window.lodash',
} as const;
