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
} from '../utils';
import type { EmittedAsset, OutputConfig } from '../types';

/**
 * Process a single style file
 */
export const processStyle = (
	pluginContext: PluginContext,
	styleFile: string,
	config: OutputConfig
): void => {
	const actualStylePath = findActualStylePath(config.basePath, styleFile);
	if (!actualStylePath) return;

	pluginContext.addWatchFile(actualStylePath);

	try {
		const cssContent = readStylesheet(actualStylePath);

		// Determine output filename based on WordPress conventions
		let outputFilename: string;
		if (styleFile === 'editor.css') {
			outputFilename = generateAssetFilename(
				'index.css',
				config.outputPath
			);
		} else if (styleFile === 'style.css') {
			outputFilename = generateAssetFilename(
				'style-index.css',
				config.outputPath
			);
		} else {
			outputFilename = generateAssetFilename(
				styleFile,
				config.outputPath
			);
		}

		// Use LightningCSS to process and minify the CSS
		const { code, map } = transform({
			filename: outputFilename,
			code: Buffer.from(cssContent),
			minify: true,
			sourceMap: true,
		});

		pluginContext.emitFile({
			type: 'asset',
			fileName: outputFilename,
			source: code,
		} satisfies EmittedAsset);

		// Emit the source map if available
		if (map) {
			pluginContext.emitFile({
				type: 'asset',
				fileName: `${outputFilename}.map`,
				source: map.toString(),
			} satisfies EmittedAsset);
		}
	} catch {
		// Skip styles that can't be processed
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
