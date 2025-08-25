/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { generateAssetFilename } from '../file';
import type { EmittedAsset, OutputConfig } from '../../types';

/**
 * Internal dependencies
 */
import { DevFileEmitter } from './DevFileEmitter';

/**
 * Emit source map file
 * @param pluginContext - The Rollup plugin context
 * @param file - The output file
 * @param script - The script file name
 * @param config - The output configuration
 */
export const emitSourceMap = async (
	pluginContext: PluginContext,
	file: any,
	script: string,
	config: OutputConfig
) => {
	const sourceMapFileName = generateAssetFilename(
		`${script}.map`,
		config.outputPath
	);

	await DevFileEmitter.safeEmitFile(pluginContext, {
		type: 'asset',
		fileName: sourceMapFileName,
		source: file.contents,
	} satisfies EmittedAsset);
};
