/**
 * External dependencies
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import type { BlockInfo } from '../../common/types';

/**
 * Internal dependencies
 */
import { BlockHandler } from '../../common/handlers';
import { generateOutputConfig } from '../../common/utils/index.ts';

/**
 * Sideloads block assets (scripts and styles) based on the provided block information.
 *
 * @param {PluginContext} this - The Rollup plugin context.
 * @param {BlockHandler} blockHandler - The block handler instance to use for processing.
 * @param {BlockInfo} block - The block information containing metadata and paths.
 * @param {string} outputDirectory - The directory where assets should be output.
 * @param {boolean | 'linked' | 'external' | 'inline' | 'both'} [sourcemap] - Source map configuration.
 * @returns {Promise<boolean>} Returns true if sideloading was successful.
 */
export async function sideloadBlocks(
	this: PluginContext,
	blockHandler: BlockHandler,
	block: BlockInfo,
	outputDirectory: string,
	sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
): Promise<boolean> {
	// Generate output configuration
	const config = generateOutputConfig(
		block.path,
		block.name,
		block.outputPath,
		outputDirectory
	);

	// Process the complete block using the block handler
	await blockHandler.processCompleteBlock(this, block, config, { sourcemap });

	// Handle WordPress convention CSS files with proper naming
	// editor.css -> index.css (editor styles)
	const editorCssPath = resolve(block.path, 'editor.css');
	if (!existsSync(editorCssPath)) {
		throw new Error(
			`Required editor.css file not found at: ${editorCssPath}`
		);
	}

	// Create a custom config for the editor CSS with WordPress naming convention
	const editorConfig = {
		...config,
		outputPath: config.outputPath, // Will generate index.css automatically
	};
	await blockHandler.processStyle(this, 'editor.css', editorConfig);

	// style.css -> style-index.css (frontend styles)
	const styleCssPath = resolve(block.path, 'style.css');
	if (!existsSync(styleCssPath)) {
		throw new Error(
			`Required style.css file not found at: ${styleCssPath}`
		);
	}

	// Create a custom config for the style CSS with WordPress naming convention
	const styleConfig = {
		...config,
		outputPath: config.outputPath, // Will need to handle style-index.css naming
	};
	// For now, use the existing handler - we may need to enhance it later
	// to handle the style-index.css naming convention
	await blockHandler.processStyle(this, 'style.css', styleConfig);

	return true;
}
