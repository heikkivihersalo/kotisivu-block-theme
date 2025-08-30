/**
 * External dependencies
 */
import { transform } from 'lightningcss';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	BaseFileHandler,
	type FileProcessingOptions,
	type FileProcessingResult,
} from './BaseFileHandler';

/**
 * CSS processing result interface
 */
export interface CssProcessingResult {
	code: Uint8Array;
	map?: Uint8Array;
}

/**
 * Base CSS Handler class providing common CSS processing functionality
 *
 * This base class extends BaseFileHandler and adds CSS-specific processing
 * capabilities using LightningCSS. It provides methods for processing CSS content
 * and emitting CSS assets with source maps.
 */
export abstract class BaseCssHandler extends BaseFileHandler {
	constructor(context: PluginContext) {
		super(context);
	}

	/**
	 * Implement the abstract method from BaseFileHandler
	 * Process CSS file content (minification, transformation, etc.)
	 * @param content - The CSS content to process
	 * @param filePath - The original file path
	 * @param options - Processing options
	 * @returns Processed CSS content
	 */
	protected async processFileContent(
		content: string,
		filePath: string,
		_options: FileProcessingOptions
	): Promise<FileProcessingResult> {
		if (!this.isValidCssContent(content)) {
			throw new Error(`Invalid CSS content in file: ${filePath}`);
		}

		const filename = this.getFilenameWithoutExtension(filePath) + '.css';
		const { code, map } = this.processCssContent(content, filename);

		return {
			content: code.toString(),
			sourceMap: map?.toString(),
		};
	}

	/**
	 * Process CSS content with LightningCSS
	 * @param cssContent - The CSS content to process
	 * @param filename - The filename for the CSS file (used for source maps)
	 * @returns Processed CSS code and source map
	 */
	protected processCssContent(
		cssContent: string,
		filename: string
	): CssProcessingResult {
		const { code, map } = transform({
			filename,
			code: Buffer.from(cssContent),
			minify: true,
			sourceMap: true,
		});

		return {
			code,
			map: map || undefined,
		};
	}

	/**
	 * Emit CSS and source map assets using base class methods
	 * @param code - The processed CSS code
	 * @param map - The source map for the CSS code (optional)
	 * @param filename - The output filename for the CSS file
	 */
	protected async emitCssAssets(
		code: Uint8Array,
		map: Uint8Array | undefined,
		filename: string
	): Promise<void> {
		// Emit the CSS file
		await this.emitAsset(filename, code);

		// Emit source map if available
		if (map) {
			await this.emitAsset(`${filename}.map`, map.toString());
		}
	}

	/**
	 * Process CSS content and emit the resulting assets
	 * @param cssContent - The CSS content to process
	 * @param filename - The output filename for the CSS file
	 */
	protected async processCssAndEmit(
		cssContent: string,
		filename: string
	): Promise<void> {
		if (!cssContent.trim()) return;

		try {
			const { code, map } = this.processCssContent(cssContent, filename);
			await this.emitCssAssets(code, map, filename);
		} catch (error) {
			this.handleFileProcessingError(filename, error);
		}
	}

	/**
	 * Process a single CSS file with default CSS options
	 * @param sourcePath - The path to the CSS file
	 * @param outputPath - The output path for the processed file
	 * @param shouldMinify - Whether to minify the CSS content (always true for CSS)
	 */
	async processCssFile(
		sourcePath: string,
		outputPath: string,
		shouldMinify: boolean = true
	): Promise<void> {
		await this.processFileAndEmit(sourcePath, outputPath, {
			shouldMinify,
			shouldWatch: true,
		});
	}

	/**
	 * Process multiple CSS files with the same options
	 * @param cssFiles - Array of CSS file configurations
	 * @param shouldMinify - Whether to minify the CSS content
	 */
	async processCssFiles(
		cssFiles: Array<{ sourcePath: string; outputPath: string }>,
		shouldMinify: boolean = true
	): Promise<void> {
		await this.processFilesAndEmit(cssFiles, {
			shouldMinify,
			shouldWatch: true,
		});
	}

	/**
	 * Handle CSS processing errors with consistent logging
	 * @param filename - The filename that failed to process
	 * @param error - The error that occurred
	 */
	protected handleFileProcessingError(
		filename: string,
		error: unknown
	): void {
		console.warn(`Failed to process CSS content for ${filename}:`, error);
	}

	/**
	 * Check if CSS content is valid for processing
	 * @param cssContent - The CSS content to validate
	 * @returns True if the content can be processed
	 */
	protected isValidCssContent(cssContent: string): boolean {
		return typeof cssContent === 'string' && cssContent.trim().length > 0;
	}
}
