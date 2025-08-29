/**
 * Types for BlockHandler services
 */
import type { PluginContext } from 'rollup';
import type {
	BlockInfo,
	OutputConfig,
	ViteBlocksPluginConfig,
} from '../../types';

/**
 * Configuration for processing operations
 */
export type ProcessingConfig = {
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	minifyPhp?: boolean;
	processStaticFiles?: boolean;
};

/**
 * Base processor interface for shared functionality
 */
export type BaseProcessor = {
	context: PluginContext;
};

/**
 * CSS processing capabilities
 */
export type CssProcessorCapabilities = {
	processStyle(styleFile: string, config: OutputConfig): Promise<void>;
	processStyles(styles: string[], config: OutputConfig): Promise<void>;
	processStringContent(
		cssContent: string,
		outputFilename: string
	): Promise<void>;
	processWithBasePath(
		baseOutputPath: string,
		cssContent: string
	): Promise<void>;
};

/**
 * JavaScript processing capabilities
 */
export type JsProcessorCapabilities = {
	processScript(
		script: string,
		config: OutputConfig,
		sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both'
	): Promise<void>;
	processScripts(
		scripts: string[],
		config: OutputConfig,
		sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both'
	): Promise<void>;
};

/**
 * PHP processing capabilities
 */
export type PhpProcessorCapabilities = {
	processPhp(
		phpPath: string,
		outputFileName: string,
		shouldMinify?: boolean
	): Promise<void>;
	processPhpFiles(
		phpFiles: Array<{ sourcePath: string; outputPath: string }>,
		shouldMinify?: boolean
	): Promise<void>;
};

/**
 * Service for discovering WordPress blocks
 */
export type BlockDiscoveryService = {
	discoverBlocks(): Promise<BlockInfo[]>;
	getDiscoveredBlocks(): BlockInfo[];
	validateConfig(): void;
};

/**
 * Service for processing block assets (CSS, JS, PHP)
 */
export type AssetProcessorService = {
	processAssets(
		block: BlockInfo,
		config: OutputConfig,
		options?: ProcessingConfig
	): Promise<void>;
	processCompleteBlock(
		block: BlockInfo,
		config: OutputConfig,
		options?: ProcessingConfig
	): Promise<void>;
	processBlockWithAutoConfig(
		block: BlockInfo,
		options?: ProcessingConfig
	): Promise<void>;
};

/**
 * Service for managing static files and manifests
 */
export type FileManagerService = {
	copyStaticFiles(block: BlockInfo, shouldMinify?: boolean): Promise<void>;
	generateManifest(blocks: BlockInfo[]): Promise<void>;
	processBlockJson(block: BlockInfo): Promise<void>;
	processBlockPhpFiles(
		block: BlockInfo,
		shouldMinify?: boolean
	): Promise<void>;
};

/**
 * Dependencies required by services
 */
export type ServiceDependencies = {
	context: PluginContext;
	outputDirectory: string;
	config: ViteBlocksPluginConfig;
	pwd: string;
};

/**
 * Shared processors for dependency injection
 */
export type SharedProcessors = {
	css: CssProcessorCapabilities & BaseProcessor;
	js: JsProcessorCapabilities & BaseProcessor;
	php: PhpProcessorCapabilities & BaseProcessor;
};
