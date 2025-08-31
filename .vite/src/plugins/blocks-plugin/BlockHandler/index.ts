/**
 * External dependencies
 */
import { statSync, readdirSync, readFileSync, existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import type { PluginContext } from 'rollup';
import type { ResolvedConfig } from 'vite';

/**
 * Shared dependencies
 */
import { DISCOVERY_CONFIG, FILE_NAMES } from '../../../common/constants.ts';
import { FilePathResolver } from '../../../common/services/FilePathResolver';
import { FileEmitter } from '../../../common/services/FileEmitter.ts';

import type {
	OutputConfig,
	BlockInfo,
	ViteBlocksPluginConfig,
	WordPressBlockJSON,
} from '../../../common/types';

/**
 * Internal dependencies
 */
import { CSS, JS, PHP } from './processors';

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
		this.css = new CSS({ context, config: { outputDirectory } });
		this.js = new JS({ context, config: { outputDirectory } });
		this.php = new PHP({ context, config: { outputDirectory } });
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
			const fullSourcePath = FilePathResolver.generateSourcePath(
				sourcePath,
				this.pwd
			);
			if (!fullSourcePath) continue;

			try {
				const stat = statSync(fullSourcePath);
				if (!stat.isDirectory()) continue;

				const foundBlocks = this.findBlocksRecursively(
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
			this.outputDirectory =
				FilePathResolver.normalizePath(outDir) || 'dist';
		} else {
			const defaultDir = resolvedConfig.build.outDir;
			this.outputDirectory =
				typeof defaultDir === 'string' ? defaultDir : 'dist';
		}

		// Re-initialize file emitter with new output directory
		this.fileEmitter = new FileEmitter(this.outputDirectory);

		// Re-initialize CSS processor with new output directory
		this.css = new CSS({
			context: this.context,
			config: { outputDirectory: this.outputDirectory },
		});
	}

	/**
	 * Initialize the block handler with validation and discovery
	 */
	async initialize(): Promise<void> {
		// Validate configuration
		this.validateConfig();

		// Add HMR watch files if specified
		const hmrWatch = this.config.watch;
		if (hmrWatch) {
			// Add all HMR watch patterns
			const allPatterns = [
				...(hmrWatch.php || []),
				...(hmrWatch.css || []),
				...(hmrWatch.scripts || []),
				...(hmrWatch.blocks || []),
				...(hmrWatch.inline || []),
			];
			allPatterns.forEach((pattern: string) =>
				this.context.addWatchFile(pattern)
			);
		}

		// Discover blocks
		await this.discoverBlocks();

		// In development mode, add all block files to watch list
		if (!this.isBuildMode()) {
			this.addAllBlockFilesToWatchList();
		}
	}

	/**
	 * Add all block files to watch list for comprehensive HMR support
	 */
	private addAllBlockFilesToWatchList(): void {
		this.discoveredBlocks.forEach((block) => {
			try {
				// Watch the entire block directory
				this.context.addWatchFile(block.path);

				// Watch specific important files
				const filesToWatch = [
					'block.json',
					'index.tsx',
					'index.js',
					'index.ts',
					'edit.tsx',
					'edit.js',
					'edit.ts',
					'save.tsx',
					'save.js',
					'save.ts',
					'view.tsx',
					'view.js',
					'view.ts',
					'render.php',
					'style.css',
					'editor.css',
					'style.scss',
					'editor.scss',
				];

				filesToWatch.forEach((fileName) => {
					const filePath = resolve(block.path, fileName);
					if (existsSync(filePath)) {
						this.context.addWatchFile(filePath);
					}
				});
			} catch (error) {
				console.warn(
					`⚠️  Could not add watch for block ${block.name}:`,
					error
				);
			}
		});
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

			await this.php.processFilesAndEmit(phpFileInfos, {
				shouldMinify,
				shouldWatch: true,
			});
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
		const config = this.generateOutputConfig(
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
	 * Process static files for a single block in development mode
	 * This is called during HMR when files change
	 */
	async processStaticFilesForBlock(block: BlockInfo): Promise<void> {
		console.log(`🔄 Processing static files for block: ${block.name}`);

		try {
			// Always process without minification in development
			await this.copyStaticFiles(block, false);
			console.log(`✅ Static files updated for block: ${block.name}`);
		} catch (error) {
			console.error(
				`❌ Failed to process static files for ${block.name}:`,
				error
			);
			throw error;
		}
	}

	/**
	 * Copy static files for all discovered blocks (build mode only)
	 */
	async copyStaticFilesForAllBlocks(): Promise<void> {
		// Always copy static files in build mode
		// In development mode, static files are handled by HMR
		if (!this.isBuildMode()) {
			console.log(
				'Static files will be handled by HMR in development mode'
			);
			return;
		}

		// Determine if we should minify based on environment
		const shouldMinify = process.env.NODE_ENV === 'production';
		const discoveredBlocks = this.getDiscoveredBlocks();

		console.log(
			`📦 Copying static files for ${discoveredBlocks.length} blocks...`
		);

		// Copy static files for each discovered block (only in build mode)
		for (const block of discoveredBlocks) {
			try {
				await this.copyStaticFiles(block, shouldMinify);
				console.log(`✅ Static files copied for block: ${block.name}`);
			} catch (error) {
				console.log(
					`❌ Failed to copy static files for ${block.name}:`,
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

	/**
	 * Helper function to safely parse block.json content
	 */
	private parseBlockJson(filePath: string): WordPressBlockJSON | null {
		try {
			const content = readFileSync(filePath, 'utf-8');
			return JSON.parse(content) as WordPressBlockJSON;
		} catch {
			return null;
		}
	}

	/**
	 * Process a single directory item during block discovery
	 */
	private processDirectoryItem(
		itemPath: string,
		item: string,
		dirPath: string,
		rootPath: string,
		depth: number
	): BlockInfo[] {
		try {
			const stat = statSync(itemPath);

			if (stat.isDirectory() && !this.shouldSkipDirectory(item)) {
				return this.findBlocksRecursively(
					itemPath,
					rootPath,
					depth + 1
				);
			}

			if (item === FILE_NAMES.BLOCK_CONFIG) {
				const blockJson = this.parseBlockJson(itemPath);
				return blockJson
					? [
							{
								path: dirPath,
								blockJson,
								name: this.extractBlockName(dirPath),
							},
						]
					: [];
			}
		} catch {
			// Silently skip inaccessible items
		}

		return [];
	}

	/**
	 * Recursively find block.json files in a directory with depth control
	 */
	private findBlocksRecursively(
		dirPath: string,
		rootPath: string,
		depth: number = 0
	): BlockInfo[] {
		// Prevent infinite recursion
		if (depth > DISCOVERY_CONFIG.MAX_RECURSION_DEPTH) {
			return [];
		}

		try {
			const items = readdirSync(dirPath);
			return items.flatMap((item) =>
				this.processDirectoryItem(
					join(dirPath, item),
					item,
					dirPath,
					rootPath,
					depth
				)
			);
		} catch {
			return [];
		}
	}
	/**
	 * Check if a directory should be skipped during block discovery
	 * @param dirPath - The directory path to check
	 * @return true if the directory should be skipped
	 */
	private shouldSkipDirectory(dirPath: string): boolean {
		const dirName = dirPath.split(/[/\\]/).pop() || '';
		return (
			DISCOVERY_CONFIG.SKIP_DIRECTORIES.includes(dirName) ||
			dirName.startsWith('.')
		);
	}

	private extractBlockName(dirPath: string): string {
		const parts = dirPath.split(/[/\\]/);
		return parts[parts.length - 1] || 'unknown';
	}

	/**
	 * Generate output configuration for block assets
	 * @param blockPath - Path to the block directory
	 * @param blockName - Name of the block
	 * @param customOutputPath - Optional custom output path for assets
	 * @param outputDirectory - Output directory
	 */
	private generateOutputConfig = (
		blockPath: string,
		blockName: string,
		customOutputPath?: string,
		outputDirectory = 'dist'
	): OutputConfig => {
		if (!blockPath) throw new Error('blockPath is required');
		if (!blockName) throw new Error('blockName is required');
		if (!outputDirectory) throw new Error('outputDirectory is required');

		// Use custom output path if provided, otherwise use block name
		const outputPath = customOutputPath || blockName;
		const blockOutputDir = resolve(outputDirectory, outputPath);

		return {
			basePath: blockPath,
			blockOutputDir,
			outputPath,
		};
	};
}
