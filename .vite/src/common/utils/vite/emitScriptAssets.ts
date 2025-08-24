/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	extractFilenameWithoutExtension,
	generateAssetFilename,
	generateFileHash,
	generatePhpAssetFile,
} from '../../utils';

import type { EmittedAsset, OutputConfig } from '../../types';

/**
 * Emit JavaScript and PHP asset files
 * @param pluginContext - The Rollup plugin context
 * @param file - The output file
 * @param script - The script file name
 * @param config - The output configuration
 * @param wpImports - List of WordPress imports used in the script
 */
export const emitScriptAssets = (
	pluginContext: PluginContext,
	file: any,
	script: string,
	config: OutputConfig,
	wpImports: string[]
) => {
	const hash = generateFileHash(file.text);
	const filename = extractFilenameWithoutExtension(script);

	// Create block-specific file paths for JavaScript files
	const assetFileName = generateAssetFilename(
		`${filename}.asset.php`,
		config.outputPath
	);
	const scriptFileName = generateAssetFilename(script, config.outputPath);

	pluginContext.emitFile({
		type: 'asset',
		fileName: assetFileName,
		source: generatePhpAssetFile(wpImports, hash),
	} satisfies EmittedAsset);

	pluginContext.emitFile({
		type: 'asset',
		fileName: scriptFileName,
		source: file.contents,
	} satisfies EmittedAsset);
};
