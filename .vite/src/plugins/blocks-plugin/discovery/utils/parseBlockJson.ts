/**
 * External dependencies
 */
import { readFileSync } from 'node:fs';

/**
 * Internal dependencies
 */
import type { WordpressBlockJson } from '../../../../common/types/blocks.ts';

/**
 * Helper function to safely parse block.json content
 */
export function parseBlockJson(filePath: string): WordpressBlockJson | null {
	try {
		const content = readFileSync(filePath, 'utf-8');
		return JSON.parse(content) as WordpressBlockJson;
	} catch {
		return null;
	}
}
