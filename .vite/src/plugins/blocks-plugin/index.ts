/**
 * External dependencies
 */
import { resolve } from 'node:path';
import { readFile, readdir } from 'node:fs/promises';
import type { PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

import { normalizePath } from '../../common/utils';
import { processPhpFiles } from '../../common/processors';
import { generateBlockManifest } from './manifest.js';
import type { BlockInfo, ViteBlocksPluginConfig } from '../../common/types';

/**
 * Internal dependencies
 */
import { sideloadBlocks } from './sideload.ts';
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
	const pwd = process.env.PWD || process.cwd();

	// Validate required configuration
	if (!blocksDir || Object.keys(blocksDir).length === 0) {
		throw new Error('blocksDir is required for BlocksPlugin');
	}

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
			// Discover blocks asynchronously
			await discoverBlocks();

			// Add watch files if specified
			watch.forEach((file: string) => this.addWatchFile(file));

			// Copy static files for each discovered block
			for (const block of discoveredBlocks) {
				const destPath = block.outputPath || block.name;

				// Copy block.json file
				try {
					const blockJsonSrc = resolve(block.path, 'block.json');
					const blockJsonContent = await readFile(
						blockJsonSrc,
						'utf-8'
					);
					this.emitFile({
						type: 'asset',
						fileName: `${destPath}/block.json`,
						source: blockJsonContent,
					});

					// Process PHP files
					const files = await readdir(block.path);
					const phpFiles = files.filter((file) =>
						file.endsWith('.php')
					);

					if (phpFiles.length > 0) {
						const phpFileInfos = phpFiles.map((phpFile) => ({
							sourcePath: resolve(block.path, phpFile),
							outputPath: `${destPath}/${phpFile}`,
						}));

						const shouldMinify =
							process.env.NODE_ENV === 'production';
						processPhpFiles(this, phpFileInfos, shouldMinify);
					}
				} catch {
					// Skip blocks with missing or invalid files
					continue;
				}
			}

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
