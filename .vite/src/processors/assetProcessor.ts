/**
 * External dependencies
 */
import { resolve, dirname } from 'node:path';
import { build as esBuild } from 'esbuild';
import { writeFileSync, mkdirSync } from 'node:fs';
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import { generatePhpAssetFile, generateFileHash } from '../common/index.js';
import type { DiscoveredAssetInfo } from '../../types/index.js';
import { ESBUILD_CONFIG, WORDPRESS_CONFIG } from '../../constants.js';

/**
 * Asset processor configuration
 */
interface AssetProcessorConfig {
	outputDirectory: string;
	dependencies?: string[];
}

/**
 * Process generic assets and generate corresponding PHP asset files
 * @param context - Rollup plugin context
 * @param assets - Array of discovered asset information
 * @param config - Asset processor configuration
 */
export async function processAssets(
	context: PluginContext,
	assets: DiscoveredAssetInfo[],
	config: AssetProcessorConfig
): Promise<void> {
	const { outputDirectory, dependencies = [] } = config;

	for (const asset of assets) {
		try {
			// Add the asset file to Rollup's bundle for processing
			context.addWatchFile(asset.sourcePath);

			// Determine output paths
			const jsOutputPath = resolve(
				outputDirectory,
				`${asset.outputPath}.js`
			);
			const phpOutputPath = resolve(
				outputDirectory,
				`${asset.outputPath}.asset.php`
			);

			// Ensure output directory exists
			mkdirSync(dirname(jsOutputPath), { recursive: true });

			// Build the asset using esbuild (similar to how scripts are processed)
			const result = await esBuild({
				entryPoints: [asset.sourcePath],
				outfile: jsOutputPath,
				platform: ESBUILD_CONFIG.PLATFORM,
				bundle: true,
				write: true, // Write the JS file directly
				metafile: true,
				loader: ESBUILD_CONFIG.LOADER_MAP,
				target: ESBUILD_CONFIG.TARGET,
				jsx: ESBUILD_CONFIG.JSX_TRANSFORM,
				jsxFactory: WORDPRESS_CONFIG.JSX_FACTORY,
				jsxFragment: WORDPRESS_CONFIG.JSX_FRAGMENT,
				minify: process.env.NODE_ENV === 'production',
			});

			// Generate hash for the asset file
			const hash = generateFileHash(asset.sourcePath);

			// Extract dependencies from the build result
			const assetDependencies = extractAssetDependencies(
				asset.sourcePath,
				result
			);

			// Filter out empty dependencies and combine with defaults
			const configDeps = dependencies.filter(
				(dep) => dep && dep.trim() !== ''
			);
			const allDependencies = [...configDeps, ...assetDependencies];

			// Add default wp-dom-ready if no dependencies are specified
			if (allDependencies.length === 0) {
				allDependencies.push('wp-dom-ready');
			}

			// Generate PHP asset file content
			const phpContent = generatePhpAssetFile(allDependencies, hash);

			// Write the PHP asset file
			writeFileSync(phpOutputPath, phpContent);

			console.info(
				`✓ Processing asset: ${asset.name} -> ${asset.outputPath}`
			);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			console.error(
				`✗ Failed to process asset ${asset.name}: ${errorMessage}`
			);
		}
	}
}

/**
 * Extract dependencies from TypeScript/JavaScript asset file
 * @param _assetPath - Path to the asset file (unused for now)
 * @param _buildResult - esbuild result containing metafile (unused for now)
 * @returns Array of WordPress dependencies
 */
export function extractAssetDependencies(
	_assetPath: string,
	_buildResult?: any
): string[] {
	// Additional dependencies can be extracted from the build metafile
	// For now, return empty array as defaults are handled in the main function
	return [];
}
