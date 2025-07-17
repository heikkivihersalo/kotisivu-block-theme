/**
 * External dependencies
 */
import { readFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { glob } from 'glob';

/**
 * Internal dependencies
 */
import {
	BLOCK_PATTERNS,
	WORDPRESS_FILE_OUTPUT,
} from '../../config/constants.js';
import {
	generatePhpArray,
	copyBlockJsonFile,
	copyRenderFile,
} from './utils.js';

import type {
	ChunkInfo,
	PluginContext,
	Bundle,
	BlockManifest,
	ManifestAssets,
} from '../../types/index.js';

/**
 * Get all block.json files from a directory
 * @param blocksDir - Directory to search for blocks
 * @returns Array of block.json file paths
 */
export function getBlockJsonFiles(blocksDir: string): string[] {
	return glob.sync(`${blocksDir}/${BLOCK_PATTERNS.BLOCK_JSON}`);
}

/**
 * Create bundle generator for copying block.json files and generating manifest
 * @param inputDirs - Input directories configuration
 * @returns Bundle generator function
 */
export function createBundleGenerator(inputDirs: Record<string, string>) {
	return function generateBundle(
		this: PluginContext,
		_options: any,
		bundle: Bundle
	): void {
		const manifest: Record<string, Record<string, BlockManifest>> = {};
		const assets: ManifestAssets = {
			chunks: {},
		};

		// Collect asset information from bundle
		Object.keys(bundle).forEach((key) => {
			const chunk = bundle[key];
			if (chunk.type === 'asset') return;

			const chunkInfo = chunk as ChunkInfo;

			// Track chunks (shared dependencies)
			if (key.includes('assets/')) {
				const assetPath = key.replace(/\.js$/, '');
				const [, folder, name] = assetPath.split('/');

				if (!assets.chunks[folder]) {
					assets.chunks[folder] = [];
				}

				// Clean up module paths to be relative
				const cleanModules = Object.keys(chunkInfo.modules || {})
					.filter(
						(mod) =>
							!mod.includes('node_modules') ||
							mod.includes('commonjsHelpers')
					)
					.map((mod) => {
						// Make paths relative to resources directory
						if (mod.includes('/resources/')) {
							return mod.substring(
								mod.indexOf('/resources/') + 1
							);
						}
						// Clean node_modules paths
						if (mod.includes('node_modules/')) {
							const packageMatch = mod.match(
								/node_modules\/([^\/]+)/
							);
							return packageMatch
								? `node_modules/${packageMatch[1]}`
								: mod;
						}
						return mod;
					});

				assets.chunks[folder].push({
					name: name,
					fileName: chunkInfo.fileName,
					imports: (chunkInfo.imports || []).filter(
						(imp) => !imp.includes('.css')
					),
					modules: cleanModules,
				});
			}
		});

		// Process each input directory
		for (const [outputSubDir, inputDir] of Object.entries(inputDirs)) {
			const blockJsonFiles = getBlockJsonFiles(inputDir);

			// Initialize directory structure in manifest
			if (!manifest[outputSubDir]) {
				manifest[outputSubDir] = {};
			}

			blockJsonFiles.forEach((blockJsonPath) => {
				const blockDir = dirname(blockJsonPath);
				const blockName = blockDir.split('/').pop()!;

				// Create hierarchical structure
				const blockKey = `${outputSubDir}/${blockName}`;

				copyBlockJsonFile({
					context: this,
					dir: blockDir,
					key: blockKey,
				});

				copyRenderFile({
					context: this,
					dir: blockDir,
					key: blockKey,
				});

				// Initialize block entry in manifest
				manifest[outputSubDir][blockName] = {
					blockJson: `${blockKey}/${WORDPRESS_FILE_OUTPUT.BLOCK_JSON}`,
				};

				// Add script entries to manifest based on what exists in the bundle
				const indexKey = `${blockKey}/index`;
				const viewKey = `${blockKey}/view`;
				const styleKey = `${blockKey}/style-index`;

				// Only add scripts/styles that actually exist
				if (bundle[indexKey + '.js']) {
					if (!manifest[outputSubDir][blockName].scripts) {
						manifest[outputSubDir][blockName].scripts = {};
					}
					manifest[outputSubDir][blockName].scripts!.editor =
						`${blockKey}/${WORDPRESS_FILE_OUTPUT.EDITOR_SCRIPT}`;

					// Track valid dependencies (filter out phantom dependencies)
					const chunk = bundle[indexKey + '.js'] as ChunkInfo;
					if (chunk.imports && chunk.imports.length > 0) {
						const validDependencies = chunk.imports.filter(
							(imp) => {
								// Filter out phantom dependencies first
								if (
									imp.includes('editor-styles.js') ||
									imp.includes('style-index.js') ||
									imp.includes('/editor-styles') ||
									imp.includes('/style-index')
								) {
									return false;
								}

								// Include valid dependencies
								return (
									bundle[imp] ||
									imp.startsWith('@wordpress') ||
									imp.includes('assets/')
								);
							}
						);
						if (validDependencies.length > 0) {
							manifest[outputSubDir][blockName].dependencies =
								validDependencies;
						}
					}
				}

				if (bundle[viewKey + '.js']) {
					if (!manifest[outputSubDir][blockName].scripts) {
						manifest[outputSubDir][blockName].scripts = {};
					}
					manifest[outputSubDir][blockName].scripts!.frontend =
						`${blockKey}/${WORDPRESS_FILE_OUTPUT.VIEW_SCRIPT}`;
				}

				if (bundle[styleKey + '.css']) {
					if (!manifest[outputSubDir][blockName].styles) {
						manifest[outputSubDir][blockName].styles = {};
					}
					manifest[outputSubDir][blockName].styles!.frontend =
						`${blockKey}/${WORDPRESS_FILE_OUTPUT.STYLE}`;
				}
			});
		}

		// Generate PHP array format
		const phpManifest = generatePhpArray({ blocks: manifest, assets });

		// Emit manifest.php
		this.emitFile({
			type: 'asset',
			fileName: 'manifest.php',
			source: phpManifest,
		});
	};
}
