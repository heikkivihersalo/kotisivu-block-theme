/**
 * External dependencies
 */
import type { ManifestChunk } from 'vite';

/**
 * Configuration types for DevServer plugin
 */
export type DevServerConfig = {
	/**
	 * Development server host (e.g., 'localhost', 'block-theme.local')
	 */
	host?: string;

	/**
	 * Development server port
	 */
	port?: number;

	/**
	 * Base path for the application
	 */
	base?: string;

	/**
	 * Source directory path
	 */
	srcDir?: string;

	/**
	 * Output directory path
	 */
	outDir?: string;

	/**
	 * CSS file extension
	 */
	css?: string;

	/**
	 * Whether to generate manifest
	 */
	manifest?: boolean;

	/**
	 * Full development server URL (e.g., 'http://localhost:5173', 'https://block-theme.local:5173')
	 * If provided, this takes precedence over host and port
	 */
	devServerUrl?: string;

	/**
	 * Inline assets configuration
	 */
	inlineAssets?: InlineAssetsConfig;
};

/**
 * Configuration options for inline assets HMR
 */
export interface InlineAssetsConfig {
	/**
	 * Array of inline asset file paths to monitor for changes
	 * These should be the built CSS files that are used as inline assets
	 */
	inlineAssets?: string[];

	/**
	 * Glob patterns for source files that generate inline assets
	 * When these files change, the plugin will trigger HMR updates
	 */
	watchPatterns?: string[];

	/**
	 * Block directories configuration for auto-discovery
	 */
	blocksConfig?: {
		/**
		 * Directory mappings for blocks (same as used in BlocksPlugin)
		 */
		blocksDir?: Record<string, string>;

		/**
		 * Output directory for built blocks
		 */
		outDir?: string;

		/**
		 * Block namespace prefix (e.g., 'ksd' for 'ksd/part-logo')
		 */
		blockNamespace?: string;
	};

	/**
	 * Script injection configuration
	 */
	scriptInjection?: {
		/**
		 * Method for injecting HMR client script
		 * - 'inline': Inline the script directly in the response (default)
		 * - 'external': Serve as a separate JavaScript file
		 * - 'module': Serve as an ES module
		 */
		method?: 'inline' | 'external' | 'module';

		/**
		 * Polling interval in milliseconds for change detection
		 */
		pollingInterval?: number;

		/**
		 * Theme prefix for generating style IDs (auto-detected from hostname if not provided)
		 */
		themePrefix?: string;

		/**
		 * Custom Vite server URL (auto-detected if not provided)
		 */
		viteServerUrl?: string;

		/**
		 * Custom Vite server port (defaults to '5173')
		 */
		vitePort?: string;
	};
}

/**
 * Block asset information for HMR
 */
export interface BlockAssetInfo {
	buildPath: string;
	sourcePath: string;
	blockSlug: string;
}

/**
 * Processed inline assets configuration
 */
export interface ProcessedInlineConfig {
	inlineAssets: string[];
	watchPatterns: string[];
	blocksConfig: {
		blocksDir: Record<string, string>;
		outDir: string;
		blockNamespace: string;
	};
	scriptInjection: {
		method: 'inline' | 'external' | 'module';
		pollingInterval: number;
		themePrefix?: string;
		viteServerUrl?: string;
		vitePort?: string;
	};
}

/**
 * Interface for BuildMapResolver class
 */
export interface IBuildMapResolver {
	getBuildMap(): Record<string, ManifestChunk>;
	updateBuildMap(newBuildMap: Record<string, ManifestChunk>): void;
	saveBuildMap(): void;
	clearBuildMap(): void;
	addToBuildMap(fileName: string, manifestChunk: ManifestChunk): void;
	createHotUpdateEntry(file: string): void;
}

/**
 * Global window extensions for HMR client configuration
 */
declare global {
	interface Window {
		__VITE_INLINE_ASSETS_CONFIG__?: {
			blockAssets: Array<
				[
					string,
					{
						blockSlug: string;
						sourcePath: string;
						buildPath?: string;
					},
				]
			>;
			blockNamespace: string;
			pollingInterval: number;
			viteServerUrl?: string;
		};
	}
}

export {};
