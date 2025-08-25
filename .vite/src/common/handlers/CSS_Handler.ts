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
} from '../utils';
import type { OutputConfig, EmittedAsset } from '../types';
import { FileEmitter } from '../utils/vite/FileEmitter';

/**
 * CSS Handler class for handling CSS file processing with LightningCSS
 */
export class CSS_Handler {
	private fileEmitter?: FileEmitter;

	constructor(fileEmitter?: FileEmitter) {
		this.fileEmitter = fileEmitter;
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
	 * @param pluginContext - The Rollup plugin context
	 * @param code - The processed CSS code
	 * @param map - The source map for the CSS code
	 * @param outputFilename - The output filename for the CSS file
	 */
	private async emitAssets(
		pluginContext: PluginContext,
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

		if (this.fileEmitter) {
			await this.fileEmitter.emitFile(pluginContext, cssAsset);
		} else {
			await FileEmitter.safeEmitFile(pluginContext, cssAsset);
		}

		// Emit the source map if available
		if (map) {
			const mapAsset: EmittedAsset = {
				type: 'asset',
				fileName: `${outputFilename}.map`,
				source: map.toString(),
			};

			if (this.fileEmitter) {
				await this.fileEmitter.emitFile(pluginContext, mapAsset);
			} else {
				await FileEmitter.safeEmitFile(pluginContext, mapAsset);
			}
		}
	}

	/**
	 * Process CSS from a string content
	 * @param pluginContext - The Rollup plugin context
	 * @param cssContent - The CSS content to process
	 * @param outputFilename - The output filename for the CSS file
	 */
	async processStringContent(
		pluginContext: PluginContext,
		cssContent: string,
		outputFilename: string
	): Promise<void> {
		try {
			const { code, map } = this.processCssContent(
				cssContent,
				outputFilename
			);
			await this.emitAssets(
				pluginContext,
				code,
				map || undefined,
				outputFilename
			);
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
	 * @param pluginContext - The Rollup plugin context
	 * @param styleFile - The original style file name
	 * @param config - The output configuration
	 */
	async processStyle(
		pluginContext: PluginContext,
		styleFile: string,
		config: OutputConfig
	): Promise<void> {
		const actualStylePath = findActualStylePath(config.basePath, styleFile);
		if (!actualStylePath) return;

		pluginContext.addWatchFile(actualStylePath);

		try {
			const cssContent = readStylesheet(actualStylePath);
			const outputFilename = determineOutputFilename(styleFile, config);
			await this.processStringContent(
				pluginContext,
				cssContent,
				outputFilename
			);
		} catch (error) {
			// Skip styles that can't be processed
			console.warn(`Failed to process style file ${styleFile}:`, error);
		}
	}

	/**
	 * Process all styles for a block
	 * @param pluginContext - The Rollup plugin context
	 * @param styles - The original style file names
	 * @param config - The output configuration
	 */
	async processStyles(
		pluginContext: PluginContext,
		styles: string[],
		config: OutputConfig
	): Promise<void> {
		for (const styleFile of styles) {
			await this.processStyle(pluginContext, styleFile, config);
		}
	}

	/**
	 * Process CSS with base output path (for compatibility with emitCss function)
	 * @param pluginContext - The Rollup plugin context
	 * @param baseOutputPath - Base output path for the CSS file
	 * @param cssContent - CSS content to emit
	 */
	async processWithBasePath(
		pluginContext: PluginContext,
		baseOutputPath: string,
		cssContent: string
	): Promise<void> {
		const styleFileName = `${baseOutputPath}.css`;
		await this.processStringContent(
			pluginContext,
			cssContent,
			styleFileName
		);
	}
}
