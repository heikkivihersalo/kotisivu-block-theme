/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	BaseScriptHandler,
	type ScriptHandlerConfig,
} from '../../../../common/abstracts/BaseScriptHandler';
import { FileEmitter } from '../../../../common/services/FileEmitter';
import type { DiscoveredAssetInfo } from '../../../../common/types/assets';

/**
 * JavaScript Processor utility for handling JavaScript file processing with ESBuild
 *
 * This utility is focused specifically on JavaScript processing for WordPress blocks,
 * providing methods for building, transforming, and emitting JavaScript files
 * along with their associated PHP asset files and source maps.
 */
export class JS extends BaseScriptHandler {
	constructor({
		context,
		config = {},
	}: { context: PluginContext; config?: ScriptHandlerConfig }) {
		super(context, config);
	}

	/**
	 * Emit JavaScript file and source map
	 * @param assetInfo - Information about the asset
	 * @param jsContent - The JavaScript content
	 * @param jsSourceMap - The source map content (if available)
	 */
	async emitScriptAsset(
		assetInfo: DiscoveredAssetInfo,
		content: string,
		sourceMap?: string
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
				source: sourceMap,
			});
		}
	}
}
