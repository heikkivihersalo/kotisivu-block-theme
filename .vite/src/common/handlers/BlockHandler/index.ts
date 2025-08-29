/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';
import type { ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import { CSS_Processor, JS_Processor, PHP_Processor } from './processors';
import { BlockDiscovery, AssetProcessor, FileManager } from './services';
import { normalizePath } from '../../utils';
import type {
	OutputConfig,
	BlockInfo,
	ViteBlocksPluginConfig,
} from '../../types';

/**
 * Main Block Handler class for comprehensive WordPress Gutenberg block processing
 *
 * This handler serves as the central orchestrator for all WordPress block operations
 * and provides a unified interface for:
 *
 * - Block discovery and validation
 * - Configuration management and validation
 * - Asset processing (CSS, JS, PHP)
 * - Static file management
 * - Build/development mode coordination
 * - Watch file management
 * - Manifest generation
 *
 * The handler is designed to work with Vite plugins but can be used independently
 * for block processing in other build systems.
 */
export class BlockHandler {
	static manifestName = 'block-manifest.php';

	// Shared processors (single instances used by all services)
	private processors: {
		css: CSS_Processor;
		js: JS_Processor;
		php: PHP_Processor;
	};

	// New service-based architecture
	private blockDiscovery!: BlockDiscovery;
	private assetProcessor!: AssetProcessor;
	private fileManager!: FileManager;

	// Core dependencies
	private context: PluginContext;
	private outputDirectory: string;
	private config: ViteBlocksPluginConfig;
	private pwd: string;

	constructor({
		context,
		outputDirectory,
		config,
	}: {
		context: PluginContext;
		outputDirectory: string;
		config: ViteBlocksPluginConfig;
	}) {
		this.context = context;
		this.outputDirectory = outputDirectory;
		this.config = config;
		this.pwd = process.env.PWD || process.cwd();

		// Initialize shared processors (single source of truth)
		this.processors = {
			css: new CSS_Processor({ context }),
			js: new JS_Processor({ context }),
			php: new PHP_Processor({ context }),
		};

		// Initialize services with shared processors
		this.initializeServices();
	}

	/**
	 * Initialize services with dependency injection
	 */
	private initializeServices(): void {
		const serviceDependencies = {
			context: this.context,
			outputDirectory: this.outputDirectory,
			config: this.config,
			pwd: this.pwd,
		};

		this.blockDiscovery = new BlockDiscovery(serviceDependencies);
		this.assetProcessor = new AssetProcessor(
			serviceDependencies,
			this.processors
		);
		this.fileManager = new FileManager(serviceDependencies, {
			php: this.processors.php,
		});
	}

	/**
	 * Validate the configuration for the block handler
	 * @throws Error if configuration is invalid
	 */
	private validateConfig(): void {
		this.blockDiscovery.validateConfig();
	}

	/**
	 * Check if this is build mode vs serve mode
	 */
	private isBuildMode(): boolean {
		return process.argv.includes('build');
	}

	/**
	 * Discover blocks and validate discovery results
	 */
	async discoverBlocks(): Promise<BlockInfo[]> {
		return await this.blockDiscovery.discoverBlocks();
	}

	/**
	 * Get discovered blocks
	 */
	getDiscoveredBlocks(): BlockInfo[] {
		return this.blockDiscovery.getDiscoveredBlocks();
	}

	/**
	 * Configure output directory from resolved Vite config
	 */
	configureOutputDirectory(resolvedConfig: ResolvedConfig): void {
		const { outDir } = this.config;

		if (typeof outDir === 'string') {
			this.outputDirectory = normalizePath(outDir) || 'dist';
		} else {
			const defaultDir = resolvedConfig.build.outDir;
			this.outputDirectory =
				typeof defaultDir === 'string' ? defaultDir : 'dist';
		}

		// Re-initialize services with new output directory
		this.initializeServices();
	}

	/**
	 * Initialize the block handler with validation and discovery
	 */
	async initialize(): Promise<void> {
		// Validate configuration
		this.validateConfig();

		// Add watch files if specified
		const { watch = [] } = this.config;
		watch.forEach((file: string) => this.context.addWatchFile(file));

		// Discover blocks
		await this.discoverBlocks();
	}

	/**
	 * Process all discovered blocks
	 */
	async processAllBlocks(
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		const discoveredBlocks = this.getDiscoveredBlocks();

		// Process discovered blocks for both dev and build modes
		for (const block of discoveredBlocks) {
			await this.sideload({ block, sourcemap });
		}

		// Generate block manifest
		await this.generateManifest(discoveredBlocks);
	}

	/**
	 * Copy static files for all discovered blocks (build mode only)
	 */
	async copyStaticFilesForAllBlocks(): Promise<void> {
		// Only copy static files in build mode
		if (!this.isBuildMode()) {
			console.log('Skipping static file copying in serve mode');
			return;
		}

		// Determine if we should minify based on environment
		const shouldMinify = process.env.NODE_ENV === 'production';
		const discoveredBlocks = this.getDiscoveredBlocks();

		// Copy static files for each discovered block (only in build mode)
		for (const block of discoveredBlocks) {
			try {
				// Use FileManager to process all static files
				await this.fileManager.copyStaticFiles(block, shouldMinify);
			} catch (error) {
				console.log(
					`[copyStaticFilesForAllBlocks] Failed to copy static files for ${block.name}:`,
					error
				);
				// Skip blocks with missing or invalid files
				continue;
			}
		}
	}

	/**
	 * Process CSS files for a block
	 * @param styles - Array of style file names
	 * @param config - Output configuration
	 */
	async processStyleFiles(
		styles: string[],
		config: OutputConfig
	): Promise<void> {
		await this.processors.css.processStyles(styles, config);
	}

	/**
	 * Process a single CSS file
	 * @param styleFile - Style file name
	 * @param config - Output configuration
	 */
	async processStyle(styleFile: string, config: OutputConfig): Promise<void> {
		await this.processors.css.processStyle(styleFile, config);
	}

	/**
	 * Process CSS from string content
	 * @param cssContent - CSS content to process
	 * @param outputFilename - Output filename
	 */
	async processCssContent(
		cssContent: string,
		outputFilename: string
	): Promise<void> {
		await this.processors.css.processStringContent(
			cssContent,
			outputFilename
		);
	}

	/**
	 * Process CSS with base output path
	 * @param baseOutputPath - Base output path for the CSS file
	 * @param cssContent - CSS content to emit
	 */
	async processCssWithBasePath(
		baseOutputPath: string,
		cssContent: string
	): Promise<void> {
		await this.processors.css.processWithBasePath(
			baseOutputPath,
			cssContent
		);
	}

	/**
	 * Process JavaScript files for a block
	 * @param scripts - Array of script file names
	 * @param config - Output configuration
	 * @param sourcemap - Source map configuration
	 */
	async processScriptFiles(
		scripts: string[],
		config: OutputConfig,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		await this.processors.js.processScripts(scripts, config, sourcemap);
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
		await this.processors.js.processScript(script, config, sourcemap);
	}

	/**
	 * Process PHP files for a block
	 * @param phpFiles - Array of PHP file information
	 * @param shouldMinify - Whether to minify PHP content
	 */
	async processPhpFiles(
		phpFiles: Array<{ sourcePath: string; outputPath: string }>,
		shouldMinify: boolean = true
	): Promise<void> {
		await this.processors.php.processPhpFiles(phpFiles, shouldMinify);
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
		await this.processors.php.processPhp(
			phpPath,
			outputFileName,
			shouldMinify
		);
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
		await this.fileManager.processBlockJson(block);
	}

	/**
	 * Process PHP files for a block
	 * @param block - Block information containing path and output details
	 * @param shouldMinify - Whether to minify PHP content
	 */
	async processBlockPhpFiles(
		block: BlockInfo,
		shouldMinify: boolean = true
	): Promise<void> {
		await this.fileManager.processBlockPhpFiles(block, shouldMinify);
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
		await this.fileManager.copyStaticFiles(block, shouldMinify);
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
		// Delegate to the AssetProcessor service
		await this.assetProcessor.processCompleteBlock(block, config, options);

		// Process static files if requested
		if (options.processStaticFiles) {
			await this.fileManager.copyStaticFiles(block, options.minifyPhp);
		}
	}

	async sideload({
		block,
		sourcemap = false,
	}: {
		block: BlockInfo;
		sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	}): Promise<boolean> {
		// Use the new AssetProcessor for streamlined processing
		await this.assetProcessor.processBlockWithAutoConfig(block, {
			sourcemap,
		});

		return true;
	}

	async generateManifest(blocks: BlockInfo[]): Promise<void> {
		await this.fileManager.generateManifest(blocks);
	}
}

/**
 * Export services for direct use
 */
export { BlockDiscovery, AssetProcessor, FileManager } from './services';

/**
 * Export processors for direct use
 */
export { CSS_Processor, JS_Processor, PHP_Processor } from './processors';

/**
 * Export types for external use
 */
export type * from './types';
