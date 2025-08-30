/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	generateFileHash,
	generatePhpAssetFile,
	FileEmitter,
} from '../utils/index.ts';

import { BaseCssHandler } from '../../abstracts/BaseCssHandler.ts';
import { BaseScriptHandler } from '../../abstracts/BaseScriptHandler.ts';

import type { DiscoveredAssetInfo } from '../types/index.ts';

/**
 * Asset Handler class for handling asset file processing with ESBuild
 * This is specifically designed for the assets plugin and generic asset processing
 */
export class AssetHandler extends BaseCssHandler {
	/**
	 * Output directory for processed assets
	 * @private
	 * @type {string}
	 */
	private outputDirectory: string;

	/**
	 * Dependencies for the asset
	 * @private
	 * @type {string[]}
	 */
	private dependencies: string[];

	/**
	 * Script handler for JavaScript processing
	 * @private
	 * @type {BaseScriptHandler}
	 */
	private scriptHandler: BaseScriptHandler;

	/**
	 * Constructor for AssetHandler
	 */
	constructor({
		context,
		outputDirectory,
		dependencies,
	}: {
		context: PluginContext;
		outputDirectory: string;
		dependencies: string[];
	}) {
		super(context);
		this.outputDirectory = outputDirectory;
		this.dependencies = dependencies;
		this.scriptHandler = new (class extends BaseScriptHandler {})(context);
	}

	/**
	 * Process a single asset file
	 * @param assetInfo - Information about the asset to process
	 * @param sourcemap - The source map configuration
	 * @return {Promise<void>}
	 */
	async processAsset(
		assetInfo: DiscoveredAssetInfo,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		try {
			// Use script handler for building
			const result = await this.scriptHandler.buildScript({
				entryPoint: assetInfo.sourcePath,
				outdir: this.outputDirectory,
				sourcemap,
			});

			// Filter non-empty dependencies
			const configDeps = this.dependencies.filter(
				(dep) => dep.trim() !== ''
			);
			const allDependencies = [...configDeps, ...result.wpDependencies];

			// Generate PHP content
			const phpContent = generatePhpAssetFile(
				allDependencies,
				generateFileHash(result.jsContent)
			);

			// Emit assets
			await this.emitScriptAsset(
				assetInfo,
				result.jsContent,
				result.jsSourceMap
			);
			await this.emitCssAsset(assetInfo, result.cssContent || '');
			await this.emitPhpAsset(assetInfo, phpContent);
		} catch (error) {
			console.warn(
				`Failed to process asset ${assetInfo.sourcePath}:`,
				error
			);
		}
	}

	/**
	 * Emit JavaScript file and source map
	 * @param assetInfo - Information about the asset
	 * @param jsContent - The JavaScript content
	 * @param jsSourceMap - The source map content (if available)
	 */
	async emitScriptAsset(
		assetInfo: DiscoveredAssetInfo,
		content: string,
		sourceMap?: string
	): Promise<void> {
		// Emit JavaScript file
		await FileEmitter.safeEmitFile(this.context, {
			type: 'asset',
			fileName: `${assetInfo.outputPath}.js`,
			source: content,
		});

		// Emit source map if available
		if (sourceMap) {
			await FileEmitter.safeEmitFile(this.context, {
				type: 'asset',
				fileName: `${assetInfo.outputPath}.js.map`,
				source: sourceMap,
			});
		}
	}

	/**
	 * Emit PHP asset file
	 * @param pluginContext - The Rollup plugin context
	 * @param assetInfo - Information about the asset
	 * @param phpContent - The PHP content
	 */
	async emitPhpAsset(
		assetInfo: DiscoveredAssetInfo,
		phpContent: string
	): Promise<void> {
		await FileEmitter.safeEmitFile(this.context, {
			type: 'asset',
			fileName: `${assetInfo.outputPath}.asset.php`,
			source: phpContent,
		});
	}

	/**
	 * Emit CSS file and source map
	 * @param assetInfo - Information about the asset
	 * @param cssContent - The CSS content to process and emit
	 */
	async emitCssAsset(
		assetInfo: DiscoveredAssetInfo,
		content: string
	): Promise<void> {
		if (!this.isValidCssContent(content)) return;

		const styleFileName = `${assetInfo.outputPath}.css`;
		await this.processCssAndEmit(content, styleFileName);
	}
}
