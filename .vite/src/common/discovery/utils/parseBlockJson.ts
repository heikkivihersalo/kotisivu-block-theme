import { readFileSync } from 'node:fs';
import type { WordpressBlockJson } from '../../../types/index.js';

/**
 * Helper function to safely parse block.json content
 * @param filePath - The path to the block.json file
 * @return An object containing the parsed block.json or an error message
 */
export function parseBlockJson(filePath: string): {
	blockJson: WordpressBlockJson | null;
	error: string | null;
} {
	try {
		const content = readFileSync(filePath, 'utf-8');
		const blockJson = JSON.parse(content) as WordpressBlockJson;

		// Basic validation - ensure it has required properties
		if (!blockJson || typeof blockJson !== 'object') {
			return { blockJson: null, error: 'Invalid block.json structure' };
		}

		return { blockJson, error: null };
	} catch (parseError) {
		const errorMessage =
			parseError instanceof Error
				? parseError.message
				: String(parseError);
		return {
			blockJson: null,
			error: `Failed to parse block.json: ${errorMessage}`,
		};
	}
}
