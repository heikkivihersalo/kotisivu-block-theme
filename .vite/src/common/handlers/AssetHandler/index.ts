/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { PHP, JS, CSS } from './processors';

import type { DiscoveredAssetInfo } from '../../types/index.ts';

/**
 * Asset Handler class for handling asset file processing with ESBuild
 * This is specifically designed for the assets plugin and generic asset processing
 * Uses composition instead of inheritance for better separation of concerns
 */
export class AssetHandler {
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
	 * @type {JS}
	 */
	private scriptHandler: JS;

	/**
	 * Style handler for CSS processing
	 * @private
	 * @type {CSS}
	 */
	private styleHandler: CSS;

	/**
	 * PHP handler for PHP processing
	 * @private
	 * @type {PHP}
	 */
	private phpHandler: PHP;

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
		this.outputDirectory = outputDirectory;
		this.dependencies = dependencies;
		this.scriptHandler = new JS({ context });
		this.styleHandler = new CSS({ context });
		this.phpHandler = new PHP({ context });
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

			// Emit assets using asset emitter
			await this.scriptHandler.emitScriptAsset(
				assetInfo,
				result.jsContent,
				result.jsSourceMap
			);

			await this.styleHandler.emitCssAsset(
				assetInfo,
				result.cssContent || ''
			);

			await this.phpHandler.emitPhpAssetWithDependencies(
				assetInfo,
				allDependencies,
				result.jsContent
			);
		} catch (error) {
			console.warn(
				`Failed to process asset ${assetInfo.sourcePath}:`,
				error
			);
		}
	}
}
