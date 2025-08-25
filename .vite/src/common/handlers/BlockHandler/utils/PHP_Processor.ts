/**
 * External dependencies
 */
import { readFileSync } from 'node:fs';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { minifyPhp } from '../../../utils/index';
import { FileEmitter } from '../../../utils/vite/FileEmitter';
import type { EmittedAsset } from '../../../types/index';

/**
 * PHP Processor utility for handling PHP file processing and emission
 *
 * This utility is focused specifically on PHP processing for WordPress blocks,
 * providing methods for reading, minifying, and emitting PHP files.
 */
export class PHP_Processor {
	/**
	 * Emit PHP file as asset
	 * @param pluginContext - The Rollup plugin context
	 * @param outputFileName - The output file name
	 * @param content - The PHP content to emit
	 */
	private async emitAsset(
		pluginContext: PluginContext,
		outputFileName: string,
		content: string
	): Promise<void> {
		await FileEmitter.safeEmitFile(pluginContext, {
			type: 'asset',
			fileName: outputFileName,
			source: content,
		} satisfies EmittedAsset);
	}

	/**
	 * Process a single PHP file and minify it
	 * @param pluginContext - The Rollup plugin context
	 * @param phpPath - The path to the PHP file
	 * @param outputFileName - The output file name
	 * @param shouldMinify - Whether to minify the PHP content
	 */
	async processPhp(
		pluginContext: PluginContext,
		phpPath: string,
		outputFileName: string,
		shouldMinify: boolean = true
	): Promise<void> {
		try {
			pluginContext.addWatchFile(phpPath);

			const phpContent = readFileSync(phpPath, 'utf-8');

			const processedContent = shouldMinify
				? minifyPhp(phpContent)
				: phpContent;

			await this.emitAsset(
				pluginContext,
				outputFileName,
				processedContent
			);
		} catch {
			// Skip files that can't be processed
		}
	}

	/**
	 * Process multiple PHP files
	 * @param pluginContext - The Rollup plugin context
	 * @param phpFiles - The PHP files to process
	 * @param shouldMinify - Whether to minify the PHP content
	 */
	async processPhpFiles(
		pluginContext: PluginContext,
		phpFiles: Array<{ sourcePath: string; outputPath: string }>,
		shouldMinify: boolean = true
	): Promise<void> {
		for (const { sourcePath, outputPath } of phpFiles) {
			await this.processPhp(
				pluginContext,
				sourcePath,
				outputPath,
				shouldMinify
			);
		}
	}
}
