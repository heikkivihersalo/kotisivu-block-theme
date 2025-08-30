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

		const processedContent = shouldMinify
			? this.minifyPhp(content)
			: content;

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

	/**
	 * Convert JavaScript object to PHP array format
	 * @param value - The value to convert to PHP array format
	 * @param indent - Current indentation level (for recursive calls)
	 * @param minify - Whether to minify the output
	 * @return A string representing the PHP array content
	 */
	convertToPhpArray(value: any, indent = 0, minify = false): string {
		const space = minify ? '' : ' ';
		const newline = minify ? '' : '\n';
		const tab = minify ? '' : '\t'.repeat(indent);
		const nextTab = minify ? '' : '\t'.repeat(indent + 1);

		// Handle primitives
		if (value === null) return 'null';
		if (typeof value === 'boolean') return value ? 'true' : 'false';
		if (typeof value === 'number') return value.toString();
		if (typeof value === 'string') {
			const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
			return `'${escaped}'`;
		}

		// Handle arrays
		if (Array.isArray(value)) {
			if (value.length === 0) return '[]';

			const items = value.map((item) => {
				const converted = this.convertToPhpArray(
					item,
					indent + 1,
					minify
				);
				return `${nextTab}${converted}`;
			});
			return `[${newline}${items.join(`,${newline}`)}${newline}${tab}]`;
		}

		// Handle objects
		if (typeof value === 'object') {
			const keys = Object.keys(value);
			if (keys.length === 0) return '[]';

			const pairs = keys.map((key) => {
				const phpKey = this.convertToPhpArray(key, 0, minify);
				const phpValue = this.convertToPhpArray(
					value[key],
					indent + 1,
					minify
				);
				return `${nextTab}${phpKey}${space}=>${space}${phpValue}`;
			});
			return `[${newline}${pairs.join(`,${newline}`)}${newline}${tab}]`;
		}

		return 'null';
	}

	/**
	 * Convert JavaScript object to PHP array format
	 * @param blocks - The blocks object containing block.json configurations.
	 * @return A string representing the PHP array content
	 */
	generatePhpArrayContent(blocks: Record<string, any>): string {
		const timestamp = new Date().toISOString();

		let phpContent = `<?php
	/**
	 * Block Manifest
	 * 
	 * Auto-generated block manifest containing all block.json configurations.
	 * Generated on: ${timestamp}
	 * 
	 */
	
	return `;

		phpContent += this.convertToPhpArray(blocks, 0);
		phpContent += ';\n';

		return phpContent;
	}

	/**
	 * Generate a PHP asset file with dependencies and version hash.
	 *
	 * @param {Set<string> | string[]} dependencies - Set or array of dependencies.
	 * @param {string} [hash=''] - Version hash for the asset.
	 * @return {string} PHP code as a string that returns an array with dependencies and version
	 */
	generatePhpAssetFile = (
		dependencies: Set<string> | string[] = [],
		hash = ''
	): string => {
		const data = {
			dependencies: Array.from(dependencies),
			version: hash,
		};

		return `<?php return ${this.convertToPhpArray(data, 0, true)};`;
	};

	/**
	 * Minify PHP content by removing comments, unnecessary whitespace, and formatting
	 * This is a conservative minifier that maintains readability while reducing file size
	 * @param content - The PHP content to minify
	 * @return The minified PHP content
	 */
	minifyPhp = (content: string): string => {
		let result = content;

		// Remove multi-line comments /* ... */
		result = result.replace(/\/\*[\s\S]*?\*\//g, '');

		// Remove single-line comments // ... but preserve URLs like http://
		result = result.replace(/(?<!:)\/\/(?!\/)[^\r\n]*/g, '');

		// Remove single-line comments # ...
		result = result.replace(/(?<!['"])#[^\r\n]*/g, '');

		// Remove excessive whitespace while preserving structure
		// Replace multiple spaces/tabs with single space
		result = result.replace(/[ \t]+/g, ' ');

		// Remove trailing whitespace from lines
		result = result.replace(/[ \t]+$/gm, '');

		// Remove leading whitespace but preserve indentation structure
		result = result.replace(/^[ \t]+/gm, '');

		// Remove multiple consecutive newlines, keep max 1 empty line
		result = result.replace(/\n{3,}/g, '\n\n');

		// Trim start and end
		result = result.trim();

		// Add back single newline at end of file if it doesn't exist
		if (!result.endsWith('\n')) {
			result += '\n';
		}

		return result;
	};
}
