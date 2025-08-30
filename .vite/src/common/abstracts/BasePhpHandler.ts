/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	BaseFileHandler,
	type FileHandlerConfig,
	type FileProcessingOptions,
	type FileProcessingResult,
} from './BaseFileHandler';
import type { PhpProcessor } from '../interfaces/PhpProcessor';
import { DefaultPhpProcessor } from '../processors/DefaultPhpProcessor';

/**
 * Configuration for the PHP Handler
 */
export interface PhpHandlerConfig extends FileHandlerConfig {
	phpProcessor?: PhpProcessor;
}

/**
 * Base PHP Handler class providing common PHP processing functionality
 *
 * This base class extends BaseFileHandler and adds PHP-specific processing
 * capabilities using dependency injection. It follows the same patterns as BaseCssHandler
 * for consistency and improved testability.
 */
export abstract class BasePhpHandler extends BaseFileHandler {
	protected phpProcessor: PhpProcessor;

	constructor(context: PluginContext, config: PhpHandlerConfig = {}) {
		super(context, config);
		this.phpProcessor = config.phpProcessor || new DefaultPhpProcessor();
	}

	// ========================================
	// Abstract Method Implementation
	// ========================================

	/**
	 * Process PHP file content using the injected PHP processor
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

		this.validatePhpContent(content, filePath);

		const processedContent = this.phpProcessor.process(content, {
			minify: shouldMinify,
		});

		return {
			content: processedContent,
		};
	}

	// ========================================
	// Public Methods (exposed to external consumers)
	// ========================================

	/**
	 * Generate a PHP asset file with dependencies and version hash using the injected processor
	 * @param dependencies - Set or array of dependencies
	 * @param hash - Version hash for the asset
	 * @returns PHP code as a string that returns an array with dependencies and version
	 */
	public generatePhpAssetFile = (
		dependencies: Set<string> | string[] = [],
		hash = ''
	): string => {
		return this.phpProcessor.generatePhpAssetFile(dependencies, hash);
	};

	/**
	 * Generate PHP array content for block manifests using the injected processor
	 * @param blocks - The blocks object containing block.json configurations
	 * @returns A string representing the PHP array content
	 */
	public generatePhpArrayContent(blocks: Record<string, any>): string {
		return this.phpProcessor.generatePhpArrayContent(blocks);
	}

	// ========================================
	// Validation and Error Handling
	// ========================================

	/**
	 * Validate PHP content and throw descriptive errors
	 * @param content - The PHP content to validate
	 * @param filePath - The file path for error context
	 */
	protected validatePhpContent(content: string, filePath: string): void {
		if (!this.isValidPhpContent(content)) {
			throw new Error(`Invalid PHP content in file: ${filePath}`);
		}
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
