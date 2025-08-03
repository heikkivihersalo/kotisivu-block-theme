/**
 * Vite 6 Enhanced Plugin Hooks System
 *
 * Provides a centralized way for plugins to communicate and share data
 * using modern Vite 6 patterns and the improved plugin API
 */

interface PluginHookRegistry {
	[hookName: string]: Array<(...args: any[]) => any>;
}

interface PluginDataStore {
	[key: string]: any;
}

class VitePluginHooks {
	private hooks: PluginHookRegistry = {};
	private dataStore: PluginDataStore = {};

	/**
	 * Register a hook callback
	 */
	addHook(hookName: string, callback: (...args: any[]) => any): void {
		if (!this.hooks[hookName]) {
			this.hooks[hookName] = [];
		}
		this.hooks[hookName].push(callback);
	}

	/**
	 * Execute all callbacks for a hook
	 */
	async doHook(hookName: string, ...args: any[]): Promise<any[]> {
		if (!this.hooks[hookName]) {
			return [];
		}

		const results = [];
		for (const callback of this.hooks[hookName]) {
			try {
				const result = await callback(...args);
				results.push(result);
			} catch (error) {
				console.warn(`Hook ${hookName} callback failed:`, error);
			}
		}
		return results;
	}

	/**
	 * Apply filters (transform data through callbacks)
	 */
	async applyFilters(
		filterName: string,
		value: any,
		...args: any[]
	): Promise<any> {
		if (!this.hooks[filterName]) {
			return value;
		}

		let filteredValue = value;
		for (const callback of this.hooks[filterName]) {
			try {
				filteredValue = await callback(filteredValue, ...args);
			} catch (error) {
				console.warn(`Filter ${filterName} callback failed:`, error);
			}
		}
		return filteredValue;
	}

	/**
	 * Store data for inter-plugin communication
	 */
	setData(key: string, value: any): void {
		this.dataStore[key] = value;
	}

	/**
	 * Retrieve stored data
	 */
	getData(key: string): any {
		return this.dataStore[key];
	}

	/**
	 * Check if hook exists
	 */
	hasHook(hookName: string): boolean {
		return this.hooks[hookName] && this.hooks[hookName].length > 0;
	}

	/**
	 * Remove all callbacks for a hook
	 */
	removeHook(hookName: string): void {
		delete this.hooks[hookName];
	}

	/**
	 * Get all registered hooks
	 */
	getHooks(): string[] {
		return Object.keys(this.hooks);
	}
}

// Global instance for all plugins to share
export const pluginHooks = new VitePluginHooks();

/**
 * Hook names for WordPress Gutenberg workflow
 */
export const HOOKS = {
	// Discovery hooks
	BLOCKS_DISCOVERED: 'blocks:discovered',
	ASSETS_DISCOVERED: 'assets:discovered',

	// Transform hooks
	TRANSFORM_BLOCK: 'transform:block',
	TRANSFORM_ASSET: 'transform:asset',
	TRANSFORM_CSS: 'transform:css',

	// Build hooks
	BUILD_START: 'build:start',
	BUILD_END: 'build:end',
	BUNDLE_GENERATED: 'bundle:generated',

	// Manifest hooks
	MANIFEST_GENERATED: 'manifest:generated',
	MANIFEST_PROCESSED: 'manifest:processed',

	// Environment hooks
	ENVIRONMENT_RESOLVED: 'environment:resolved',
} as const;

/**
 * Filters for data transformation
 */
export const FILTERS = {
	// Discovery filters
	DISCOVERED_BLOCKS: 'filter:discovered_blocks',
	DISCOVERED_ASSETS: 'filter:discovered_assets',

	// Build filters
	BUILD_CONFIG: 'filter:build_config',
	BUNDLE_OPTIONS: 'filter:bundle_options',

	// Output filters
	MANIFEST_DATA: 'filter:manifest_data',
	ASSET_PATH: 'filter:asset_path',

	// WordPress filters
	WP_DEPENDENCIES: 'filter:wp_dependencies',
	WP_ENQUEUE_DATA: 'filter:wp_enqueue_data',
} as const;
