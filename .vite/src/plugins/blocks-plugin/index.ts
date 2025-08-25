/**
 * External dependencies
 */
import { resolve } from 'node:path';
import { readFile, readdir } from 'node:fs/promises';
import type { PluginContext } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';

import { normalizePath, FileEmitter } from '../../common/utils';
import { PHP_Handler } from '../../common/handlers';
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
	let fileEmitter: FileEmitter;
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

			// Initialize file emitter with output directory
			fileEmitter = new FileEmitter(outputDirectory);
		},

		buildStart: async function (this: PluginContext) {
			console.log('BlocksPlugin buildStart called');
			console.log('NODE_ENV:', process.env.NODE_ENV);
			console.log('process.argv:', process.argv);

			// Discover blocks asynchronously
			await discoverBlocks();
			console.log('Discovered blocks count:', discoveredBlocks.length);

			// Add watch files if specified
			watch.forEach((file: string) => this.addWatchFile(file));

			// Check if this is a dev server (serve mode) vs build mode
			const isBuildMode = process.argv.includes('build');
			console.log('Is build mode:', isBuildMode);

			// Skip file emission in development mode since it's not supported by emitFile()
			if (!isBuildMode) {
				console.log('Skipping static file copying in serve mode');
				// Process discovered blocks for HMR but don't emit files
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

				// Generate block manifest in development mode too
				await generateBlockManifest.call(
					this,
					discoveredBlocks,
					fileEmitter
				);
				return;
			}

			console.log(
				'Build mode detected - will copy static files in generateBundle hook'
			);

			// Process blocks for building (without static files yet)
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

			// Generate block manifest
			await generateBlockManifest.call(
				this,
				discoveredBlocks,
				fileEmitter
			);
		},

		generateBundle: async function (this: PluginContext) {
			console.log('Block static copy plugin - generateBundle called');

			// Check if this is a build mode
			const isBuildMode = process.argv.includes('build');

			if (!isBuildMode) {
				console.log('Skipping static file copying in serve mode');
				return;
			}

			console.log('Copying static files in generateBundle hook');

			// Copy static files for each discovered block (only in build mode)
			for (const block of discoveredBlocks) {
				const destPath = block.outputPath || block.name;

				// Copy block.json file - always use FileEmitter for static files
				try {
					const blockJsonSrc = resolve(block.path, 'block.json');
					const blockJsonContent = await readFile(
						blockJsonSrc,
						'utf-8'
					);
					console.log(
						`[generateBundle] Copying block.json for ${block.name}`
					);
					// Use FileEmitter's writeStaticFile method for static files like block.json
					await fileEmitter.writeStaticFile(
						`${destPath}/block.json`,
						blockJsonContent
					);
					console.log(
						`[generateBundle] ✓ Copied block.json to ${destPath}/block.json`
					);

					// Process PHP files - also use FileEmitter for static files
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

						// Create PHP handler instance
						const phpHandler = new PHP_Handler();
						await phpHandler.processPhpFiles(
							this,
							phpFileInfos,
							shouldMinify,
							fileEmitter
						);
					}
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
