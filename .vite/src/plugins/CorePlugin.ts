/**
 * External dependencies
 */
import type { PluginContext, OutputOptions, OutputBundle } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import { generateBundle } from '../bundle';
import { options, outputOptions } from '../options';
import { transform } from '../transform';

import type { ChunkInfo, AssetInfo, BlockInfo } from '../../types/index.js';

interface CorePluginConfig {
	dependencies?: string[];
	discoveredBlocks?: BlockInfo[];
}

/**
 * Vite plugin for core WordPress Gutenberg functionality
 *
 * This plugin is responsible for:
 * - Handling code transformations
 * - Generating final bundles
 */
export function CorePlugin(pluginConfig: CorePluginConfig): Plugin {
	const { dependencies = [], discoveredBlocks = [] } = pluginConfig;

	let _config: ResolvedConfig;

	// Default WordPress dependencies that should always be externalized
	const defaultDependencies = ['react', 'react-dom'];

	// Merge default dependencies with user-provided dependencies (avoiding duplicates)
	const allDependencies = [
		...defaultDependencies,
		...dependencies.filter((dep) => !defaultDependencies.includes(dep)),
	];

	return {
		name: 'vite-plugin-gutenberg-core',

		configResolved(resolvedConfig: ResolvedConfig) {
			_config = resolvedConfig;
		},

		options,
		outputOptions,

		transform: async function (
			this: PluginContext,
			code: string,
			id: string
		) {
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
				_config
			);

			// The transform function returns string | boolean | void
			// Vite expects TransformResult which can be string, {code: string} or null/undefined
			if (typeof result === 'string') {
				return { code: result };
			}

			// Return null if the transform didn't process this file
			return null;
		},

		generateBundle: function (
			this: PluginContext,
			options: OutputOptions,
			bundle: OutputBundle
		) {
			// Convert Rollup bundle to our custom bundle format
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

		// Expose configuration for other plugins
		api: {
			getConfig: () => _config,
			getAllDependencies: () => allDependencies,
		},
	};
}
