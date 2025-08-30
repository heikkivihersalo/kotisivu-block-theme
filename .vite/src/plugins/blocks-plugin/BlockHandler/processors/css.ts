/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	findActualStylePath,
	determineOutputFilename,
	readStylesheet,
} from '../../../../common/utils';
import type { OutputConfig } from '../../../../common/types';
import { BaseCssHandler } from '../../../../common/abstracts/BaseCssHandler';

/**
 * CSS Processor utility for handling CSS file processing with LightningCSS
 *
 * This utility is focused specifically on CSS processing for WordPress blocks,
 * providing methods for processing individual files, string content, and
 * handling CSS transformations with proper source maps.
 */
export class CSS extends BaseCssHandler {
	constructor({ context }: { context: PluginContext }) {
		super(context);
	}

	/**
	 * Process CSS from a string content
	 * @param cssContent - The CSS content to process
	 * @param outputFilename - The output filename for the CSS file
	 */
	async processStringContent(
		cssContent: string,
		outputFilename: string
	): Promise<void> {
		await this.processCssAndEmit(cssContent, outputFilename);
	}

	/**
	 * Process a single style file
	 * @param styleFile - The original style file name
	 * @param config - The output configuration
	 */
	async processStyle(styleFile: string, config: OutputConfig): Promise<void> {
		const actualStylePath = findActualStylePath(config.basePath, styleFile);
		if (!actualStylePath) return;

		this.context.addWatchFile(actualStylePath);

		try {
			const cssContent = readStylesheet(actualStylePath);
			const outputFilename = determineOutputFilename(styleFile, config);
			await this.processStringContent(cssContent, outputFilename);
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
