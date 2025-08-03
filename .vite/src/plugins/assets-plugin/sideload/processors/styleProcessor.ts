/**
 * External dependencies
 */
import { transform } from 'lightningcss';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	findActualStylePath,
	generateAssetFilename,
	readStylesheet,
} from '../../../../common/utils';
import { FILE_EXTENSIONS } from '../../../../common//constants.ts';
import type { EmittedAsset } from '../../../../common//types/rollup.ts';
import type { OutputConfig } from '../../../../common/types/assets.ts';

/**
 * Process a single style file
 */
export const processStyle = (
	pluginContext: PluginContext,
	styleFile: string,
	config: OutputConfig
): void => {
	const actualStylePath = findActualStylePath(config.basePath, styleFile);

	if (!actualStylePath) {
		console.warn(
			`Warning: Style file not found: ${styleFile} (tried ${FILE_EXTENSIONS.STYLES.join(', ')} extensions in ${config.basePath})`
		);
		return;
	}

	// Vite won't track this file for watching, so we'll add a manual watcher
	pluginContext.addWatchFile(actualStylePath);

	try {
		const cssContent = readStylesheet(actualStylePath);

		// Create block-specific file path
		const styleFileName = generateAssetFilename(
			styleFile,
			config.outputPath
		);

		// Use LightningCSS to process and minify the CSS
		const { code, map } = transform({
			filename: styleFileName,
			code: Buffer.from(cssContent),
			minify: true,
			sourceMap: true,
		});

		pluginContext.emitFile({
			type: 'asset',
			fileName: styleFileName,
			source: code,
		} satisfies EmittedAsset);

		// Emit the source map if available
		if (map) {
			pluginContext.emitFile({
				type: 'asset',
				fileName: `${styleFileName}.map`,
				source: map.toString(),
			} satisfies EmittedAsset);
		}
	} catch (error) {
		console.warn(
			`Warning: Could not process style file ${actualStylePath}:`,
			error
		);
	}
};

/**
 * Process all styles for a block
 */
export const processStyles = (
	pluginContext: PluginContext,
	styles: string[],
	config: OutputConfig
): void => {
	for (const styleFile of styles) {
		processStyle(pluginContext, styleFile, config);
	}
};
