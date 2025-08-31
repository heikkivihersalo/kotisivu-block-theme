/**
 * Configuration options for the Inline Assets Plugin
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
