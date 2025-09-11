/**
 * External dependencies
 */
import type { ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import type { ResolvedPluginConfig } from '../../config-plugin/index.js';
import { BuildMapResolver } from '../../../common/services/BuildMapResolver';
import { getScriptInjectionOptions } from '../utils/config.js';

/**
 * PluginStateManager handles plugin state and configuration
 */
export class PluginStateManager {
	private pluginConfig: ResolvedPluginConfig | null = null;
	private configPluginApi: any = null;
	private blocksPluginApi: any = null;
	private assetsPluginApi: any = null;
	private buildMapResolver: BuildMapResolver | null = null;
	private scriptOptions: any = null;

	/**
	 * Initialize state from resolved Vite config
	 */
	initializeFromConfig(config: ResolvedConfig): void {
		// Find the ConfigPlugin in the resolved plugins
		const configPlugin = config.plugins.find(
			(plugin: any) => plugin.name === 'vite-plugin-gutenberg-config'
		);

		if (!configPlugin?.api) {
			throw new Error(
				'DevServerPlugin requires ConfigPlugin to be loaded first'
			);
		}

		this.configPluginApi = configPlugin.api;
		this.pluginConfig = this.configPluginApi.getPluginConfig();

		if (!this.pluginConfig) {
			throw new Error('ConfigPlugin has not resolved configuration yet');
		}

		// Find the BlocksPlugin in the resolved plugins
		const blocksPlugin = config.plugins.find(
			(plugin: any) => plugin.name === 'vite-plugin-gutenberg-blocks'
		);

		if (!blocksPlugin?.api) {
			throw new Error(
				'DevServerPlugin requires BlocksPlugin to be loaded first'
			);
		}

		this.blocksPluginApi = blocksPlugin.api;

		// Find the AssetsPlugin in the resolved plugins (optional)
		const assetsPlugin = config.plugins.find(
			(plugin: any) => plugin.name === 'vite-plugin-gutenberg-assets'
		);

		if (assetsPlugin?.api) {
			this.assetsPluginApi = assetsPlugin.api;
		}

		// Initialize the BuildMapResolver using config
		this.buildMapResolver = new BuildMapResolver(
			this.pluginConfig.build?.outDir || 'build',
			this.pluginConfig.build?.css || 'css'
		);

		// Get script injection options if HMR is enabled
		if (this.pluginConfig.hmr?.enabled !== false) {
			this.scriptOptions = getScriptInjectionOptions(
				this.pluginConfig.hmr?.scriptInjection?.method || 'inline'
			);
		}
	}

	/**
	 * Get plugin configuration
	 */
	getPluginConfig(): ResolvedPluginConfig {
		if (!this.pluginConfig) {
			throw new Error('Plugin configuration not initialized');
		}
		return this.pluginConfig;
	}

	/**
	 * Get build map resolver
	 */
	getBuildMapResolver(): BuildMapResolver {
		if (!this.buildMapResolver) {
			throw new Error('BuildMapResolver not initialized');
		}
		return this.buildMapResolver;
	}

	/**
	 * Get script injection options
	 */
	getScriptOptions(): any {
		return this.scriptOptions;
	}

	/**
	 * Get blocks plugin API
	 */
	getBlocksPluginApi(): any {
		return this.blocksPluginApi;
	}

	/**
	 * Get assets plugin API
	 */
	getAssetsPluginApi(): any {
		return this.assetsPluginApi;
	}

	/**
	 * Get config plugin API
	 */
	getConfigPluginApi(): any {
		return this.configPluginApi;
	}

	/**
	 * Check if HMR is enabled
	 */
	isHMREnabled(): boolean {
		return this.pluginConfig?.hmr?.enabled !== false;
	}
}
