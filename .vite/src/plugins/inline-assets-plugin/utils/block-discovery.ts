/**
 * Block Discovery Utilities
 *
 * Utilities for discovering and managing block assets for HMR.
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

export interface BlockAssetInfo {
	buildPath: string;
	sourcePath: string;
	blockSlug: string;
}

export interface BlocksConfig {
	blocksDir: Record<string, string>;
	outDir: string;
	blockNamespace: string;
}

/**
 * Discover blocks and their CSS assets dynamically
 */
export function discoverBlockAssets(
	config: BlocksConfig
): Map<string, BlockAssetInfo> {
	const { blocksDir, outDir } = config;
	const blockAssets = new Map<string, BlockAssetInfo>();

	Object.entries(blocksDir).forEach(([buildKey, sourcePath]) => {
		try {
			// Find all block.json files in the source directory
			const blockJsonFiles = glob.sync('**/block.json', {
				cwd: sourcePath,
				absolute: false,
			});

			blockJsonFiles.forEach((blockJsonPath) => {
				const fullBlockJsonPath = path.join(sourcePath, blockJsonPath);

				if (fs.existsSync(fullBlockJsonPath)) {
					try {
						const blockJson = JSON.parse(
							fs.readFileSync(fullBlockJsonPath, 'utf-8')
						);
						const blockName = blockJson.name;

						if (blockName && blockName.includes('/')) {
							// Extract block slug from name (e.g., 'ksd/part-logo' -> 'part-logo')
							const blockSlug = blockName.split('/')[1];
							const blockDir = path.dirname(blockJsonPath);

							// Check for style.css or other CSS files in the block directory
							const blockSourceDir = path.join(
								sourcePath,
								blockDir
							);
							const blockBuildDir = path.join(
								outDir,
								buildKey,
								blockDir
							);

							// Look for CSS files that could be used as inline styles
							const cssFiles = [
								'style.css',
								'index.css',
								'style-index.css',
							];

							cssFiles.forEach((cssFile) => {
								const sourceCssPath = path.join(
									blockSourceDir,
									cssFile
								);
								const buildCssPath = path
									.join(blockBuildDir, cssFile)
									.replace(/\\/g, '/');

								if (fs.existsSync(sourceCssPath)) {
									const assetKey = `${blockSlug}-${cssFile.replace('.css', '')}`;
									blockAssets.set(assetKey, {
										buildPath: buildCssPath,
										sourcePath: sourceCssPath.replace(
											/\\/g,
											'/'
										),
										blockSlug: blockSlug,
									});
								}
							});
						}
					} catch (error) {
						console.warn(
							`[InlineAssets] Error parsing block.json at ${fullBlockJsonPath}:`,
							error
						);
					}
				}
			});
		} catch (error) {
			console.warn(
				`[InlineAssets] Error discovering blocks in ${sourcePath}:`,
				error
			);
		}
	});

	console.log(
		`[InlineAssets] Discovered ${blockAssets.size} block CSS assets for HMR`
	);

	return blockAssets;
}

/**
 * Get all monitored assets (static + dynamic blocks)
 */
export function getAllMonitoredAssets(
	inlineAssets: string[],
	blockAssets: Map<string, BlockAssetInfo>
): string[] {
	const dynamicAssets = Array.from(blockAssets.values()).map(
		(asset) => asset.buildPath
	);
	return [...inlineAssets, ...dynamicAssets];
}

/**
 * Check if a file change affects any inline assets
 */
export function getAffectedAsset(
	file: string,
	inlineAssets: string[],
	blockAssets: Map<string, BlockAssetInfo>,
	watchPatterns: string[]
): string {
	// Check if the changed file affects any inline assets
	const isInlineAsset = inlineAssets.some((asset) => {
		const fullPath = path.resolve(asset);
		return file === fullPath || file.endsWith(asset);
	});

	if (isInlineAsset) {
		return (
			inlineAssets.find((asset) => {
				const fullPath = path.resolve(asset);
				return file === fullPath || file.endsWith(asset);
			}) || ''
		);
	}

	// Check if the changed file is a block CSS file
	const isBlockAsset = Array.from(blockAssets.values()).some(
		(assetInfo) =>
			file === assetInfo.sourcePath || file === assetInfo.buildPath
	);

	if (isBlockAsset) {
		// Find the block asset that was changed
		for (const [, assetInfo] of blockAssets) {
			if (file === assetInfo.sourcePath || file === assetInfo.buildPath) {
				return assetInfo.buildPath;
			}
		}
	}

	// Check if it's a source file that affects inline assets
	const isSourceFile = watchPatterns.some((pattern) => {
		const regex = pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*');
		return new RegExp(regex).test(file);
	});

	if (isSourceFile) {
		// For source files, determine which built asset they affect
		if (file.includes('sanitize')) {
			return 'build/assets/sanitize.css';
		} else if (file.includes('tailwind')) {
			return 'build/assets/tailwind-utilities.css';
		} else {
			return 'build/assets/inline.css';
		}
	}

	return '';
}
