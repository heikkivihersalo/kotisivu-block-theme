/**
 * Shared dependencies
 */
import type {
	CssProcessor,
	CssProcessingOptions,
	CssProcessingResult,
} from '../interfaces/CssProcessor';

/**
 * Mock CSS Processor for Testing
 *
 * This mock implementation allows for predictable testing without
 * dependencies on external CSS processing libraries.
 */
export class MockCssProcessor implements CssProcessor {
	public processCallCount = 0;
	public lastProcessedContent = '';
	public lastProcessedFilename = '';
	public lastProcessedOptions: CssProcessingOptions | undefined;

	private mockResult: CssProcessingResult;

	constructor(mockResult?: Partial<CssProcessingResult>) {
		this.mockResult = {
			code: new TextEncoder().encode(
				mockResult?.code?.toString() || '/* processed css */'
			),
			map: mockResult?.map,
		};
	}

	process(
		content: string,
		filename: string,
		options?: CssProcessingOptions
	): CssProcessingResult {
		this.processCallCount++;
		this.lastProcessedContent = content;
		this.lastProcessedFilename = filename;
		this.lastProcessedOptions = options;

		// Simulate processing by adding a comment
		const processedContent = `/* Processed: ${filename} */\n${content}`;

		return {
			...this.mockResult,
			code: new TextEncoder().encode(processedContent),
		};
	}

	/**
	 * Reset the mock state for fresh test runs
	 */
	reset(): void {
		this.processCallCount = 0;
		this.lastProcessedContent = '';
		this.lastProcessedFilename = '';
		this.lastProcessedOptions = undefined;
	}

	/**
	 * Set a custom result for the next process call
	 */
	setMockResult(result: Partial<CssProcessingResult>): void {
		this.mockResult = {
			code: new TextEncoder().encode(
				result.code?.toString() || 'mock result'
			),
			map: result.map,
		};
	}
}
