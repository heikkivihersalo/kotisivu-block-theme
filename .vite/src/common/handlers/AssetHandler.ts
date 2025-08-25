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
	 * Process a single asset file
	 * @param pluginContext - The Rollup plugin context
	 * @param assetInfo - Information about the asset to process
	 * @param outputDirectory - The output directory
	 * @param dependencies - Additional dependencies to include
	 * @param sourcemap - The source map configuration
	 * @return {Promise<{jsContent: string, cssContent: string, jsSourceMapFile?: any, allDependencies: string[], hash: string}>}
	 */
	async processAsset(
		pluginContext: PluginContext,
		assetInfo: DiscoveredAssetInfo,
		outputDirectory: string,
		dependencies: string[] = [],
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<{
		jsContent: string;
		cssContent: string;
		jsSourceMapFile?: any;
		allDependencies: string[];
		hash: string;
		phpContent: string;
	}> {
		pluginContext.addWatchFile(assetInfo.sourcePath);
		const wpImports: string[] = [];

		const result = await esBuild({
			entryPoints: [assetInfo.sourcePath],
			outdir: outputDirectory,
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
			plugins: [scssPlugin, ReactShimPlugin(wpImports)],
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
		const hash = generateFileHash(jsContent);

		const configDeps = dependencies.filter((dep) => dep.trim() !== '');
		const allDependencies = [...configDeps, ...wpImports];
		const phpContent = generatePhpAssetFile(allDependencies, hash);

		return {
			jsContent,
			cssContent,
			jsSourceMapFile,
			allDependencies,
			hash,
			phpContent,
		};
	}

	/**
	 * Emit JavaScript file and source map
	 * @param pluginContext - The Rollup plugin context
	 * @param assetInfo - Information about the asset
	 * @param jsContent - The JavaScript content
	 * @param jsSourceMapFile - The source map file (if available)
	 */
	async emitJavaScriptAssets(
		pluginContext: PluginContext,
		assetInfo: DiscoveredAssetInfo,
		jsContent: string,
		jsSourceMapFile?: any
	): Promise<void> {
		// Emit JavaScript file
		await FileEmitter.safeEmitFile(pluginContext, {
			type: 'asset',
			fileName: `${assetInfo.outputPath}.js`,
			source: jsContent,
		});

		// Emit source map if available
		if (jsSourceMapFile) {
			await FileEmitter.safeEmitFile(pluginContext, {
				type: 'asset',
				fileName: `${assetInfo.outputPath}.js.map`,
				source: jsSourceMapFile.text,
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
		pluginContext: PluginContext,
		assetInfo: DiscoveredAssetInfo,
		phpContent: string
	): Promise<void> {
		await FileEmitter.safeEmitFile(pluginContext, {
			type: 'asset',
			fileName: `${assetInfo.outputPath}.asset.php`,
			source: phpContent,
		});
	}

	/**
	 * Process CSS content with LightningCSS
	 * @param cssContent - The CSS content to process
	 * @param outputFilename - The output filename for the CSS file
	 * @returns Processed CSS code and source map
	 */
	private processCssContent(cssContent: string, outputFilename: string) {
		return transform({
			filename: outputFilename,
			code: Buffer.from(cssContent),
			minify: true,
			sourceMap: true,
		});
	}

	/**
	 * Emit CSS file and source map
	 * @param pluginContext - The Rollup plugin context
	 * @param assetInfo - Information about the asset
	 * @param cssContent - The CSS content to process and emit
	 */
	async emitCssAssets(
		pluginContext: PluginContext,
		assetInfo: DiscoveredAssetInfo,
		cssContent: string
	): Promise<void> {
		if (!cssContent.trim()) return;

		try {
			const styleFileName = `${assetInfo.outputPath}.css`;
			const { code, map } = this.processCssContent(
				cssContent,
				styleFileName
			);

			// Emit CSS file
			await FileEmitter.safeEmitFile(pluginContext, {
				type: 'asset',
				fileName: styleFileName,
				source: code.toString(),
			});

			// Emit CSS source map if available
			if (map) {
				await FileEmitter.safeEmitFile(pluginContext, {
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
}
