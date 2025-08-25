/**
 * External dependencies
 */
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import { CSS_Processor, JS_Processor, PHP_Processor } from './utils';
import { FileEmitter } from '../../utils';
import type { OutputConfig, BlockInfo } from '../../types';

/**
 * Main Block Handler class that combines CSS, JS, and PHP processing
 *
 * This handler is specifically designed for WordPress block processing
 * and provides a unified interface for handling all block assets.
 */
export class BlockHandler {
	private css: CSS_Processor;
	private js: JS_Processor;
	private php: PHP_Processor;
	private fileEmitter?: FileEmitter;

	constructor(outputDirectory?: string) {
		this.css = new CSS_Processor();
		this.js = new JS_Processor();
		this.php = new PHP_Processor();

		if (outputDirectory) {
			this.fileEmitter = new FileEmitter(outputDirectory);
		}
	}

	/**
	 * Process CSS files for a block
	 * @param pluginContext - The Rollup plugin context
	 * @param styles - Array of style file names
	 * @param config - Output configuration
	 */
	async processStyleFiles(
		pluginContext: PluginContext,
		styles: string[],
		config: OutputConfig
	): Promise<void> {
		await this.css.processStyles(pluginContext, styles, config);
	}

	/**
	 * Process a single CSS file
	 * @param pluginContext - The Rollup plugin context
	 * @param styleFile - Style file name
	 * @param config - Output configuration
	 */
	async processStyle(
		pluginContext: PluginContext,
		styleFile: string,
		config: OutputConfig
	): Promise<void> {
		await this.css.processStyle(pluginContext, styleFile, config);
	}

	/**
	 * Process CSS from string content
	 * @param pluginContext - The Rollup plugin context
	 * @param cssContent - CSS content to process
	 * @param outputFilename - Output filename
	 */
	async processCssContent(
		pluginContext: PluginContext,
		cssContent: string,
		outputFilename: string
	): Promise<void> {
		await this.css.processStringContent(
			pluginContext,
			cssContent,
			outputFilename
		);
	}

	/**
	 * Process CSS with base output path
	 * @param pluginContext - The Rollup plugin context
	 * @param baseOutputPath - Base output path for the CSS file
	 * @param cssContent - CSS content to emit
	 */
	async processCssWithBasePath(
		pluginContext: PluginContext,
		baseOutputPath: string,
		cssContent: string
	): Promise<void> {
		await this.css.processWithBasePath(
			pluginContext,
			baseOutputPath,
			cssContent
		);
	}

	/**
	 * Process JavaScript files for a block
	 * @param pluginContext - The Rollup plugin context
	 * @param scripts - Array of script file names
	 * @param config - Output configuration
	 * @param sourcemap - Source map configuration
	 */
	async processScriptFiles(
		pluginContext: PluginContext,
		scripts: string[],
		config: OutputConfig,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		await this.js.processScripts(pluginContext, scripts, config, sourcemap);
	}

	/**
	 * Process a single JavaScript file
	 * @param pluginContext - The Rollup plugin context
	 * @param script - Script file name
	 * @param config - Output configuration
	 * @param sourcemap - Source map configuration
	 */
	async processScript(
		pluginContext: PluginContext,
		script: string,
		config: OutputConfig,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		await this.js.processScript(pluginContext, script, config, sourcemap);
	}

	/**
	 * Process PHP files for a block
	 * @param pluginContext - The Rollup plugin context
	 * @param phpFiles - Array of PHP file information
	 * @param shouldMinify - Whether to minify PHP content
	 */
	async processPhpFiles(
		pluginContext: PluginContext,
		phpFiles: Array<{ sourcePath: string; outputPath: string }>,
		shouldMinify: boolean = true
	): Promise<void> {
		await this.php.processPhpFiles(pluginContext, phpFiles, shouldMinify);
	}

	/**
	 * Process a single PHP file
	 * @param pluginContext - The Rollup plugin context
	 * @param phpPath - Path to the PHP file
	 * @param outputFileName - Output file name
	 * @param shouldMinify - Whether to minify PHP content
	 */
	async processPhp(
		pluginContext: PluginContext,
		phpPath: string,
		outputFileName: string,
		shouldMinify: boolean = true
	): Promise<void> {
		await this.php.processPhp(
			pluginContext,
			phpPath,
			outputFileName,
			shouldMinify
		);
	}

	/**
	 * Process all block assets (CSS, JS, PHP) in one method
	 * @param pluginContext - The Rollup plugin context
	 * @param assets - Object containing all assets to process
	 * @param config - Output configuration
	 * @param options - Processing options
	 */
	async processBlockAssets(
		pluginContext: PluginContext,
		assets: {
			styles?: string[];
			scripts?: string[];
			phpFiles?: Array<{ sourcePath: string; outputPath: string }>;
		},
		config: OutputConfig,
		options: {
			sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
			minifyPhp?: boolean;
		} = {}
	): Promise<void> {
		const { sourcemap = false, minifyPhp = true } = options;

		// Process all assets in parallel for better performance
		const promises: Promise<void>[] = [];

		if (assets.styles?.length) {
			promises.push(
				this.processStyleFiles(pluginContext, assets.styles, config)
			);
		}

		if (assets.scripts?.length) {
			promises.push(
				this.processScriptFiles(
					pluginContext,
					assets.scripts,
					config,
					sourcemap
				)
			);
		}

		if (assets.phpFiles?.length) {
			promises.push(
				this.processPhpFiles(pluginContext, assets.phpFiles, minifyPhp)
			);
		}

		await Promise.all(promises);
	}

