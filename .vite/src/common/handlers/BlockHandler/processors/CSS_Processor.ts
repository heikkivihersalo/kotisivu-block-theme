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
} from '../../../utils';
import type { OutputConfig, EmittedAsset } from '../../../types';
import { FileEmitter } from '../../../utils/vite/FileEmitter';

/**
 * CSS Processor utility for handling CSS file processing with LightningCSS
 *
 * This utility is focused specifically on CSS processing for WordPress blocks,
 * providing methods for processing individual files, string content, and
 * handling CSS transformations with proper source maps.
 */
export class CSS_Processor {
	public context: PluginContext;

	constructor({ context }: { context: PluginContext }) {
		this.context = context;
	}

	/**
	 * Process CSS content with LightningCSS
	 * @param cssContent - The CSS content to process
	 * @param outputFilename - The output filename for the CSS file
	 * @returns Processed CSS code and source map
	 */
	private processCssContent(cssContent: string, outputFilename: string) {
		return transform({
			filename: outputFilename,
			code: Buffer.from(cssContent),
			minify: true,
			sourceMap: true,
		});
	}

	/**
	 * Emit CSS and source map assets
	 * @param code - The processed CSS code
	 * @param map - The source map for the CSS code
	 * @param outputFilename - The output filename for the CSS file
	 */
	private async emitAssets(
		code: Uint8Array,
		map: Uint8Array | undefined,
		outputFilename: string
	): Promise<void> {
		// Emit the CSS file
		const cssAsset: EmittedAsset = {
			type: 'asset',
			fileName: outputFilename,
			source: code,
		};

		await FileEmitter.safeEmitFile(this.context, cssAsset);

		// Emit the source map if available
		if (map) {
			const mapAsset: EmittedAsset = {
				type: 'asset',
				fileName: `${outputFilename}.map`,
				source: map.toString(),
			};

			await FileEmitter.safeEmitFile(this.context, mapAsset);
		}
	}

	/**
	 * Process CSS from a string content
	 * @param pluginContext - The Rollup plugin context
	 * @param cssContent - The CSS content to process
	 * @param outputFilename - The output filename for the CSS file
	 */
	async processStringContent(
		cssContent: string,
		outputFilename: string
	): Promise<void> {
		try {
			const { code, map } = this.processCssContent(
				cssContent,
				outputFilename
			);
			await this.emitAssets(code, map || undefined, outputFilename);
		} catch (error) {
			// Skip styles that can't be processed
			console.warn(
				`Failed to process CSS content for ${outputFilename}:`,
				error
			);
		}
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

	/**
	 * Process CSS with base output path (for compatibility with emitCss function)
	 * @param baseOutputPath - Base output path for the CSS file
	 * @param cssContent - CSS content to emit
	 */
	async processWithBasePath(
		baseOutputPath: string,
		cssContent: string
	): Promise<void> {
		const styleFileName = `${baseOutputPath}.css`;
		await this.processStringContent(cssContent, styleFileName);
	}
}
