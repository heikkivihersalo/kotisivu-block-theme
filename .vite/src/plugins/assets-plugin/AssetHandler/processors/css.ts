/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { FileEmitter } from '../../../../common/services/FileEmitter.ts';
import type { DiscoveredAssetInfo } from '../../../../common/types';
import {
	BaseCssHandler,
	type CssHandlerConfig,
} from '../../../../common/abstracts/BaseCssHandler';

/**
 * CSS Processor utility for handling CSS file processing with LightningCSS
 *
 * This utility is focused specifically on CSS processing for WordPress blocks,
 * providing methods for processing individual files, string content, and
 * handling CSS transformations with proper source maps.
 */
export class CSS extends BaseCssHandler {
	constructor({
		context,
		config = {},
	}: { context: PluginContext; config?: CssHandlerConfig }) {
		super(context, config);
	}

	/**
	 * Emit CSS file
	 * @param assetInfo - Information about the asset
	 * @param cssContent - The CSS content to emit
	 */
	async emitCssAsset(
		assetInfo: DiscoveredAssetInfo,
		content: string
	): Promise<void> {
		if (!this.isValidFileContent(content)) return;

		// Check if content is empty or just whitespace
		if (!content || content.trim().length === 0) {
			console.warn(
				`Empty CSS content for ${assetInfo.outputPath}, skipping processing`
			);
			return;
		}

		// Process CSS content (minification, transformation, etc.)
		const result = await this.processFileContent(
			content,
			`${assetInfo.outputPath}.css`,
			{
				shouldMinify: process.env.NODE_ENV === 'production',
			}
		);

		await FileEmitter.safeEmitFile(this.context, {
			type: 'asset',
			fileName: `${assetInfo.outputPath}.css`,
			source: result.content,
		});

		// Emit source map if available
		if (result.sourceMap) {
			await FileEmitter.safeEmitFile(this.context, {
				type: 'asset',
				fileName: `${assetInfo.outputPath}.css.map`,
				source: result.sourceMap,
			});
		}
	}
}
