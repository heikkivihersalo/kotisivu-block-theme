/**
 * External dependencies
 */
import { build as esBuild } from 'esbuild';
import { transform } from 'lightningcss';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	generateFileHash,
	generatePhpAssetFile,
	FileEmitter,
} from '../utils/index.ts';

import { ESBUILD_CONFIG, WORDPRESS_CONFIG } from '../constants.ts';
import { scssPlugin } from '../plugins/scssPlugin.ts';
import { ReactShimPlugin } from '../plugins/reactShimPlugin.ts';

import type { DiscoveredAssetInfo } from '../types/index.ts';

/**
 * Asset Handler class for handling asset file processing with ESBuild
 * This is specifically designed for the assets plugin and generic asset processing
 */
export class AssetHandler {
	/**
	 * Rollup plugin context
	 * @private
	 * @type {PluginContext}
	 */
	private context: PluginContext;

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
	 * WordPress dependencies for the asset
	 * @private
	 * @type {string[]}
	 */
	private wpDependencies: string[];

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
		this.context = context;
		this.outputDirectory = outputDirectory;
		this.dependencies = dependencies;
		this.wpDependencies = [];
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
		this.context.addWatchFile(assetInfo.sourcePath);

		const result = await esBuild({
			entryPoints: [assetInfo.sourcePath],
			outdir: this.outputDirectory,
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
			minify: process.env.NODE_ENV === 'production',
			plugins: [scssPlugin, ReactShimPlugin(this.wpDependencies)],
			outExtension: { '.js': '.js', '.css': '.css' },
		});

		const jsContent =
			result.outputFiles?.find((f) => f.path.endsWith('.js'))?.text || '';

		const cssContent =
			result.outputFiles?.find((f) => f.path.endsWith('.css'))?.text ||
			'';

		const jsSourceMapFile = result.outputFiles?.find((f) =>
			f.path.endsWith('.js.map')
		);

		const configDeps = this.dependencies.filter((dep) => dep.trim() !== '');
		const phpContent = generatePhpAssetFile(
			[...configDeps, ...this.wpDependencies],
			generateFileHash(jsContent)
		);

		await this.emitScriptAsset(assetInfo, jsContent, jsSourceMapFile);
		await this.emitCssAsset(assetInfo, cssContent);
		await this.emitPhpAsset(assetInfo, phpContent);
	}

	/**
	 * Emit JavaScript file and source map
	 * @param assetInfo - Information about the asset
	 * @param jsContent - The JavaScript content
	 * @param jsSourceMapFile - The source map file (if available)
	 */
	async emitScriptAsset(
		assetInfo: DiscoveredAssetInfo,
		content: string,
		sourceMap?: any
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
				source: sourceMap.text,
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
		if (!content.trim()) return;

		try {
			const styleFileName = `${assetInfo.outputPath}.css`;
			const { code, map } = this.processCssContent(
				content,
				styleFileName
			);

			// Emit CSS file
			await FileEmitter.safeEmitFile(this.context, {
				type: 'asset',
				fileName: styleFileName,
				source: code.toString(),
			});

			// Emit CSS source map if available
			if (map) {
				await FileEmitter.safeEmitFile(this.context, {
					type: 'asset',
					fileName: `${styleFileName}.map`,
					source: map.toString(),
				});
			}
		} catch (error) {
			console.warn(
				`Failed to process CSS content for ${assetInfo.outputPath}:`,
				error
			);
		}
	}

	/**
	 * Process CSS content with LightningCSS
	 * @param content - The CSS content to process
	 * @param filename - The output filename for the CSS file
	 * @returns Processed CSS code and source map
	 */
	private processCssContent(content: string, filename: string) {
		return transform({
			filename,
			code: Buffer.from(content),
			minify: true,
			sourceMap: true,
		});
	}
}
