/**
 * External dependencies
 */
import { readFileSync } from 'node:fs';
import type { PluginContext } from 'rollup';
import type { EmittedAsset } from '../types';

/**
 * Shared dependencies
 */
import { minifyPhp } from '../utils';

/**
 * Process a single PHP file and minify it
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

		pluginContext.emitFile({
			type: 'asset',
			fileName: outputFileName,
			source: processedContent,
		} satisfies EmittedAsset);
	} catch {
		// Skip files that can't be processed
	}
};

/**
 * Process multiple PHP files
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
