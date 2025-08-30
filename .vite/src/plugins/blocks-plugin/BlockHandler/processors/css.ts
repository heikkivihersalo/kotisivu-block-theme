/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { readStylesheet } from '../../../../common/utils';
import type { OutputConfig } from '../../../../common/types';
import {
	BaseCssHandler,
	type CssHandlerConfig,
} from '../../../../common/abstracts/BaseCssHandler';

/**
 * CSS Processor utility for handling CSS file processing with LightningCSS
 *
 * This utility is focused specifically on CSS processing for WordPress blocks,
 * providing methods for processing individual files, string content, and
 * handling CSS transformations with proper source maps.
 */
export class CSS extends BaseCssHandler {
	constructor({
		context,
		config = {},
	}: { context: PluginContext; config?: CssHandlerConfig }) {
		super(context, config);
	}

	/**
	 * Process a single style file
	 * @param styleFile - The original style file name
	 * @param config - The output configuration
	 */
	async processStyle(styleFile: string, config: OutputConfig): Promise<void> {
		const actualStylePath = this.findActualStylePath(
			config.basePath,
			styleFile
		);
		if (!actualStylePath) return;

		this.context.addWatchFile(actualStylePath);

		try {
			const cssContent = readStylesheet(actualStylePath);
			const outputFilename = this.determineOutputFilename(
				styleFile,
				config
			);

			const processResult = await this.processFileContent(
				cssContent,
				outputFilename,
				{
					shouldMinify: true,
				}
			);

			// Emit the processed CSS content
			await this.emitAsset(outputFilename, processResult.content);

			// Emit source map if available
			if (processResult.sourceMap) {
				await this.emitAsset(
					`${outputFilename}.map`,
					processResult.sourceMap
				);
			}
		} catch (error) {
			// Skip styles that can't be processed
			console.warn(`Failed to process style file ${styleFile}:`, error);
		}
	}

	/**
	 * Process all styles for a block
	 * @param styles - The original style file names
	 * @param config - The output configuration
	 */
	async processStyles(styles: string[], config: OutputConfig): Promise<void> {
		for (const styleFile of styles) {
			await this.processStyle(styleFile, config);
		}
	}
}
