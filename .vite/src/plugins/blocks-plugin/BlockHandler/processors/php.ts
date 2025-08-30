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
}
