/**
 * PHP Processing Strategy Interface
 *
 * This interface defines the contract for PHP processing strategies,
 * allowing for easier testing and different PHP processing implementations.
 */
export interface PhpProcessor {
	/**
	 * Process PHP content with the given options
	 * @param content - The PHP content to process
	 * @param options - Processing options
	 * @returns Processed PHP code
	 */
	process(content: string, options?: PhpProcessingOptions): string;

	/**
	 * Generate a PHP asset file with dependencies and version hash
	 * @param dependencies - Set or array of dependencies
	 * @param hash - Version hash for the asset
	 * @returns PHP code as a string that returns an array with dependencies and version
	 */
	generatePhpAssetFile(
		dependencies?: Set<string> | string[],
		hash?: string
	): string;

	/**
	 * Generate PHP array content for block manifests
	 * @param blocks - The blocks object containing block.json configurations
	 * @returns A string representing the PHP array content
	 */
	generatePhpArrayContent(blocks: Record<string, any>): string;
}

/**
 * PHP processing options
 */
export interface PhpProcessingOptions {
	minify?: boolean;
	preserveComments?: boolean;
}

/**
 * PHP processing result
 */
export interface PhpProcessingResult {
	code: string;
	isValid: boolean;
}
