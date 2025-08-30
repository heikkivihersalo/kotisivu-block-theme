/**
 * External dependencies
 */
import { statSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import type { PluginContext } from 'rollup';
import type { ResolvedConfig } from 'vite';

/**
 * Internal dependencies
 */
import { CSS, JS, PHP } from './processors';
import {
	normalizePath,
	generateSourcePath,
	findBlocksRecursively,
	generateOutputConfig,
	FileEmitter,
} from '../../utils';
import type {
	OutputConfig,
	BlockInfo,
	ViteBlocksPluginConfig,
} from '../../types';

/**
 * Main Block Handler class for WordPress Gutenberg block processing
 *
 * Handles block discovery, asset processing, and manifest generation
 * for WordPress Gutenberg blocks in a Vite build system.
 */
export class BlockHandler {
	static manifestName = 'block-manifest.php';

	private css: CSS;
	private js: JS;
	private php: PHP;
	private fileEmitter: FileEmitter;

	private context: PluginContext;
	private outputDirectory: string;
	private config: ViteBlocksPluginConfig;
	private pwd: string;
	private discoveredBlocks: BlockInfo[] = [];

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

		// Initialize processors
		this.css = new CSS({ context });
		this.js = new JS({ context });
		this.php = new PHP({ context });
		this.fileEmitter = new FileEmitter(outputDirectory);
	}

	/**
	 * Validate the configuration for the block handler
	 */
	private validateConfig(): void {
		const { blocksDir } = this.config;

		if (!blocksDir || Object.keys(blocksDir).length === 0) {
			throw new Error('blocksDir is required for BlockHandler');
		}
	}

	/**
	 * Check if this is build mode vs serve mode
	 */
	private isBuildMode(): boolean {
		return process.argv.includes('build');
	}

	/**
	 * Discover block.json files with custom path mappings
	 */
	private discoverBlocksWithMappings(): BlockInfo[] {
		const { blocksDir } = this.config;
		const blocks: BlockInfo[] = [];

		for (const [outputPath, sourcePath] of Object.entries(blocksDir)) {
			const fullSourcePath = generateSourcePath(sourcePath, this.pwd);
			if (!fullSourcePath) continue;

			try {
				const stat = statSync(fullSourcePath);
				if (!stat.isDirectory()) continue;

				const foundBlocks = findBlocksRecursively(
					fullSourcePath,
					this.pwd,
					0
				);

				// Add custom output path to each discovered block
				foundBlocks.forEach((block) => {
					blocks.push({
						...block,
						outputPath: `${outputPath.replace(/\/$/, '')}/${block.name}`,
					});
				});
			} catch {
				// Silently skip inaccessible paths - this is expected during development
				continue;
			}
		}

		return blocks;
	}

	/**
	 * Discover blocks and validate discovery results
	 */
	async discoverBlocks(): Promise<BlockInfo[]> {
		this.discoveredBlocks = this.discoverBlocksWithMappings();

		if (this.discoveredBlocks.length === 0) {
			throw new Error(
				'No blocks discovered. Check your blocksDir configuration'
			);
		}

		return this.discoveredBlocks;
	}

	/**
	 * Get discovered blocks
	 */
	getDiscoveredBlocks(): BlockInfo[] {
		return this.discoveredBlocks;
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

		// Re-initialize file emitter with new output directory
		this.fileEmitter = new FileEmitter(this.outputDirectory);
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
	 * Extract scripts from block.json with file: prefix handling
	 */
	private extractScripts(blockJson: any): string[] {
		const scripts: string[] = [];

		['script', 'editorScript', 'viewScript'].forEach((prop) => {
			const scriptValue = blockJson[prop];
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

		return scripts;
	}

	/**
	 * Extract styles from block.json with file: prefix handling
	 */
	private extractStyles(blockJson: any): string[] {
		const styles: string[] = [];

		['style', 'editorStyle', 'viewStyle'].forEach((prop) => {
			const styleValue = blockJson[prop];
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

		return styles;
	}

	/**
	 * Process WordPress convention CSS files (editor.css and style.css)
	 */
	private async processWordPressConventionFiles(
		block: BlockInfo,
		config: OutputConfig
	): Promise<void> {
		// Handle WordPress convention CSS files with proper naming
		// editor.css -> index.css (editor styles)
		const editorCssPath = resolve(block.path, 'editor.css');
		if (existsSync(editorCssPath)) {
			await this.css.processStyle('editor.css', config);
		}

		// style.css -> style-index.css (frontend styles)
		const styleCssPath = resolve(block.path, 'style.css');
		if (existsSync(styleCssPath)) {
			await this.css.processStyle('style.css', config);
		}
	}

	/**
	 * Process block.json file and emit it to the output directory
	 */
	async processBlockJson(block: BlockInfo): Promise<void> {
		const destPath = block.outputPath || block.name;

		try {
			const blockJsonSrc = resolve(block.path, 'block.json');
			const blockJsonContent = await readFile(blockJsonSrc, 'utf-8');

			await this.fileEmitter.writeStaticFile(
				`${destPath}/block.json`,
				blockJsonContent
			);
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
	 */
	async processBlockPhpFiles(
		block: BlockInfo,
		shouldMinify: boolean = true
	): Promise<void> {
		const destPath = block.outputPath || block.name;

		try {
			const files = await readdir(block.path);
			const phpFiles = files.filter((file) => file.endsWith('.php'));

			if (phpFiles.length === 0) {
				return;
			}

			const phpFileInfos = phpFiles.map((phpFile) => ({
				sourcePath: resolve(block.path, phpFile),
				outputPath: `${destPath}/${phpFile}`,
			}));

			await this.php.processPhpFiles(phpFileInfos, shouldMinify);
		} catch (error) {
			console.error(
				`Failed to process PHP files for ${block.name}:`,
				error
			);
			throw error;
		}
	}

	/**
	 * Copy all static files for a block (block.json and PHP files)
	 */
	async copyStaticFiles(
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
	 */
	async processCompleteBlock(
		block: BlockInfo,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		// Generate output configuration
		const config = generateOutputConfig(
			block.path,
			block.name,
			block.outputPath,
			this.outputDirectory
		);

		// Extract scripts and styles from block.json
		const scripts = this.extractScripts(block.blockJson);
		const styles = this.extractStyles(block.blockJson);

		// Process all assets in parallel for better performance
		const promises: Promise<void>[] = [];

		if (styles.length > 0) {
			promises.push(this.css.processStyles(styles, config));
		}

		if (scripts.length > 0) {
			promises.push(this.js.processScripts(scripts, config, sourcemap));
		}

		await Promise.all(promises);

		// Process WordPress convention files
		await this.processWordPressConventionFiles(block, config);
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
			await this.processCompleteBlock(block, sourcemap);
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
				await this.copyStaticFiles(block, shouldMinify);
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
	 * Generate block manifest file
	 */
	async generateManifest(blocks: BlockInfo[]): Promise<void> {
		if (blocks.length === 0) {
			console.log(
				'No blocks found. Skipping block manifest generation...'
			);
			return;
		}

		// Convert blocks array to a record object that generatePhpArrayContent expects
		const blocksRecord: Record<string, any> = {};

		blocks.forEach((block) => {
			blocksRecord[block.name] = block.blockJson;
		});

		// Generate PHP content
		const phpContent = this.php.generatePhpArrayContent(blocksRecord);

		// Always use FileEmitter.safeEmitFile which handles both build and dev modes properly
		await FileEmitter.safeEmitFile(this.context, {
			type: 'asset',
			fileName: BlockHandler.manifestName,
			source: phpContent,
		});
	}

	// Legacy method for compatibility
	async sideload({
		block,
		sourcemap = false,
	}: {
		block: BlockInfo;
		sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	}): Promise<boolean> {
		await this.processCompleteBlock(block, sourcemap);
		return true;
	}
}
