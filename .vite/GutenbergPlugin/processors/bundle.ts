import { readFileSync } from 'fs';
import { dirname } from 'path';
import { glob } from 'glob';
import { BLOCK_PATTERNS, WORDPRESS_FILE_OUTPUT } from '../config/constants.js';
import type { AssetInfo, ChunkInfo } from '../types.js';

// Rollup plugin context types
type PluginContext = {
	emitFile: (file: {
		type: 'asset';
		fileName: string;
		source: string;
	}) => void;
};

// Bundle type definition
type Bundle = Record<string, AssetInfo | ChunkInfo>;

// Manifest types
type BlockManifest = {
	blockJson: string;
	scripts?: {
		editor?: string;
		frontend?: string;
	};
	styles?: {
		frontend?: string;
	};
	dependencies?: string[];
};

type AssetChunk = {
	name: string;
	fileName: string;
	imports: string[];
	modules: string[];
};

type ManifestAssets = {
	chunks: Record<string, AssetChunk[]>;
};

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

				// Initialize block entry in manifest
				manifest[outputSubDir][blockName] = {
					blockJson: `${blockKey}/${WORDPRESS_FILE_OUTPUT.BLOCK_JSON}`,
				};

				// Copy block.json to output
				this.emitFile({
					type: 'asset',
					fileName: `${blockKey}/${WORDPRESS_FILE_OUTPUT.BLOCK_JSON}`,
					source: JSON.stringify(
						JSON.parse(readFileSync(blockJsonPath, 'utf8')),
						null,
						2
					),
				});

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

		// Keep JSON for backward compatibility - flatten structure for JSON
		const jsonManifest: Record<string, any> = {};
		Object.keys(manifest).forEach((dir) => {
			Object.keys(manifest[dir]).forEach((block) => {
				const blockData = manifest[dir][block];
				const key = `${dir}/${block}`;
				jsonManifest[key] = {
					blockJson: blockData.blockJson,
				};

				if (blockData.scripts?.editor) {
					jsonManifest[key].editorScript = blockData.scripts.editor;
				}
				if (blockData.scripts?.frontend) {
					jsonManifest[key].viewScript = blockData.scripts.frontend;
				}
				if (blockData.styles?.frontend) {
					jsonManifest[key].style = blockData.styles.frontend;
				}
			});
		});

		this.emitFile({
			type: 'asset',
			fileName: 'manifest.json',
			source: JSON.stringify(jsonManifest, null, 2),
		});
	};
}

/**
 * Convert JavaScript object to PHP array format
 * @param data - Data to convert to PHP array
 * @returns PHP array as string
 */
function generatePhpArray(data: any): string {
	function convertValue(value: any, indent = 0): string {
		const spaces = '    '.repeat(indent);
		const nextSpaces = '    '.repeat(indent + 1);

		if (value === null) return 'null';
		if (typeof value === 'boolean') return value ? 'true' : 'false';
		if (typeof value === 'number') return value.toString();
		if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`;

		if (Array.isArray(value)) {
			if (value.length === 0) return '[]';
			const items = value.map(
				(item) => `${nextSpaces}${convertValue(item, indent + 1)}`
			);
			return `[\n${items.join(',\n')}\n${spaces}]`;
		}

		if (typeof value === 'object') {
			const entries = Object.entries(value);
			if (entries.length === 0) return '[]';

			const items = entries.map(([key, val]) => {
				const phpKey = `'${key.replace(/'/g, "\\'")}'`;
				return `${nextSpaces}${phpKey} => ${convertValue(val, indent + 1)}`;
			});
			return `[\n${items.join(',\n')}\n${spaces}]`;
		}

		return 'null';
	}

	const phpCode = `<?php
/**
 * Block manifest - Generated automatically by Vite Gutenberg Plugin
 * Contains block registration data and asset information
 */

return ${convertValue(data)};
`;

	return phpCode;
}
