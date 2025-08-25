/**
 * External dependencies
 */
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { AssetHandler } from '../../common/handlers/index.ts';

import type {
	DiscoveredAssetInfo,
	AssetProcessorConfig,
} from '../../common/types';

/**
 * Process generic assets and generate corresponding PHP asset files
 * @param context - Rollup plugin context
 * @param assets - Array of discovered asset information
 * @param config - Asset processor configuration
 */
export const processAssets = async (
	context: PluginContext,
	assets: DiscoveredAssetInfo[],
	{
		outputDirectory,
		dependencies = [],
		sourcemap = false,
		fileEmitter, // eslint-disable-line @typescript-eslint/no-unused-vars
	}: AssetProcessorConfig
): Promise<void> => {
	// Create Asset handler instance
	const assetHandler = new AssetHandler();

	for (const asset of assets) {
		try {
			const jsOutputPath = resolve(
				outputDirectory,
				`${asset.outputPath}.js`
			);
			mkdirSync(dirname(jsOutputPath), { recursive: true });

			// Process asset with AssetHandler
			const { jsContent, cssContent, jsSourceMapFile, phpContent } =
				await assetHandler.processAsset(
					context,
					asset,
					outputDirectory,
					dependencies,
					sourcemap
				);

			// Emit JavaScript files and source map
			await assetHandler.emitJavaScriptAssets(
				context,
				asset,
				jsContent,
				jsSourceMapFile
			);

			// Emit PHP asset file
			await assetHandler.emitPhpAsset(context, asset, phpContent);

			// Emit CSS files if available
			await assetHandler.emitCssAssets(context, asset, cssContent);
		} catch {
			// Skip assets that can't be processed
			continue;
		}
	}
};
