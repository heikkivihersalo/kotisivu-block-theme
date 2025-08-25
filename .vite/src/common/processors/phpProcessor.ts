/**
 * External dependencies
 */
import { readFileSync } from 'node:fs';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { minifyPhp, emitPhpAsset } from '../utils';
import type { DevFileEmitter } from '../utils/vite/DevFileEmitter';

/**
 * Process a single PHP file and minify it
 * @param pluginContext - The Rollup plugin context
 * @param phpPath - The path to the PHP file
 * @param outputFileName - The output file name
 * @param shouldMinify - Whether to minify the PHP content
 * @param fileEmitter - Optional DevFileEmitter for development mode
 */
export const processPhp = async (
	pluginContext: PluginContext,
	phpPath: string,
	outputFileName: string,
	shouldMinify: boolean = true,
	fileEmitter?: DevFileEmitter
): Promise<void> => {
	try {
		pluginContext.addWatchFile(phpPath);

		const phpContent = readFileSync(phpPath, 'utf-8');

		const processedContent = shouldMinify
			? minifyPhp(phpContent)
			: phpContent;

		await emitPhpAsset(
			pluginContext,
			outputFileName,
			processedContent,
			fileEmitter
		);
	} catch {
		// Skip files that can't be processed
	}
};

/**
 * Process multiple PHP files
 * @param pluginContext - The Rollup plugin context
 * @param phpFiles - The PHP files to process
 * @param shouldMinify - Whether to minify the PHP content
 * @param fileEmitter - Optional DevFileEmitter for development mode
 */
export const processPhpFiles = async (
	pluginContext: PluginContext,
	phpFiles: Array<{ sourcePath: string; outputPath: string }>,
	shouldMinify: boolean = true,
	fileEmitter?: DevFileEmitter
): Promise<void> => {
	for (const { sourcePath, outputPath } of phpFiles) {
		await processPhp(
			pluginContext,
			sourcePath,
			outputPath,
			shouldMinify,
			fileEmitter
		);
	}
};
