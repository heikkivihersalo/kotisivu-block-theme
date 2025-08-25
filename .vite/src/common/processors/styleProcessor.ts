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
import type { DevFileEmitter } from '../utils/vite/DevFileEmitter';

/**
 * Process a single style file
 * @param pluginContext - The Rollup plugin context
 * @param styleFile - The original style file name
 * @param config - The output configuration
 * @param fileEmitter - Optional DevFileEmitter instance for development mode
 */
export const processStyle = async (
	pluginContext: PluginContext,
	styleFile: string,
	config: OutputConfig,
	fileEmitter?: DevFileEmitter
): Promise<void> => {
	const actualStylePath = findActualStylePath(config.basePath, styleFile);
	if (!actualStylePath) return;

	pluginContext.addWatchFile(actualStylePath);

	try {
		const cssContent = readStylesheet(actualStylePath);
		const outputFilename = determineOutputFilename(styleFile, config);

		// Process CSS with LightningCSS
		const { code, map } = transform({
			filename: outputFilename,
			code: Buffer.from(cssContent),
			minify: true,
			sourceMap: true,
		});

		// Emit CSS and source map assets
		await emitCssAssets(
			pluginContext,
			code,
			map || undefined,
			outputFilename,
			fileEmitter
		);
	} catch {
		// Skip styles that can't be processed
	}
};

/**
 * Process all styles for a block
 * @param pluginContext - The Rollup plugin context
 * @param styles - The original style file names
 * @param config - The output configuration
 * @param fileEmitter - Optional DevFileEmitter instance for development mode
 */
export const processStyles = async (
	pluginContext: PluginContext,
	styles: string[],
	config: OutputConfig,
	fileEmitter?: DevFileEmitter
): Promise<void> => {
	for (const styleFile of styles) {
		await processStyle(pluginContext, styleFile, config, fileEmitter);
	}
};
