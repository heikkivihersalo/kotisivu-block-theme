/**
 * External dependencies
 */
import { transform } from 'lightningcss';

/**
 * Shared dependencies
 */
import type {
	CssProcessor,
	CssProcessingOptions,
	CssProcessingResult,
} from '../interfaces/CssProcessor';

/**
 * LightningCSS Processor Implementation
 *
 * This class implements the CssProcessor interface using LightningCSS,
 * providing a testable and swappable CSS processing strategy.
 */
export class LightningCssProcessor implements CssProcessor {
	/**
	 * Process CSS content using LightningCSS
	 */
	process(
		content: string,
		filename: string,
		options: CssProcessingOptions = {}
	): CssProcessingResult {
		const {
			minify = true,
			sourceMap = true,
			customTransforms = [],
		} = options;

		// Apply custom transforms first
		let processedContent = content;
		for (const transform of customTransforms) {
			processedContent = transform(processedContent);
		}

		const { code, map } = transform({
			filename,
			code: Buffer.from(processedContent),
			minify,
			sourceMap,
		});

		return {
			code,
			map: map || undefined,
		};
	}
}
