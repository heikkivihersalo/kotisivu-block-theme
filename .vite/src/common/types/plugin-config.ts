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
 * This is the single source of truth for all plugin configuration.
 * All plugins access this configuration directly using optional chaining
 * (e.g., config.build?.outDir, config.server?.port).
 *
 * Configuration is organized into logical categories:
 * - build: Build process and asset compilation settings
 * - server: Development server configuration
 * - paths: Directory and file path settings
 * - wordpress: WordPress-specific settings
 * - environment: Environment and runtime configuration
 * - hmr: Hot Module Replacement configuration
 */
export interface PluginConfig {
	/** Build and compilation configuration */
	build?: {
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

		/** Enable manifest generation */
		manifest?: boolean;

		/** Generate PHP manifest file */
		generatePhpManifest?: boolean;

		/** Public path for assets */
		publicPath?: string;

		/** CSS handling method */
		css?: string;

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
	};

	/** Development server configuration */
	server?: {
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
	};

	/** Path and directory configuration */
	paths?: {
		/** Source directory */
		srcDir?: string;

		/** Directory mapping for assets */
		assetsDir?: DirectoryMapping;

		/** Directory mapping for inline assets */
		inlineDir?: DirectoryMapping;

		/** Directory mapping for blocks */
		blocksDir?: DirectoryMapping;
	};

	/** WordPress-specific configuration */
	wordpress?: {
		/** WordPress dependencies to externalize */
		dependencies?: string[];

		/** WordPress text domain */
		textDomain?: string;

		/** Namespace for blocks */
		namespace?: string;

		/** Pre-discovered blocks (optional) */
		discoveredBlocks?: BlockInfo[];
	};

	/** Environment and runtime configuration */
	environment?: {
		/** Build mode (development, production, etc.) */
		mode?: string;

		/** Environment variables */
		env?: Record<string, string>;
	};

	/** Hot Module Replacement (HMR) configuration */
	hmr?: {
		/** Enable/disable HMR */
		enabled?: boolean;

		/** HMR server port (if different from dev server) */
		port?: number;

		/** Watch configuration for HMR. Supports wildcard as glob pattern */
		watch?: {
			/** PHP files (templates, blocks, functions) */
			php?: string[];

			/** CSS files (styles, assets) */
			css?: string[];

			/** JavaScript/TypeScript files */
			scripts?: string[];

			/** Block-specific files */
			blocks?: string[];

			/** Inline asset patterns */
			inline?: string[];
		};

		/** Script injection configuration */
		scriptInjection?: {
			method?: 'inline' | 'external' | 'module';
			pollingInterval?: number;
		};
	};
}
