/**
 * External dependencies
 */
import type { OutputOptions, PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	generateVersionHash,
	generatePhpAssetFile,
	extractWpDependencies,
} from '../../common/utils/index.ts';

import type { AssetInfo, ChunkInfo, EmittedAsset } from '../../common/types';

/**
 * generateBundle
 *
 * Wordpress blocks wont be detected unless an `index.asset.php` file is generated for each one which
 * tells WP information about versioning and dependencies.
 *
 * This function maps the imports from the @wordpress namespace, generates a version hash and then
 * emits the required php file into the build folder
 *
 * @see https://rollupjs.org/plugin-development/#generatebundle
 */
export function generateBundle(
	this: PluginContext,
	_options: OutputOptions,
	bundle: { [fileName: string]: ChunkInfo | AssetInfo },
	additionalDependencies: string[]
) {
	// Extract WordPress dependencies from all bundle files
	const wpDependencies = extractWpDependencies(bundle);

	// Combine with additional dependencies
	const allDependencies = new Set([
		...wpDependencies,
		...additionalDependencies,
	]);

	// Generate version hash from bundle content
	const versionHash = generateVersionHash(bundle);

	// Create the WordPress asset file
	this.emitFile({
		type: 'asset',
		fileName: 'index.asset.php',
		source: generatePhpAssetFile(allDependencies, versionHash),
	} satisfies EmittedAsset);
}
