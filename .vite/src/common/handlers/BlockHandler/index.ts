/**
 * External dependencies
 */
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import { CSS_Processor, JS_Processor, PHP_Processor } from './utils';
import { FileEmitter, generateOutputConfig } from '../../utils';
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
	private context: PluginContext;
	private outputDirectory: string;
	private fileEmitter?: FileEmitter;

	constructor({
		context,
		outputDirectory,
	}: { context: PluginContext; outputDirectory: string }) {
		this.context = context;
		this.css = new CSS_Processor({ context });
		this.js = new JS_Processor({ context });
		this.php = new PHP_Processor({ context });
		this.outputDirectory = outputDirectory;
		this.fileEmitter = new FileEmitter(outputDirectory);
	}

	/**
	 * Process CSS files for a block
	 * @param pluginContext - The Rollup plugin context
	 * @param styles - Array of style file names
	 * @param config - Output configuration
	 */
	async processStyleFiles(
		styles: string[],
		config: OutputConfig
	): Promise<void> {
		await this.css.processStyles(styles, config);
	}

	/**
	 * Process a single CSS file
	 * @param pluginContext - The Rollup plugin context
	 * @param styleFile - Style file name
	 * @param config - Output configuration
	 */
	async processStyle(styleFile: string, config: OutputConfig): Promise<void> {
		await this.css.processStyle(styleFile, config);
	}

	/**
	 * Process CSS from string content
	 * @param pluginContext - The Rollup plugin context
	 * @param cssContent - CSS content to process
	 * @param outputFilename - Output filename
	 */
	async processCssContent(
		cssContent: string,
		outputFilename: string
	): Promise<void> {
		await this.css.processStringContent(cssContent, outputFilename);
	}

	/**
	 * Process CSS with base output path
	 * @param pluginContext - The Rollup plugin context
	 * @param baseOutputPath - Base output path for the CSS file
	 * @param cssContent - CSS content to emit
	 */
	async processCssWithBasePath(
		baseOutputPath: string,
		cssContent: string
	): Promise<void> {
		await this.css.processWithBasePath(baseOutputPath, cssContent);
	}

	/**
	 * Process JavaScript files for a block
	 * @param pluginContext - The Rollup plugin context
	 * @param scripts - Array of script file names
	 * @param config - Output configuration
	 * @param sourcemap - Source map configuration
	 */
	async processScriptFiles(
		scripts: string[],
		config: OutputConfig,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		await this.js.processScripts(scripts, config, sourcemap);
	}

	/**
	 * Process a single JavaScript file
	 * @param script - Script file name
	 * @param config - Output configuration
	 * @param sourcemap - Source map configuration
	 */
	async processScript(
		script: string,
		config: OutputConfig,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		await this.js.processScript(script, config, sourcemap);
	}

	/**
	 * Process PHP files for a block
	 * @param pluginContext - The Rollup plugin context
	 * @param phpFiles - Array of PHP file information
	 * @param shouldMinify - Whether to minify PHP content
	 */
	async processPhpFiles(
		phpFiles: Array<{ sourcePath: string; outputPath: string }>,
		shouldMinify: boolean = true
	): Promise<void> {
		await this.php.processPhpFiles(phpFiles, shouldMinify);
	}

	/**
	 * Process a single PHP file
	 * @param phpPath - Path to the PHP file
	 * @param outputFileName - Output file name
	 * @param shouldMinify - Whether to minify PHP content
	 */
	async processPhp(
		phpPath: string,
		outputFileName: string,
		shouldMinify: boolean = true
	): Promise<void> {
		await this.php.processPhp(phpPath, outputFileName, shouldMinify);
	}

	/**
	 * Process all block assets (CSS, JS, PHP) in one method
	 * @param assets - Object containing all assets to process
	 * @param config - Output configuration
	 * @param options - Processing options
	 */
	async processBlockAssets(
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
			promises.push(this.processStyleFiles(assets.styles, config));
		}

		if (assets.scripts?.length) {
			promises.push(
				this.processScriptFiles(assets.scripts, config, sourcemap)
			);
		}

		if (assets.phpFiles?.length) {
			promises.push(this.processPhpFiles(assets.phpFiles, minifyPhp));
		}

		await Promise.all(promises);
	}

	/**
	 * Process block.json file and emit it to the output directory
	 * @param block - Block information containing path and output details
	 */
	async processBlockJson(block: BlockInfo): Promise<void> {
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
				this.context.emitFile({
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

				await this.processPhpFiles(phpFileInfos, shouldMinify);
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
	 * @param block - Block information containing path and output details
	 * @param shouldMinify - Whether to minify PHP content
	 */
	async processBlockStaticFiles(
		block: BlockInfo,
		shouldMinify: boolean = true
	): Promise<void> {
		// Process block.json and PHP files in parallel
		await Promise.all([
			this.processBlockJson(block),
			this.processBlockPhpFiles(block, shouldMinify),
		]);
	}

	/**
	 * Process a complete block with all its assets
	 * @param block - Block information
	 * @param config - Output configuration
	 * @param options - Processing options
	 */
	async processCompleteBlock(
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
		await this.processBlockAssets({ scripts, styles }, config, {
			sourcemap,
			minifyPhp,
		});

		// Process static files if requested
		if (processStaticFiles) {
			await this.processBlockStaticFiles(block, minifyPhp);
		}
	}

	async sideload({
		block,
		sourcemap = false,
	}: {
		block: BlockInfo;
		sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	}): Promise<boolean> {
		// Generate output configuration
		const config = generateOutputConfig(
			block.path,
			block.name,
			block.outputPath,
			this.outputDirectory
		);

		// Process the complete block using the block handler
		await this.processCompleteBlock(block, config, {
			sourcemap,
		});

		// Handle WordPress convention CSS files with proper naming
		// editor.css -> index.css (editor styles)
		const editorCssPath = resolve(block.path, 'editor.css');
		if (!existsSync(editorCssPath)) {
			throw new Error(
				`Required editor.css file not found at: ${editorCssPath}`
			);
		}

		// Create a custom config for the editor CSS with WordPress naming convention
		const editorConfig = {
			...config,
			outputPath: config.outputPath, // Will generate index.css automatically
		};
		await this.processStyle('editor.css', editorConfig);

		// style.css -> style-index.css (frontend styles)
		const styleCssPath = resolve(block.path, 'style.css');
		if (!existsSync(styleCssPath)) {
			throw new Error(
				`Required style.css file not found at: ${styleCssPath}`
			);
		}

		// Create a custom config for the style CSS with WordPress naming convention
		const styleConfig = {
			...config,
			outputPath: config.outputPath, // Will need to handle style-index.css naming
		};
		// For now, use the existing handler - we may need to enhance it later
		// to handle the style-index.css naming convention
		await this.processStyle('style.css', styleConfig);

		return true;
	}
}
