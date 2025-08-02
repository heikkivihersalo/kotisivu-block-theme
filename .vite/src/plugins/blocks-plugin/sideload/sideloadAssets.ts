/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import { processAssets } from './processors/assetProcessor.ts';
import type { DiscoveredAssetInfo } from '../../types/index.ts';

/**
 * Sideloads theme assets (scripts and styles) and outputs them to the specified directory.
 *
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
