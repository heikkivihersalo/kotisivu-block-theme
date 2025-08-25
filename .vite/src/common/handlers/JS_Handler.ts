/**
 * External dependencies
 */
import { build as esBuild } from 'esbuild';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	findActualFilePath,
	registerBundledDependencies,
	extractFilenameWithoutExtension,
	generateAssetFilename,
	generateFileHash,
	generatePhpAssetFile,
} from '../utils/index.ts';

import { ESBUILD_CONFIG, WORDPRESS_CONFIG } from '../constants.ts';
import { scssPlugin } from '../plugins/scssPlugin.ts';
import { ReactShimPlugin } from '../plugins/reactShimPlugin.ts';
import { FileEmitter } from '../utils/vite/FileEmitter.ts';

import type { OutputConfig, EmittedAsset } from '../types/index.ts';

/**
 * Script Handler class for handling JavaScript file processing with ESBuild
 */
export class JS_Handler {
	/**
	 * Emit JavaScript and PHP asset files
	 * @param pluginContext - The Rollup plugin context
	 * @param file - The output file
	 * @param script - The script file name
	 * @param config - The output configuration
	 * @param wpImports - List of WordPress imports used in the script
	 */
	private async emitAssets(
		pluginContext: PluginContext,
		file: any,
		script: string,
		config: OutputConfig,
		wpImports: string[]
	): Promise<void> {
		const hash = generateFileHash(file.text);
		const filename = extractFilenameWithoutExtension(script);

		// Create block-specific file paths for JavaScript files
		const assetFileName = generateAssetFilename(
			`${filename}.asset.php`,
			config.outputPath
		);
		const scriptFileName = generateAssetFilename(script, config.outputPath);

		await FileEmitter.safeEmitFile(pluginContext, {
			type: 'asset',
			fileName: assetFileName,
			source: generatePhpAssetFile(wpImports, hash),
		} satisfies EmittedAsset);

		await FileEmitter.safeEmitFile(pluginContext, {
			type: 'asset',
			fileName: scriptFileName,
			source: file.contents,
		} satisfies EmittedAsset);
	}

	/**
	 * Emit source map file
	 * @param pluginContext - The Rollup plugin context
	 * @param file - The output file
	 * @param script - The script file name
	 * @param config - The output configuration
	 */
	private async emitSourceMap(
		pluginContext: PluginContext,
		file: any,
		script: string,
		config: OutputConfig
	): Promise<void> {
		const sourceMapFileName = generateAssetFilename(
			`${script}.map`,
			config.outputPath
		);

		await FileEmitter.safeEmitFile(pluginContext, {
			type: 'asset',
			fileName: sourceMapFileName,
			source: file.contents,
		} satisfies EmittedAsset);
	}
	/**
	 * Process ESBuild content and emit assets
	 * @param pluginContext - The Rollup plugin context
	 * @param result - The ESBuild result
	 * @param script - The script file name
	 * @param config - The output configuration
	 * @param wpImports - List of WordPress imports used in the script
	 */
	private async emitBuildResults(
		pluginContext: PluginContext,
		result: any,
		script: string,
		config: OutputConfig,
		wpImports: string[]
	): Promise<void> {
		// Register dependencies for file watching
		registerBundledDependencies(pluginContext, result.metafile, script);

		// Emit output files
		for (const file of result.outputFiles) {
			if (file.path.endsWith('.map')) {
				await this.emitSourceMap(pluginContext, file, script, config);
			} else {
				await this.emitAssets(
					pluginContext,
					file,
					script,
					config,
					wpImports
				);
			}
		}
	}

	/**
	 * Build script with ESBuild
	 * @param actualScriptPath - The actual path to the script file
	 * @param script - The script file name
	 * @param config - The output configuration
	 * @param sourcemap - The source map configuration
	 * @param wpImports - List of WordPress imports used in the script
	 * @returns ESBuild result
	 */
	private async build(
		actualScriptPath: string,
		script: string,
		config: OutputConfig,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both',
		wpImports: string[]
	) {
		return await esBuild({
			entryPoints: [actualScriptPath],
			outfile: config.blockOutputDir + '/' + script,
			platform: ESBUILD_CONFIG.PLATFORM,
			bundle: true,
			write: false,
			metafile: true,
			sourcemap: sourcemap,
			loader: ESBUILD_CONFIG.LOADER_MAP,
			target: ESBUILD_CONFIG.TARGET,
			jsx: ESBUILD_CONFIG.JSX_TRANSFORM,
			jsxFactory: WORDPRESS_CONFIG.JSX_FACTORY,
			jsxFragment: WORDPRESS_CONFIG.JSX_FRAGMENT,
			minify: process.env.NODE_ENV === 'production',
			plugins: [scssPlugin, ReactShimPlugin(wpImports)],
		});
	}

	/**
	 * Process a single script file
	 * @param pluginContext - The Rollup plugin context
	 * @param script - The script file name
	 * @param config - The output configuration
	 * @param sourcemap - The source map configuration
	 * @return {Promise<void>}
	 */
	async processScript(
		pluginContext: PluginContext,
		script: string,
		config: OutputConfig,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		const actualScriptPath = findActualFilePath(config.basePath, script);
		if (!actualScriptPath) return;

		pluginContext.addWatchFile(actualScriptPath);
		const wpImports: string[] = [];

		try {
			// Build the script
			const result = await this.build(
				actualScriptPath,
				script,
				config,
				sourcemap,
				wpImports
			);

			// Emit build results
			await this.emitBuildResults(
				pluginContext,
				result,
				script,
				config,
				wpImports
			);
		} catch (error) {
			console.warn(`Failed to process script file ${script}:`, error);
		}
	}

	/**
	 * Process all scripts for a block
	 * @param pluginContext - The Rollup plugin context
	 * @param scripts - The script file names
	 * @param config - The output configuration
	 * @param sourcemap - The source map configuration
	 * @return {Promise<void>}
	 */
	async processScripts(
		pluginContext: PluginContext,
		scripts: string[],
		config: OutputConfig,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		for (const script of scripts) {
			await this.processScript(pluginContext, script, config, sourcemap);
		}
	}
}