	/**
	 * Process block.json file and emit it to the output directory
	 * @param pluginContext - The Rollup plugin context
	 * @param block - Block information containing path and output details
	 */
	async processBlockJson(
		pluginContext: PluginContext,
		block: BlockInfo
	): Promise<void> {
		const destPath = block.outputPath || block.name;

		try {
			const blockJsonSrc = resolve(block.path, 'block.json');
			const blockJsonContent = await readFile(blockJsonSrc, 'utf-8');

			if (this.fileEmitter) {
				// Use FileEmitter for static files like block.json
				await this.fileEmitter.writeStaticFile(
					`${destPath}/block.json`,
					blockJsonContent
				);
			} else {
				// Fallback to plugin context emitFile
				pluginContext.emitFile({
					type: 'asset',
					fileName: `${destPath}/block.json`,
					source: blockJsonContent,
				});
			}
		} catch (error) {
			console.error(
				`Failed to process block.json for ${block.name}:`,
				error
			);
			throw error;
		}
	}

	/**
	 * Process PHP files for a block
	 * @param pluginContext - The Rollup plugin context
	 * @param block - Block information containing path and output details
	 * @param shouldMinify - Whether to minify PHP content
	 */
	async processBlockPhpFiles(
		pluginContext: PluginContext,
		block: BlockInfo,
		shouldMinify: boolean = true
	): Promise<void> {
		const destPath = block.outputPath || block.name;

		try {
			const files = await readdir(block.path);
			const phpFiles = files.filter((file) => file.endsWith('.php'));

			if (phpFiles.length > 0) {
				const phpFileInfos = phpFiles.map((phpFile) => ({
					sourcePath: resolve(block.path, phpFile),
					outputPath: `${destPath}/${phpFile}`,
				}));

				await this.processPhpFiles(
					pluginContext,
					phpFileInfos,
					shouldMinify
				);
			}
		} catch (error) {
			console.error(
				`Failed to process PHP files for ${block.name}:`,
				error
			);
			throw error;
		}
	}

	/**
	 * Process all static files for a block (block.json and PHP files)
	 * @param pluginContext - The Rollup plugin context
	 * @param block - Block information containing path and output details
	 * @param shouldMinify - Whether to minify PHP content
	 */
	async processBlockStaticFiles(
		pluginContext: PluginContext,
		block: BlockInfo,
		shouldMinify: boolean = true
	): Promise<void> {
		// Process block.json and PHP files in parallel
		await Promise.all([
			this.processBlockJson(pluginContext, block),
			this.processBlockPhpFiles(pluginContext, block, shouldMinify),
		]);
	}

	/**
	 * Process a complete block with all its assets
	 * @param pluginContext - The Rollup plugin context
	 * @param block - Block information
	 * @param config - Output configuration
	 * @param options - Processing options
	 */
	async processCompleteBlock(
		pluginContext: PluginContext,
		block: BlockInfo,
		config: OutputConfig,
		options: {
			sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
			minifyPhp?: boolean;
			processStaticFiles?: boolean;
		} = {}
	): Promise<void> {
		const {
			sourcemap = false,
			minifyPhp = true,
			processStaticFiles = false,
		} = options;

		// Extract scripts and styles from block.json
		const scripts: string[] = [];
		const styles: string[] = [];

		// Extract from various script properties with proper file: prefix handling
		['script', 'editorScript', 'viewScript'].forEach((prop) => {
			const scriptValue = block.blockJson[prop];
			if (typeof scriptValue === 'string') {
				if (scriptValue.startsWith('file:')) {
					scripts.push(scriptValue.replace('file:./', ''));
				}
			} else if (Array.isArray(scriptValue)) {
				scriptValue.forEach((script) => {
					if (
						typeof script === 'string' &&
						script.startsWith('file:')
					) {
						scripts.push(script.replace('file:./', ''));
					}
				});
			}
		});

		// Extract from various style properties with proper file: prefix handling
		['style', 'editorStyle', 'viewStyle'].forEach((prop) => {
			const styleValue = block.blockJson[prop];
			if (typeof styleValue === 'string') {
				if (styleValue.startsWith('file:')) {
					styles.push(styleValue.replace('file:./', ''));
				}
			} else if (Array.isArray(styleValue)) {
				styleValue.forEach((style) => {
					if (
						typeof style === 'string' &&
						style.startsWith('file:')
					) {
						styles.push(style.replace('file:./', ''));
					}
				});
			}
		});

		// Process block assets
		await this.processBlockAssets(
			pluginContext,
			{ scripts, styles },
			config,
			{ sourcemap, minifyPhp }
		);

		// Process static files if requested
		if (processStaticFiles) {
			await this.processBlockStaticFiles(pluginContext, block, minifyPhp);
		}
	}
}
