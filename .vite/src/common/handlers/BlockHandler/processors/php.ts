/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { BasePhpHandler } from '../../../../abstracts/BasePhpHandler';

/**
 * PHP Processor utility for handling PHP file processing and emission
 *
 * This utility is focused specifically on PHP processing for WordPress blocks,
 * providing methods for reading, minifying, and emitting PHP files.
 */
export class PHP extends BasePhpHandler {
	constructor({ context }: { context: PluginContext }) {
		super(context);
	}

	/**
	 * Process a single PHP file and minify it
	 * @param phpPath - The path to the PHP file
	 * @param outputFileName - The output file name
	 * @param shouldMinify - Whether to minify the PHP content
	 */
	async processPhp(
		phpPath: string,
		outputFileName: string,
		shouldMinify: boolean = true
	): Promise<void> {
		await this.processPhpFile(phpPath, outputFileName, shouldMinify);
	}

	/**
	 * Generate and emit PHP asset file with dependencies and hash
	 * @param jsContent - The JavaScript content (for hash generation)
	 * @param dependencies - Array of dependencies
	 * @param outputFileName - The output file name for the PHP asset
	 */
	async emitPhpAssets(
		jsContent: string,
		dependencies: string[],
		outputFileName: string
	): Promise<void> {
		const hash = this.generateFileHash(jsContent);
		const phpContent = this.generatePhpAssetFile(dependencies, hash);
		await this.emitAsset(outputFileName, phpContent);
	}
}
