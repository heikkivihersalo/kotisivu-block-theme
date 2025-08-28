/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

import { normalizePath } from '../../common/utils';
import { BlockHandler } from '../../common/handlers';
import { generateBlockManifest } from './manifest.js';
import type { BlockInfo, ViteBlocksPluginConfig } from '../../common/types';

/**
 * Internal dependencies
 */
import { discoverBlocksWithMappings } from './discovery.ts';

/**
 * Vite plugin for handling WordPress Gutenberg blocks
 *
 * This plugin is responsible for:
 * - Discovering blocks from configured directories
 * - Sideloading block entry points
 * - Generating block manifest files
 */
export function BlocksPlugin(config: ViteBlocksPluginConfig): Plugin {
	const { blocksDir, outDir, sourcemap = false, watch = [] } = config;

	let outputDirectory: string;
	let discoveredBlocks: BlockInfo[] = [];
	let blockHandler: BlockHandler;
	const pwd = process.env.PWD || process.cwd();

	// Validate required configuration
	if (!blocksDir || Object.keys(blocksDir).length === 0) {
		throw new Error('blocksDir is required for BlocksPlugin');
	}

	// Check if this is build mode vs serve mode
	const isBuildMode = () => process.argv.includes('build');

	// Async discovery function
	const discoverBlocks = async () => {
		discoveredBlocks = discoverBlocksWithMappings(blocksDir, pwd);
		if (discoveredBlocks.length === 0) {
			throw new Error(
				'No blocks discovered. Check your blocksDir configuration'
			);
		}
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
			// Initialize block handler with output directory and full context
			blockHandler = new BlockHandler({
				context: this,
				outputDirectory,
			});

			// Discover blocks asynchronously
			await discoverBlocks();

			// Add watch files if specified
			watch.forEach((file: string) => this.addWatchFile(file));

			// Process discovered blocks for both dev and build modes
			for (const block of discoveredBlocks) {
				await blockHandler.sideload({ block, sourcemap });
			}

			// Generate block manifest
			await generateBlockManifest.call(this, discoveredBlocks);
		},

		generateBundle: async function (this: PluginContext) {
			// Only copy static files in build mode
			if (!isBuildMode()) {
				console.log('Skipping static file copying in serve mode');
				return;
			}

			// Determine if we should minify based on environment
			const shouldMinify = process.env.NODE_ENV === 'production';

			// Copy static files for each discovered block (only in build mode)
			for (const block of discoveredBlocks) {
				try {
					// Use BlockHandler to process all static files
					await blockHandler.processBlockStaticFiles(
						block,
						shouldMinify
					);
				} catch (error) {
					console.log(
						`[generateBundle] Failed to copy static files for ${block.name}:`,
						error
					);
					// Skip blocks with missing or invalid files
					continue;
				}
			}
		},

		// Expose discovered blocks for other plugins
		api: {
			getDiscoveredBlocks: () => discoveredBlocks,
		},
	};
}
