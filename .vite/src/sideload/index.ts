/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';
import type { WordpressBlockJson } from '../../types/index.js';

/**
 * Internal dependencies
 */
import { extractScripts, extractStyles } from './utils/block-assets.js';
import { generateOutputConfig } from './utils/output-config.js';
import { processScripts } from './processors/script-processor.js';
import { processStyles } from './processors/style-processor.js';

/**
 * Sideloads block assets (scripts and styles) based on the provided block.json
 * and outputs them to the specified directory.
 *
 * @param {PluginContext} this - The Rollup plugin context.
 * @param {WordpressBlockJson} blockJson - The block.json object containing block metadata.
 * @param {string} outputDirectory - The directory where assets should be output.
 * @param {string} [blockPath] - Optional path to the block directory.
 * @param {string} [blockName] - Optional name of the block.
 * @param {string} [customOutputPath] - Optional custom output path for assets.
 * @returns {Promise<boolean>} Returns true if sideloading was successful.
 */
export async function sideload(
	this: PluginContext,
	blockJson: WordpressBlockJson,
	outputDirectory: string,
	blockPath?: string,
	blockName?: string,
	customOutputPath?: string
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
	await processScripts(this, scripts, config);

	// Process all styles
	processStyles(this, styles, config);

	return true;
}
