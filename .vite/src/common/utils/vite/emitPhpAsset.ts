/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import type { EmittedAsset } from '../../types';
import { DevFileEmitter } from './DevFileEmitter';

/**
 * Emit PHP file as asset
 * @param pluginContext - The Rollup plugin context
 * @param outputFileName - The output file name
 * @param content - The PHP content to emit
 * @param fileEmitter - Optional DevFileEmitter for development mode
 * @return {void}
 */
export const emitPhpAsset = async (
	pluginContext: PluginContext,
	outputFileName: string,
	content: string,
	fileEmitter?: DevFileEmitter
): Promise<void> => {
	if (fileEmitter) {
		await fileEmitter.emitFile(pluginContext, {
			type: 'asset',
			fileName: outputFileName,
			source: content,
		} satisfies EmittedAsset);
	} else {
		await DevFileEmitter.safeEmitFile(pluginContext, {
			type: 'asset',
			fileName: outputFileName,
			source: content,
		} satisfies EmittedAsset);
	}
};
