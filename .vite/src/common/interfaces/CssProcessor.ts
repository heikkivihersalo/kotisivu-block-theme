/**
 * CSS Processing Strategy Interface
 *
 * This interface defines the contract for CSS processing strategies,
 * allowing for easier testing and different CSS processing implementations.
 */
export interface CssProcessor {
	/**
	 * Process CSS content with the given options
	 * @param content - The CSS content to process
	 * @param filename - The filename for source map generation
	 * @param options - Processing options
	 * @returns Processed CSS code and optional source map
	 */
	process(
		content: string,
		filename: string,
		options?: CssProcessingOptions
	): Promise<CssProcessingResult> | CssProcessingResult;
}

/**
 * CSS processing options
 */
export interface CssProcessingOptions {
	minify?: boolean;
	sourceMap?: boolean;
	customTransforms?: Array<(css: string) => string>;
}

/**
 * CSS processing result
 */
export interface CssProcessingResult {
	code: Uint8Array;
	map?: Uint8Array;
}
