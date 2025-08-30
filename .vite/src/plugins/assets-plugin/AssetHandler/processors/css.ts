/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { FileEmitter } from '../../../../common/utils';
import type { DiscoveredAssetInfo } from '../../../../common/types';
import { BaseCssHandler } from '../../../../common/abstracts/BaseCssHandler';

/**
 * CSS Processor utility for handling CSS file processing with LightningCSS
 *
 * This utility is focused specifically on CSS processing for WordPress blocks,
 * providing methods for processing individual files, string content, and
 * handling CSS transformations with proper source maps.
 */
export class CSS extends BaseCssHandler {
	constructor({ context }: { context: PluginContext }) {
		super(context);
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

		await FileEmitter.safeEmitFile(this.context, {
			type: 'asset',
			fileName: `${assetInfo.outputPath}.css`,
			source: content,
		});
	}
}
