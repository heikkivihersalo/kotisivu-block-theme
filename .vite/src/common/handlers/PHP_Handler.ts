/**
 * External dependencies
 */
import { readFileSync } from 'node:fs';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { minifyPhp } from '../utils/index.ts';
import { FileEmitter } from '../utils/vite/FileEmitter.ts';
import type { EmittedAsset } from '../types/index.ts';

/**
 * PHP Processor class for handling PHP file processing and emission
 */
export class PHP_Handler {
	/**
	 * Emit PHP file as asset
	 * @param pluginContext - The Rollup plugin context
	 * @param outputFileName - The output file name
	 * @param content - The PHP content to emit
	 * @param fileEmitter - Optional FileEmitter for development mode
	 */
	private async emitAsset(
		pluginContext: PluginContext,
		outputFileName: string,
		content: string,
		fileEmitter?: FileEmitter
	): Promise<void> {
		if (fileEmitter) {
			await fileEmitter.emitFile(pluginContext, {
				type: 'asset',
				fileName: outputFileName,
				source: content,
			} satisfies EmittedAsset);
		} else {
			await FileEmitter.safeEmitFile(pluginContext, {
				type: 'asset',
				fileName: outputFileName,
				source: content,
			} satisfies EmittedAsset);
		}
	}

	/**
	 * Process a single PHP file and minify it
	 * @param pluginContext - The Rollup plugin context
	 * @param phpPath - The path to the PHP file
	 * @param outputFileName - The output file name
	 * @param shouldMinify - Whether to minify the PHP content
	 * @param fileEmitter - Optional FileEmitter for development mode
	 */
	async processPhp(
		pluginContext: PluginContext,
		phpPath: string,
		outputFileName: string,
		shouldMinify: boolean = true,
		fileEmitter?: FileEmitter
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
				processedContent,
				fileEmitter
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
	 * @param fileEmitter - Optional FileEmitter for development mode
	 */
	async processPhpFiles(
		pluginContext: PluginContext,
		phpFiles: Array<{ sourcePath: string; outputPath: string }>,
		shouldMinify: boolean = true,
		fileEmitter?: FileEmitter
	): Promise<void> {
		for (const { sourcePath, outputPath } of phpFiles) {
			await this.processPhp(
				pluginContext,
				sourcePath,
				outputPath,
				shouldMinify,
				fileEmitter
			);
		}
	}
}
