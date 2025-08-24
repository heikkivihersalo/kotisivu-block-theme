/**
 * External dependencies
 */
import { readFileSync } from 'node:fs';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { minifyPhp, emitPhpAsset } from '../utils';

/**
 * Process a single PHP file and minify it
 * @param pluginContext - The Rollup plugin context
 * @param phpPath - The path to the PHP file
 * @param outputFileName - The output file name
 */
export const processPhp = (
	pluginContext: PluginContext,
	phpPath: string,
	outputFileName: string,
	shouldMinify: boolean = true
): void => {
	try {
		pluginContext.addWatchFile(phpPath);

		const phpContent = readFileSync(phpPath, 'utf-8');

		const processedContent = shouldMinify
			? minifyPhp(phpContent)
			: phpContent;

		emitPhpAsset(pluginContext, outputFileName, processedContent);
	} catch {
		// Skip files that can't be processed
	}
};

/**
 * Process multiple PHP files
 * @param pluginContext - The Rollup plugin context
 * @param phpFiles - The PHP files to process
 * @param shouldMinify - Whether to minify the PHP content
 */
export const processPhpFiles = (
	pluginContext: PluginContext,
	phpFiles: Array<{ sourcePath: string; outputPath: string }>,
	shouldMinify: boolean = true
): void => {
	for (const { sourcePath, outputPath } of phpFiles) {
		processPhp(pluginContext, sourcePath, outputPath, shouldMinify);
	}
};
