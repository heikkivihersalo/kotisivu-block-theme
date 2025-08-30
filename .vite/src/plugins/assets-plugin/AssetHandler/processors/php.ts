/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	BasePhpHandler,
	type PhpHandlerConfig,
} from '../../../../common/abstracts/BasePhpHandler';
import type { DiscoveredAssetInfo } from '../../../../common/types/assets';
import { FileEmitter } from '../../../../common/services/FileEmitter';

/**
 * PHP Processor utility for handling PHP file processing and emission
 *
 * This utility is focused specifically on PHP processing for WordPress blocks,
 * providing methods for reading, minifying, and emitting PHP files.
 */
export class PHP extends BasePhpHandler {
	constructor({
		context,
		config = {},
	}: { context: PluginContext; config?: PhpHandlerConfig }) {
		super(context, config);
	}

	/**
	 * Emit PHP asset file
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
	 * Generate and emit PHP asset file with dependencies and hash
	 * @param assetInfo - Information about the asset
	 * @param dependencies - Array of dependencies
	 * @param jsContent - JavaScript content for hash generation
	 */
	async emitPhpAssetWithDependencies(
		assetInfo: DiscoveredAssetInfo,
		dependencies: string[],
		jsContent: string
	): Promise<void> {
		const phpContent = this.generatePhpAssetFile(
			dependencies,
			this.generateFileHash(jsContent)
		);
		await this.emitPhpAsset(assetInfo, phpContent);
	}
}
