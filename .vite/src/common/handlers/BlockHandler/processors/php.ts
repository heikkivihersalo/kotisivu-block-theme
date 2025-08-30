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
}
