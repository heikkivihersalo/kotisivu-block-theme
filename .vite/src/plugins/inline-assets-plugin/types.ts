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
}
