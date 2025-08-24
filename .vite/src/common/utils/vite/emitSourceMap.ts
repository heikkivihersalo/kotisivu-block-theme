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
 * Emit source map file
 * @param pluginContext - The Rollup plugin context
 * @param file - The output file
 * @param script - The script file name
 * @param config - The output configuration
 */
export const emitSourceMap = (
	pluginContext: PluginContext,
	file: any,
	script: string,
	config: OutputConfig
) => {
	const sourceMapFileName = generateAssetFilename(
		`${script}.map`,
		config.outputPath
	);

	pluginContext.emitFile({
		type: 'asset',
		fileName: sourceMapFileName,
		source: file.contents,
	} satisfies EmittedAsset);
};
