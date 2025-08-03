/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import { sideloadBlocks } from './sideloadBlocks.js';
import { generateBlockManifest } from './manifest/index.js';
import { discoverBlocksWithMapping } from '../../common/discovery/index.js';
import { normalizePath } from '../../common/index.js';
import { pluginHooks, HOOKS, FILTERS } from '../../common/hooks/index.js';

import type { BlockInfo } from '../../common/types/index.js';

interface BlocksPluginConfig {
	blocksDir: Record<string, string>;
	outDir?: string | undefined;
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	watch?: string[];
}

/**
 * Vite plugin for handling WordPress Gutenberg blocks
 *
 * This plugin is responsible for:
 * - Discovering blocks from configured directories
 * - Sideloading block entry points
 * - Generating block manifest files
 */
export function BlocksPlugin(config: BlocksPluginConfig): Plugin {
	const { blocksDir, outDir, sourcemap = false, watch = [] } = config;

	let outputDirectory: string;
	let discoveredBlocks: BlockInfo[] = [];
	const pwd = process.env.PWD || process.cwd();

	// Validate required configuration
	if (!blocksDir || Object.keys(blocksDir).length === 0) {
		throw new Error(
			'blocksDir is required for BlocksPlugin. This plugin does not support single block builds.'
		);
	}

	// Async discovery function
	const discoverBlocks = async () => {
		// Discover blocks from block paths
		discoveredBlocks = discoverBlocksWithMapping(blocksDir, pwd);

		if (discoveredBlocks.length === 0) {
			throw new Error(
				'No blocks discovered from blocksDir. Ensure blocksDir is configured correctly and points to directories containing block.json files.'
			);
		}

		// Apply discovery filters using the new hook system
		discoveredBlocks = await pluginHooks.applyFilters(
			FILTERS.DISCOVERED_BLOCKS,
			discoveredBlocks,
			{ blocksDir, pwd }
		);

		// Emit discovery hook for other plugins
		await pluginHooks.doHook(HOOKS.BLOCKS_DISCOVERED, discoveredBlocks);
	};

	return {
		name: 'vite-plugin-gutenberg-blocks',

		configResolved(resolvedConfig: ResolvedConfig) {
			if (typeof outDir === 'string') {
				outputDirectory = normalizePath(outDir) || 'dist';
			} else {
				const defaultDir = resolvedConfig.build.outDir;
				outputDirectory =
					typeof defaultDir === 'string' ? defaultDir : 'dist';
			}
		},

		buildStart: async function (this: PluginContext) {
			// Discover blocks asynchronously
			await discoverBlocks();

			// Add watch files if specified
			watch.forEach((file) => this.addWatchFile(file));

			// Process discovered blocks
			for (const block of discoveredBlocks) {
				await sideloadBlocks.call(
					this,
					block.blockJson,
					outputDirectory,
					block.path,
					block.name,
					block.outputPath,
					sourcemap
				);
			}

			// Generate block manifest from discovered blocks
			generateBlockManifest.call(this, discoveredBlocks, outputDirectory);
		},

		// Expose discovered blocks for other plugins
		api: {
			getDiscoveredBlocks: () => discoveredBlocks,
		},
	};
}
