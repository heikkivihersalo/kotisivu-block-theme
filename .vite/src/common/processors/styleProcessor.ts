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
	determineOutputFilename,
	readStylesheet,
	emitCssAssets,
} from '../utils';
import type { OutputConfig } from '../types';

/**
 * Process CSS with LightningCSS
 * @param cssContent - The CSS content to process
 * @param outputFilename - The output file name
 */
const processCSS = (cssContent: string, outputFilename: string) => {
	return transform({
		filename: outputFilename,
		code: Buffer.from(cssContent),
		minify: true,
		sourceMap: true,
	});
};

/**
 * Process a single style file
 * @param pluginContext - The Rollup plugin context
 * @param styleFile - The original style file name
 * @param config - The output configuration
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
		const outputFilename = determineOutputFilename(styleFile, config);

		// Process CSS with LightningCSS
		const { code, map } = processCSS(cssContent, outputFilename);

		// Emit CSS and source map assets
		emitCssAssets(pluginContext, code, map || undefined, outputFilename);
	} catch {
		// Skip styles that can't be processed
	}
};

/**
 * Process all styles for a block
 * @param pluginContext - The Rollup plugin context
 * @param styles - The original style file names
 * @param config - The output configuration
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
