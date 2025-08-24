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
	// Discovery hooks (currently used)
	BLOCKS_DISCOVERED: 'blocks:discovered',
} as const;

/**
 * Filters for data transformation
 */
export const FILTERS = {
	// Discovery filters (currently used)
	DISCOVERED_BLOCKS: 'filter:discovered_blocks',
} as const;
