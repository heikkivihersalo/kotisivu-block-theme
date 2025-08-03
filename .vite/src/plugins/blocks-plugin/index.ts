/**
 * External dependencies
 */
import { resolve } from 'node:path';
import { readFile, readdir } from 'node:fs/promises';
import type { PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

import { FILTERS, HOOKS, pluginHooks } from '../../common/hooks/index.js';
import { normalizePath } from '../../common/utils';
import { generateBlockManifest } from './manifest/index.js';
import type { BlockInfo } from '../../common/types/blocks.ts';

/**
 * Internal dependencies
 */
import { sideloadBlocks } from './sideload';
import { discoverBlocksWithMappings } from './discovery';

type Props = {
	blocksDir: Record<string, string>;
	outDir?: string | undefined;
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	watch?: string[];
};

/**
 * Vite plugin for handling WordPress Gutenberg blocks
 *
 * This plugin is responsible for:
 * - Discovering blocks from configured directories
 * - Sideloading block entry points
 * - Generating block manifest files
 */
export function BlocksPlugin(config: Props): Plugin {
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
		discoveredBlocks = discoverBlocksWithMappings(blocksDir, pwd);

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
				} catch (error) {
					console.warn(
						`Warning: Could not copy block.json for block ${block.name}:`,
						error
					);
				}

				// Copy CSS files with WordPress naming convention
				// editor.css -> index.css (editor styles)
				try {
					const editorCssSrc = resolve(block.path, 'editor.css');
					const editorCssContent = await readFile(
						editorCssSrc,
						'utf-8'
					);
					this.emitFile({
						type: 'asset',
						fileName: `${destPath}/index.css`,
						source: editorCssContent,
					});
				} catch (error) {
					// editor.css doesn't exist, create empty file
					this.emitFile({
						type: 'asset',
						fileName: `${destPath}/index.css`,
						source: '',
					});
				}

				// style.css -> style-index.css (frontend styles)
				try {
					const styleCssSrc = resolve(block.path, 'style.css');
					const styleCssContent = await readFile(
						styleCssSrc,
						'utf-8'
					);
					this.emitFile({
						type: 'asset',
						fileName: `${destPath}/style-index.css`,
						source: styleCssContent,
					});
				} catch (error) {
					// style.css doesn't exist, create empty file
					this.emitFile({
						type: 'asset',
						fileName: `${destPath}/style-index.css`,
						source: '',
					});
				}

				// Copy any PHP files
				try {
					const files = await readdir(block.path);
					const phpFiles = files.filter((file) =>
						file.endsWith('.php')
					);

					for (const phpFile of phpFiles) {
						const phpSrc = resolve(block.path, phpFile);
						const phpFileName = `${destPath}/${phpFile}`;

						try {
							const phpContent = await readFile(phpSrc, 'utf-8');
							this.emitFile({
								type: 'asset',
								fileName: phpFileName,
								source: phpContent,
							});
						} catch (error) {
							console.warn(
								`Warning: Could not copy ${phpFile} for block ${block.name}:`,
								error
							);
						}
					}
				} catch (error) {
					console.warn(
						`Warning: Could not read directory for block ${block.name}:`,
						error
					);
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
