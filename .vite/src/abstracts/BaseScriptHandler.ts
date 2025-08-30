/**
 * External dependencies
 */
import { build as esBuild } from 'esbuild';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { ESBUILD_CONFIG, WORDPRESS_CONFIG } from '../common/constants';
import { scssPlugin } from '../common/plugins/scssPlugin';
import { ReactShimPlugin } from '../common/plugins/reactShimPlugin';
import {
	BaseFileHandler,
	type FileProcessingOptions,
	type FileProcessingResult,
} from './BaseFileHandler';

/**
 * ESBuild processing result interface
 */
export interface ScriptProcessingResult {
	jsContent: string;
	cssContent?: string;
	jsSourceMap?: string;
	cssSourceMap?: string;
	wpDependencies: string[];
	metafile?: any;
}

/**
 * ESBuild configuration options
 */
export interface BuildOptions {
	entryPoint: string;
	outfile?: string;
	outdir?: string;
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	minify?: boolean;
	platform?: string;
	target?: string | string[];
}

/**
 * Base Script Handler class providing common JavaScript processing functionality
 *
 * This base class extends BaseFileHandler and adds JavaScript-specific processing
 * capabilities using ESBuild. It provides methods for building, transforming, and
 * emitting JavaScript files along with their associated PHP asset files and source maps.
 */
export abstract class BaseScriptHandler extends BaseFileHandler {
	protected wpDependencies: string[];

	constructor(context: PluginContext) {
		super(context);
		this.wpDependencies = [];
	}

	/**
	 * Implement the abstract method from BaseFileHandler
	 * Process JavaScript file content (bundling, transformation, etc.)
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

		if (
			!this.hasFileExtension(filePath, 'js') &&
			!this.hasFileExtension(filePath, 'ts') &&
			!this.hasFileExtension(filePath, 'jsx') &&
			!this.hasFileExtension(filePath, 'tsx')
		) {
			throw new Error(`Invalid JavaScript file extension: ${filePath}`);
		}

		const buildOptions: BuildOptions = {
			entryPoint: filePath,
			sourcemap: true,
			minify: shouldMinify,
		};

		const result = await this.buildScript(buildOptions);

		return {
			content: result.jsContent,
			sourceMap: result.jsSourceMap,
		};
	}

	/**
	 * Build script with ESBuild (public method for composition usage)
	 * @param options - Build configuration options
	 * @returns ESBuild processing result
	 */
	public async buildScript(
		options: BuildOptions
	): Promise<ScriptProcessingResult> {
		const {
			entryPoint,
			outfile,
			outdir,
			sourcemap = true,
			minify = process.env.NODE_ENV === 'production',
		} = options;

		const result = await esBuild({
			entryPoints: [entryPoint],
			...(outfile && { outfile }),
			...(outdir && { outdir }),
			platform: ESBUILD_CONFIG.PLATFORM,
			bundle: true,
			write: false,
			metafile: true,
			sourcemap,
			loader: ESBUILD_CONFIG.LOADER_MAP,
			target: ESBUILD_CONFIG.TARGET,
			jsx: ESBUILD_CONFIG.JSX_TRANSFORM,
			jsxFactory: WORDPRESS_CONFIG.JSX_FACTORY,
			jsxFragment: WORDPRESS_CONFIG.JSX_FRAGMENT,
			minify,
			plugins: [scssPlugin, ReactShimPlugin(this.wpDependencies)],
			outExtension: { '.js': '.js', '.css': '.css' },
		});

		// Extract content from output files
		const jsContent =
			result.outputFiles?.find((f) => f.path.endsWith('.js'))?.text || '';
		const cssContent =
			result.outputFiles?.find((f) => f.path.endsWith('.css'))?.text ||
			'';
		const jsSourceMap =
			result.outputFiles?.find((f) => f.path.endsWith('.js.map'))?.text ||
			undefined;
		const cssSourceMap =
			result.outputFiles?.find((f) => f.path.endsWith('.css.map'))
				?.text || undefined;

		return {
			jsContent,
			cssContent: cssContent || undefined,
			jsSourceMap,
			cssSourceMap,
			wpDependencies: this.wpDependencies,
			metafile: result.metafile,
		};
	}

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
