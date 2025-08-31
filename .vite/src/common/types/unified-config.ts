/**
 * Unified Plugin Configuration System
 *
 * This file provides a single, simplified configuration that all WordPress Vite plugins share.
 * No more scattered configurations or complex inheritance - just one config for everything.
 */

/**
 * Internal dependencies
 */
import type { DirectoryMapping } from './paths.ts';
import type { BlockInfo } from './wordpress.ts';

/**
 * Unified WordPress Vite Plugin Configuration
 *
 * This single configuration object is used by all plugins. Each plugin
 * extracts only the properties it needs from this shared configuration.
 */
export interface UnifiedPluginConfig {
	/** Output directory for built assets */
	outDir?: string;

	/** Source map generation configuration */
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';

	/** Asset minification strategy */
	minify?: boolean | 'esbuild' | 'terser';

	/** Build target for transpilation */
	target?: string;

	/** CSS code splitting configuration */
	cssCodeSplit?: boolean;

	/** File watching patterns */
	watch?: string[];

	/** WordPress dependencies to externalize */
	dependencies?: string[];

	/** Directory mapping for assets */
	assetsDir?: DirectoryMapping;

	/** Directory mapping for blocks */
	blocksDir: DirectoryMapping; // Required for multi-block builds

	/** Pre-discovered blocks (optional) */
	discoveredBlocks?: BlockInfo[];

	/** Development server host */
	host?: string;

	/** Development server port */
	port?: number;

	/** Full development server URL */
	devServerUrl?: string;

	/** Enable strict port (fail if port is already in use) */
	strictPort?: boolean;

	/** CORS configuration */
	cors?: boolean;

	/** HTTPS configuration */
	https?:
		| boolean
		| {
				key: Buffer;
				cert: Buffer;
		  };

	/** Base path for the dev server */
	base?: string;

	/** Source directory */
	srcDir?: string;

	/** CSS handling method */
	css?: string;

	/** Enable manifest generation */
	manifest?: boolean;

	/** Generate PHP manifest file */
	generatePhpManifest?: boolean;

	/** Public path for assets */
	publicPath?: string;

	/** WordPress text domain */
	textDomain?: string;

	/** Terser minification options */
	terserOptions?: {
		compress?: Record<string, any>;
		mangle?: Record<string, any>;
		format?: Record<string, any>;
	};

	/** Module resolution configuration */
	resolve?: {
		extensions?: string[];
		alias?: Record<string, string>;
	};

	/** Environment configuration */
	environment?: {
		mode?: string;
		env?: Record<string, string>;
	};

	/** Inline assets configuration for dev server */
	inlineAssets?: {
		/** List of inline asset paths */
		inlineAssets: string[];

		/** Watch patterns for inline assets */
		watchPatterns: string[];

		/** Blocks configuration for inline assets */
		blocksConfig: {
			blocksDir: DirectoryMapping;
			outDir?: string;
			blockNamespace: string;
		};
	};
}
