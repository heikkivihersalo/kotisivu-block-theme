/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	BaseFileHandler,
	type FileProcessingOptions,
	type FileProcessingResult,
} from './BaseFileHandler';
import { WORDPRESS_STYLE_MAPPING } from '../constants';
import type { OutputConfig } from '../types';
import type { CssProcessor } from '../interfaces/CssProcessor';
import { LightningCssProcessor } from '../processors/LightningCssProcessor';
import { FilePathResolver } from '../services/FilePathResolver';

/**
 * Configuration for the CSS Handler
 */
export interface CssHandlerConfig {
	cssProcessor?: CssProcessor;
	filePathResolver?: typeof FilePathResolver;
	outputDirectory?: string;
}

/**
 * Refactored CSS Handler class with improved testability and separation of concerns
 *
 * This version uses dependency injection and composition to make the class
 * more testable and flexible. It separates CSS processing logic, file path
 * resolution, and asset emission concerns.
 */
export abstract class BaseCssHandler extends BaseFileHandler {
	protected cssProcessor: CssProcessor;
	protected filePathResolver: typeof FilePathResolver;

	constructor(context: PluginContext, config: CssHandlerConfig = {}) {
		super(context, { outputDirectory: config.outputDirectory });
		this.cssProcessor = config.cssProcessor || new LightningCssProcessor();
		this.filePathResolver = config.filePathResolver || FilePathResolver;
	}

	// ========================================
	// Abstract Method Implementation
	// ========================================

	/**
	 * Implement the abstract method from BaseFileHandler
	 * Process CSS file content (minification, transformation, etc.)
	 */
	protected async processFileContent(
		content: string,
		filePath: string,
		options: FileProcessingOptions
	): Promise<FileProcessingResult> {
		// Skip processing if content is empty or invalid
		if (!this.isValidCssContent(content)) {
			console.warn(
				`Empty or invalid CSS content in file: ${filePath}, skipping processing`
			);
			return {
				content: '',
				sourceMap: undefined,
			};
		}

		this.validateCssContent(content, filePath);

		const filename = this.getFilenameWithoutExtension(filePath) + '.css';
		const processResult = await this.cssProcessor.process(
			content,
			filename,
			{
				minify: options.shouldMinify !== false,
				sourceMap: true,
			}
		);

		return {
			content: processResult.code.toString(),
			sourceMap: processResult.map?.toString(),
		};
	}

	// ========================================
	// Protected Methods (for subclass usage)
	// ========================================

	/**
	 * Emit CSS and source map assets
	 */
	protected async emitCssAssets(
		code: Uint8Array,
		map: Uint8Array | undefined,
		filename: string
	): Promise<void> {
		await this.emitAsset(filename, code);

		if (map) {
			await this.emitAsset(`${filename}.map`, map.toString());
		}
	}

	/**
	 * Find the actual style file path using the file path resolver
	 */
	protected findActualStylePath(
		basePath: string,
		fileName: string
	): string | null {
		return this.filePathResolver.findActualStylePath(basePath, fileName);
	}

	/**
	 * Determine output filename based on WordPress conventions
	 */
	protected determineOutputFilename(
		styleFile: string,
		config: OutputConfig
	): string {
		const mappedName = WORDPRESS_STYLE_MAPPING[styleFile];
		const targetFile = mappedName || styleFile;
		return this.generateAssetFilename(targetFile, config.outputPath);
	}

	// ========================================
	// Validation and Error Handling
	// ========================================

	/**
	 * Validate CSS content and throw descriptive errors
	 */
	protected validateCssContent(content: string, filePath: string): void {
		if (!this.isValidCssContent(content)) {
			throw new Error(`Invalid CSS content in file: ${filePath}`);
		}
	}

	/**
	 * Check if CSS content is valid for processing
	 */
	protected isValidCssContent(cssContent: string): boolean {
		return typeof cssContent === 'string' && cssContent.trim().length >= 0;
	}

	/**
	 * Handle CSS processing errors with consistent logging
	 */
	protected handleCssProcessingError(filename: string, error: unknown): void {
		console.warn(`Failed to process CSS content for ${filename}:`, error);
	}
}
