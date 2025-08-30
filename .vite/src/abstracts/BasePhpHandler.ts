/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { minifyPhp } from '../common/utils/index';
import {
	BaseFileHandler,
	type FileProcessingOptions,
	type FileProcessingResult,
} from './BaseFileHandler';

/**
 * Base PHP Handler class providing common PHP processing functionality
 *
 * This base class extends BaseFileHandler and adds PHP-specific processing
 * capabilities such as minification. It can be extended by specific handlers
 * that need PHP processing capabilities.
 */
export abstract class BasePhpHandler extends BaseFileHandler {
	constructor(context: PluginContext) {
		super(context);
	}

	/**
	 * Process PHP file content (minification, validation, etc.)
	 * @param content - The PHP content to process
	 * @param filePath - The original file path
	 * @param options - Processing options
	 * @returns Processed PHP content
	 */
	protected async processFileContent(
		content: string,
		filePath: string,
		options: FileProcessingOptions
	): Promise<FileProcessingResult> {
		const { shouldMinify = true } = options;

		if (!this.isValidPhpContent(content)) {
			throw new Error(`Invalid PHP content in file: ${filePath}`);
		}

		const processedContent = shouldMinify ? minifyPhp(content) : content;

		return {
			content: processedContent,
		};
	}

	/**
	 * Check if PHP content is valid for processing
	 * @param content - The PHP content to validate
	 * @returns True if the content is valid PHP
	 */
	protected isValidPhpContent(content: string): boolean {
		return (
			this.isValidFileContent(content) &&
			(content.includes('<?php') || content.includes('<?='))
		);
	}

	/**
	 * Process a single PHP file with default PHP options
	 * @param sourcePath - The path to the PHP file
	 * @param outputPath - The output path for the processed file
	 * @param shouldMinify - Whether to minify the PHP content
	 */
	async processPhpFile(
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
	 * Process multiple PHP files with the same options
	 * @param phpFiles - Array of PHP file configurations
	 * @param shouldMinify - Whether to minify the PHP content
	 */
	async processPhpFiles(
		phpFiles: Array<{ sourcePath: string; outputPath: string }>,
		shouldMinify: boolean = true
	): Promise<void> {
		await this.processFilesAndEmit(phpFiles, {
			shouldMinify,
			shouldWatch: true,
		});
	}

	/**
	 * Handle PHP processing errors with specific context
	 * @param fileName - The file name that failed to process
	 * @param error - The error that occurred
	 */
	protected handleFileProcessingError(
		fileName: string,
		error: unknown
	): void {
		// For PHP files, we often want to silently skip files that can't be processed
		// This maintains backward compatibility with the original PHP_Processor behavior
		console.warn(`Failed to process PHP file ${fileName}:`, error);
	}
}
