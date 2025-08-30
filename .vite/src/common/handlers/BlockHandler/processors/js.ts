/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	findActualFilePath,
	registerBundledDependencies,
	extractFilenameWithoutExtension,
	generateAssetFilename,
} from '../../../utils/index';

import { BaseScriptHandler } from '../../../../abstracts/BaseScriptHandler';
import type { OutputConfig } from '../../../types/index';

/**
 * JavaScript Processor utility for handling JavaScript file processing with ESBuild
 *
 * This utility is focused specifically on JavaScript processing for WordPress blocks,
 * providing methods for building, transforming, and emitting JavaScript files
 * along with their associated PHP asset files and source maps.
 */
export class JS extends BaseScriptHandler {
	constructor({ context }: { context: PluginContext }) {
		super(context);
	}

	/**
	 * Generate PHP asset file content in proper format
	 * @param dependencies - Array of dependencies
	 * @param hash - Version hash for the asset
	 * @returns PHP asset file content
	 */
	private generatePhpAssetContent(
		dependencies: string[],
		hash: string
	): string {
		const convertToPhp = (value: any): string => {
			if (Array.isArray(value)) {
				const items = value.map((item) => `'${item}'`).join(', ');
				return `[${items}]`;
			}
			if (typeof value === 'string') {
				return `'${value.replace(/'/g, "\\'")}'`;
			}
			return 'null';
		};

		return `<?php return ['dependencies' => ${convertToPhp(dependencies)}, 'version' => ${convertToPhp(hash)}];`;
	}

	/**
	 * Process a single script file
	 * @param script - The script file name
	 * @param config - The output configuration
	 * @param sourcemap - The source map configuration
	 * @return {Promise<void>}
	 */
	async processScript(
		script: string,
		config: OutputConfig,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		const actualScriptPath = findActualFilePath(config.basePath, script);
		if (!actualScriptPath) return;

		try {
			// Add to watch list
			this.addToWatchList(actualScriptPath);

			// Build the script using base class
			const result = await this.buildScript({
				entryPoint: actualScriptPath,
				sourcemap,
				outfile: config.blockOutputDir + '/' + script,
			});

			// Register bundled dependencies for file watching (block-specific functionality)
			if (result.metafile) {
				registerBundledDependencies(
					this.context,
					result.metafile,
					script
				);
			}

			// Generate output file names
			const filename = extractFilenameWithoutExtension(script);
			const scriptFileName = generateAssetFilename(
				script,
				config.outputPath
			);
			const assetFileName = generateAssetFilename(
				`${filename}.asset.php`,
				config.outputPath
			);

			// Emit JavaScript file and source map
			await this.emitScriptAssets(
				result.jsContent,
				result.jsSourceMap,
				scriptFileName
			);

			// Emit CSS assets if available
			if (result.cssContent) {
				const cssFileName = generateAssetFilename(
					`${filename}.css`,
					config.outputPath
				);
				await this.emitAsset(cssFileName, result.cssContent);
				if (result.cssSourceMap) {
					await this.emitAsset(
						`${cssFileName}.map`,
						result.cssSourceMap
					);
				}
			}

			// Emit PHP asset (generate inline using proper PHP format)
			const hash = this.generateFileHash(result.jsContent);
			const phpAssetContent = this.generatePhpAssetContent(
				result.wpDependencies,
				hash
			);
			await this.emitAsset(assetFileName, phpAssetContent);
		} catch (error) {
			this.handleFileProcessingError(script, error);
		}
	}

	/**
	 * Process all scripts for a block
	 * @param scripts - The script file names
	 * @param config - The output configuration
	 * @param sourcemap - The source map configuration
	 * @return {Promise<void>}
	 */
	async processScripts(
		scripts: string[],
		config: OutputConfig,
		sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
	): Promise<void> {
		for (const script of scripts) {
			await this.processScript(script, config, sourcemap);
		}
	}
}
