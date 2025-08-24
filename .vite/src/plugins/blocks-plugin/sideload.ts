/**
 * External dependencies
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import type { WordpressBlockJson } from '../../common/types/blocks.ts';

/**
 * Internal dependencies
 */
import { processScripts } from '../../common/processors/scriptProcessor.ts';
import {
	processStyle,
	processStyles,
} from '../../common/processors/styleProcessor.ts';
import {
	extractScripts,
	extractStyles,
	generateOutputConfig,
} from '../../common/utils/index.ts';

/**
 * Sideloads block assets (scripts and styles) based on the provided block.json
 * and outputs them to the specified directory.
 *
 * @param {PluginContext} this - The Rollup plugin context.
 * @param {WordpressBlockJson} blockJson - The block.json object containing block metadata.
 * @param {string} outputDirectory - The directory where assets should be output.
 * @param {string} blockPath - Path to the block directory (required for multi-block builds).
 * @param {string} blockName - Name of the block (required for multi-block builds).
 * @param {string} [customOutputPath] - Optional custom output path for assets.
 * @param {boolean | 'linked' | 'external' | 'inline' | 'both'} [sourcemap] - Source map configuration.
 * @returns {Promise<boolean>} Returns true if sideloading was successful.
 */
export async function sideloadBlocks(
	this: PluginContext,
	blockJson: WordpressBlockJson,
	outputDirectory: string,
	blockPath: string,
	blockName: string,
	customOutputPath?: string,
	sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
): Promise<boolean> {
	// Generate output configuration
	const config = generateOutputConfig(
		blockPath,
		blockName,
		customOutputPath,
		outputDirectory
	);

	// Extract scripts and styles from block.json
	const scripts = extractScripts(blockJson);
	const styles = extractStyles(blockJson);

	// Process all scripts
	await processScripts(this, scripts, config, sourcemap);

	// Process all styles from block.json
	processStyles(this, styles, config);

	// Handle WordPress convention CSS files with proper naming
	// editor.css -> index.css (editor styles)
	const editorCssPath = resolve(blockPath, 'editor.css');
	if (existsSync(editorCssPath)) {
		// Create a custom config for the editor CSS with WordPress naming convention
		const editorConfig = {
			...config,
			outputPath: config.outputPath, // Will generate index.css automatically
		};
		processStyle(this, 'editor.css', editorConfig);
	} else {
		// Create empty editor CSS file if it doesn't exist
		this.emitFile({
			type: 'asset',
			fileName: `${config.outputPath}/index.css`,
			source: '',
		});
	}

	// style.css -> style-index.css (frontend styles)
	const styleCssPath = resolve(blockPath, 'style.css');
	if (existsSync(styleCssPath)) {
		// Create a custom config for the style CSS with WordPress naming convention
		const styleConfig = {
			...config,
			outputPath: config.outputPath, // Will need to handle style-index.css naming
		};
		// For now, use the existing processor - we may need to enhance it later
		// to handle the style-index.css naming convention
		processStyle(this, 'style.css', styleConfig);
	} else {
		// Create empty style CSS file if it doesn't exist
		this.emitFile({
			type: 'asset',
			fileName: `${config.outputPath}/style-index.css`,
			source: '',
		});
	}

	return true;
}
