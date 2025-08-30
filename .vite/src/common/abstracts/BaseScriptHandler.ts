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
import type {
	ScriptProcessor,
	ScriptBuildOptions,
	ScriptProcessingResult,
} from '../interfaces/ScriptProcessor';
import { ESBuildProcessor } from '../processors/ESBuildProcessor';

/**
 * Configuration for the Script Handler
 */
export interface ScriptHandlerConfig extends FileHandlerConfig {
	scriptProcessor?: ScriptProcessor;
}

/**
 * Base Script Handler class providing common JavaScript processing functionality
 *
 * This base class extends BaseFileHandler and adds JavaScript-specific processing
 * capabilities using dependency injection. It follows the same patterns as BaseCssHandler
 * for consistency and improved testability.
 */
export abstract class BaseScriptHandler extends BaseFileHandler {
	protected scriptProcessor: ScriptProcessor;
	protected wpDependencies: string[];

	constructor(context: PluginContext, config: ScriptHandlerConfig = {}) {
		super(context, config);
		this.scriptProcessor = config.scriptProcessor || new ESBuildProcessor();
		this.wpDependencies = [];
	}

	// ========================================
	// Abstract Method Implementation
	// ========================================

	/**
	 * Implement the abstract method from BaseFileHandler
	 * Process JavaScript file content using the injected script processor
	 * @param content - The JavaScript content to process (not used directly, file path is used instead)
	 * @param filePath - The original file path
	 * @param options - Processing options
	 * @returns Processed JavaScript content
	 */
	protected async processFileContent(
		_content: string,
		filePath: string,
		options: FileProcessingOptions
	): Promise<FileProcessingResult> {
		const { shouldMinify = process.env.NODE_ENV === 'production' } =
			options;

		this.validateScriptFile(filePath);

		const buildOptions = {
			entryPoint: filePath,
			sourcemap: true,
			minify: shouldMinify,
			wpDependencies: this.wpDependencies,
		};

		const result = await this.scriptProcessor.build(buildOptions);

		return {
			content: result.jsContent,
			sourceMap: result.jsSourceMap,
		};
	}

	// ========================================
	// Public Methods (exposed to external consumers)
	// ========================================

	/**
	 * Build script with the injected script processor (public method for composition usage)
	 * @param options - Build configuration options
	 * @returns Script processing result
	 */
	public async buildScript(
		options: ScriptBuildOptions
	): Promise<ScriptProcessingResult> {
		// Ensure wpDependencies are included in the options
		const buildOptions = {
			...options,
			wpDependencies: options.wpDependencies || this.wpDependencies,
		};

		return await this.scriptProcessor.build(buildOptions);
	}

	// ========================================
	// Protected Methods (for subclass usage)
	// ========================================

	/**
	 * Emit JavaScript file and source map
	 * @param jsContent - The JavaScript content
	 * @param jsSourceMap - The source map content (optional)
	 * @param outputFileName - The output file name
	 */
	protected async emitScriptAssets(
		jsContent: string,
		jsSourceMap: string | undefined,
		outputFileName: string
	): Promise<void> {
		// Emit JavaScript file
		await this.emitAsset(outputFileName, jsContent);

		// Emit source map if available
		if (jsSourceMap) {
			await this.emitAsset(`${outputFileName}.map`, jsSourceMap);
		}
	}

	/**
	 * Handle script processing errors with consistent logging
	 * @param fileName - The file name that failed to process
	 * @param error - The error that occurred
	 */
	protected handleFileProcessingError(
		fileName: string,
		error: unknown
	): void {
		console.warn(`Failed to process script file ${fileName}:`, error);
	}

	/**
	 * Extract and register bundled dependencies for file watching
	 * @param pluginContext - The Rollup plugin context
	 * @param metafile - The esbuild metafile
	 * @param script - The script file name
	 */
	protected registerBundledDependencies = (
		pluginContext: PluginContext,
		metafile: any,
		script: string
	) => {
		const bundledDependencies = Object.keys(metafile.inputs).filter(
			(dep) => {
				if (dep === 'src/' + script) return false;
				if (/:/.test(dep)) return false;
				return true;
			}
		);

		bundledDependencies.forEach((dep) => {
			pluginContext.addWatchFile(dep);
		});
	};

	// ========================================
	// Validation and Utility Methods
	// ========================================

	/**
	 * Check if script content/file is valid for processing
	 * @param scriptPath - The script file path to validate
	 * @returns True if the script can be processed
	 */
	protected isValidScriptFile(scriptPath: string): boolean {
		return (
			this.hasFileExtension(scriptPath, 'js') ||
			this.hasFileExtension(scriptPath, 'ts') ||
			this.hasFileExtension(scriptPath, 'jsx') ||
			this.hasFileExtension(scriptPath, 'tsx')
		);
	}

	/**
	 * Validate script file path and throw descriptive errors
	 * @param filePath - The file path to validate
	 */
	protected validateScriptFile(filePath: string): void {
		if (!this.isValidScriptFile(filePath)) {
			throw new Error(
				`Invalid JavaScript file extension: ${filePath}. Supported extensions: .js, .jsx, .ts, .tsx`
			);
		}
	}

	// ========================================
	// WordPress Dependencies Management
	// ========================================

	/**
	 * Set WordPress dependencies for the script processing
	 * @param dependencies - Array of WordPress dependency handles
	 */
	protected setWpDependencies(dependencies: string[]): void {
		this.wpDependencies = dependencies;
	}

	/**
	 * Add WordPress dependencies to the current list
	 * @param dependencies - Array of WordPress dependency handles to add
	 */
	protected addWpDependencies(dependencies: string[]): void {
		this.wpDependencies.push(...dependencies);
	}

	/**
	 * Clear WordPress dependencies
	 */
	protected clearWpDependencies(): void {
		this.wpDependencies = [];
	}
}
