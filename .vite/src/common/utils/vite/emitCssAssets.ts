/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import type { EmittedAsset } from '../../types';

/**
 * Internal dependencies
 */
import { DevFileEmitter } from './DevFileEmitter';

/**
 * Emit CSS and source map files
 * @param pluginContext - The Rollup plugin context
 * @param code - The processed CSS code
 * @param map - The source map for the CSS code
 * @param outputFilename - The output filename for the CSS file
 */
export const emitCssAssets = async (
	pluginContext: PluginContext,
	code: Uint8Array,
	map: Uint8Array | undefined,
	outputFilename: string
) => {
	// Emit the CSS file
	await DevFileEmitter.safeEmitFile(pluginContext, {
		type: 'asset',
		fileName: outputFilename,
		source: code,
	} satisfies EmittedAsset);

	// Emit the source map if available
	if (map) {
		await DevFileEmitter.safeEmitFile(pluginContext, {
			type: 'asset',
			fileName: `${outputFilename}.map`,
			source: map.toString(),
		} satisfies EmittedAsset);
	}
};
