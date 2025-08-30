/**
 * External dependencies
 */
import { readFileSync } from 'node:fs';
import type { PluginContext } from 'rollup';
import { createHash } from 'node:crypto';

/**
 * Shared dependencies
 */
import { FileEmitter } from '../common/utils/vite/FileEmitter';
import type {
	EmittedAsset,
	BundlerChunkInfo,
	BundlerAssetInfo,
} from '../common/types';

/**
 * File processing result interface
 */
export interface FileProcessingResult<T = string> {
	content: T;
	sourceMap?: string;
}

/**
 * File processing options interface
 */
export interface FileProcessingOptions {
	shouldMinify?: boolean;
	shouldWatch?: boolean;
	encoding?: BufferEncoding;
}

/**
 * Base File Handler class providing common file processing functionality
 *
 * This base class encapsulates common file operations such as reading files,
 * watching files for changes, emitting assets, and handling errors consistently.
 * It can be extended by specific handlers that need file processing capabilities.
 */
export abstract class BaseFileHandler {
	protected context: PluginContext;

	constructor(context: PluginContext) {
		this.context = context;
	}

	/**
	 * Read file content from disk
	 * @param filePath - The path to the file to read
	 * @param encoding - The file encoding (default: 'utf-8')
	 * @returns File content as string
	 */
	protected readFileContent(
		filePath: string,
		encoding: BufferEncoding = 'utf-8'
	): string {
		return readFileSync(filePath, encoding);
	}

	/**
	 * Add file to watch list for rebuild triggers
	 * @param filePath - The path to the file to watch
	 */
	protected addToWatchList(filePath: string): void {
		this.context.addWatchFile(filePath);
	}

	/**
	 * Emit a single asset file
	 * @param fileName - The output file name
	 * @param content - The file content
	 * @param source - Optional custom source (defaults to content)
	 */
	protected async emitAsset(
		fileName: string,
		content: string | Uint8Array,
		source?: string | Uint8Array
	): Promise<void> {
		const asset: EmittedAsset = {
			type: 'asset',
			fileName,
			source: source || content,
		};

		await FileEmitter.safeEmitFile(this.context, asset);
	}

	/**
	 * Emit multiple related assets (e.g., file + source map)
	 * @param assets - Array of asset configurations
	 */
	protected async emitAssets(
		assets: Array<{
			fileName: string;
			content: string | Uint8Array;
			source?: string | Uint8Array;
		}>
	): Promise<void> {
		for (const asset of assets) {
			await this.emitAsset(asset.fileName, asset.content, asset.source);
		}
	}

	/**
	 * Process a file and emit the result
	 * @param filePath - The path to the file to process
	 * @param outputFileName - The output file name
	 * @param options - Processing options
	 */
	protected async processFileAndEmit(
		filePath: string,
		outputFileName: string,
		options: FileProcessingOptions = {}
	): Promise<void> {
		const { shouldWatch = true, encoding = 'utf-8' } = options;

		try {
			// Add to watch list if requested
			if (shouldWatch) {
				this.addToWatchList(filePath);
			}

			// Read and process the file
			const content = this.readFileContent(filePath, encoding);
			const processedContent = await this.processFileContent(
				content,
				filePath,
				options
			);

			// Emit the processed content
			await this.emitAsset(outputFileName, processedContent.content);

			// Emit source map if available
			if (processedContent.sourceMap) {
				await this.emitAsset(
					`${outputFileName}.map`,
					processedContent.sourceMap
				);
			}
		} catch (error) {
			this.handleFileProcessingError(outputFileName, error);
		}
	}

	/**
	 * Process multiple files with the same options
	 * @param files - Array of file configurations
	 * @param options - Processing options
	 */
	protected async processFilesAndEmit(
		files: Array<{ sourcePath: string; outputPath: string }>,
		options: FileProcessingOptions = {}
	): Promise<void> {
		for (const file of files) {
			await this.processFileAndEmit(
				file.sourcePath,
				file.outputPath,
				options
			);
		}
	}

	/**
	 * Handle file processing errors with consistent logging
	 * @param fileName - The file name that failed to process
	 * @param error - The error that occurred
	 */
	protected handleFileProcessingError(
		fileName: string,
		error: unknown
	): void {
		console.warn(`Failed to process file ${fileName}:`, error);
	}

	/**
	 * Check if file content is valid for processing
	 * @param content - The file content to validate
	 * @returns True if the content can be processed
	 */
	protected isValidFileContent(content: string): boolean {
		return typeof content === 'string' && content.trim().length > 0;
	}

	/**
	 * Check if a file path has a specific extension
	 * @param filePath - The file path to check
	 * @param extension - The extension to check for (without dot)
	 * @returns True if the file has the specified extension
	 */
	protected hasFileExtension(filePath: string, extension: string): boolean {
		return filePath.toLowerCase().endsWith(`.${extension.toLowerCase()}`);
	}

	/**
	 * Extract filename without extension
	 * @param filePath - The file path
	 * @returns Filename without extension
	 */
	protected getFilenameWithoutExtension(filePath: string): string {
		const parts = filePath.split('/');
		const filename = parts[parts.length - 1];
		const dotIndex = filename.lastIndexOf('.');
		return dotIndex > 0 ? filename.substring(0, dotIndex) : filename;
	}

	/**
	 * Generate a version hash for the given bundle.
	 * This hash can be used to identify changes in the bundle's content.
	 *
	 * @param bundle - The bundle to generate a hash for.
	 * @return The generated version hash.
	 */
	protected generateVersionHash(bundle: {
		[fileName: string]: BundlerChunkInfo | BundlerAssetInfo;
	}): string {
		const hash = createHash('md5');

		const sortedFiles = Object.values(bundle).sort((a, b) =>
			a.fileName.localeCompare(b.fileName)
		);

		for (const file of sortedFiles) {
			const source = file.type === 'chunk' ? file.code : file.source;
			if (source) {
				hash.update(source);
			}
		}

		return hash.digest('hex');
	}

	/**
	 * Generate a hash for a file.
	 * @param content - The content of the file to hash.
	 * @returns The hash of the file.
	 */
	protected generateFileHash(content: Buffer | string): string {
		return createHash('md5').update(content).digest('hex');
	}

	/**
	 * Generate a version string from a filename
	 * This function extracts a version hash from the filename,
	 * typically used for cache busting in asset management.
	 *
	 * @param filename - The name of the file to extract the version from.
	 * @return A string representing the version, or '1.0.0' if no
	 */
	protected generateVersionFromFile(filename: string): string {
		const match = filename.match(/[.-]([a-f0-9]{8,})\./);
		return match ? match[1].substring(0, 8) : '1.0.0';
	}

	/**
	 * Abstract method for processing file content
	 * Must be implemented by extending classes
	 * @param content - The file content to process
	 * @param filePath - The original file path
	 * @param options - Processing options
	 * @returns Processed content and optional source map
	 */
	protected abstract processFileContent(
		content: string,
		filePath: string,
		options: FileProcessingOptions
	): Promise<FileProcessingResult>;
}
