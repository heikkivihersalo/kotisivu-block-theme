/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';
import type { EmittedAsset } from '../../types';

/**
 * Emit PHP file as asset
 * @param pluginContext - The Rollup plugin context
 * @param outputFileName - The output file name
 * @param content - The PHP content to emit
 * @return {void}
 */
export const emitPhpAsset = (
	pluginContext: PluginContext,
	outputFileName: string,
	content: string
): void => {
	pluginContext.emitFile({
		type: 'asset',
		fileName: outputFileName,
		source: content,
	} satisfies EmittedAsset);
};
