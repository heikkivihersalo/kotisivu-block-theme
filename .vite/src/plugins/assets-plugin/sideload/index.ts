/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import type { DiscoveredAssetInfo } from '../../../common/types/assets.ts';

/**
 * Internal dependencies
 */
import { processAssets } from './processors/assetProcessor.ts';

/**
 * Sideloads theme assets (scripts and styles) and outputs them to the specified directory.
 * @param this - Rollup plugin context
 * @param discoveredAssets - Array of discovered asset information
 * @param outputDirectory - Directory where the assets should be output
 * @param dependencies - Optional array of dependencies to include in the asset processing
 * @param sourcemap - Optional sourcemap configuration for the assets
 * @return A promise that resolves to true if the assets were successfully sideloaded
 */
export async function sideloadAssets(
	this: PluginContext,
	discoveredAssets: DiscoveredAssetInfo[],
	outputDirectory: string,
	dependencies: string[] = [],
	sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
): Promise<boolean> {
	await processAssets(this, discoveredAssets, {
		outputDirectory,
		dependencies,
		sourcemap,
	});

	return true;
}
