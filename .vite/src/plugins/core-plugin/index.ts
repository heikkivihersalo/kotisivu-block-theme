/**
 * External dependencies
 */
import type { OutputBundle, OutputOptions, PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

/**
 * Shared dependencies
 */
import type { BlockInfo } from '../../common/types/blocks.ts';
import type { AssetInfo, ChunkInfo } from '../../common/types/rollup.ts';

/**
 * Internal dependencies
 */
import { generateBundle } from './bundler.ts';
import { transform } from './transform';

type Props = {
	dependencies?: string[];
	discoveredBlocks?: BlockInfo[];
};

/**
 * Modern Vite 6 plugin for core WordPress Gutenberg functionality
 *
 * No backward compatibility - pure Vite 6 approach with:
 * - this.environment API
 * - Modern plugin hooks
 * - Enhanced bundle generation
 */
export function CorePlugin(pluginConfig: Props): Plugin {
	const { dependencies = [], discoveredBlocks = [] } = pluginConfig;

	let _config: ResolvedConfig;

	// WordPress dependencies that should be externalized
	const defaultDependencies = ['react', 'react-dom'];
	const allDependencies = [
		...defaultDependencies,
		...dependencies.filter((dep) => !defaultDependencies.includes(dep)),
	];

	return {
		name: 'vite-plugin-gutenberg-core',

		configResolved(resolvedConfig: ResolvedConfig) {
			_config = resolvedConfig;
		},

		transform: async function (
			this: PluginContext,
			code: string,
			id: string
		) {
			// Modern Vite 6: Use this.environment directly
			const environment = this.environment;

			// Use the first discovered block for transform context if available
			const targetBlock =
				discoveredBlocks.length > 0
					? discoveredBlocks[0].blockJson
					: {};

			const result = await transform.call(
				this,
				code,
				id,
				targetBlock,
				_config,
				environment
			);

			// Vite 6: Return TransformResult directly
			if (typeof result === 'string') {
				return { code: result };
			}

			return null;
		},

		generateBundle: function (
			this: PluginContext,
			options: OutputOptions,
			bundle: OutputBundle
		) {
			// Modern Vite 6: Direct bundle processing
			const customBundle: { [fileName: string]: ChunkInfo | AssetInfo } =
				{};

			for (const [fileName, bundleItem] of Object.entries(bundle)) {
				if (bundleItem.type === 'chunk') {
					customBundle[fileName] = {
						...bundleItem,
						code: bundleItem.code,
						imports: bundleItem.imports,
					} as ChunkInfo;
				} else {
					customBundle[fileName] = {
						...bundleItem,
						code: bundleItem.source?.toString() || '',
						imports: [],
					} as AssetInfo;
				}
			}

			generateBundle.call(this, options, customBundle, allDependencies);
		},

		// Modern plugin API exposure
		api: {
			getConfig: () => _config,
			getAllDependencies: () => allDependencies,
			getDiscoveredBlocks: () => discoveredBlocks,
		},
	};
}
