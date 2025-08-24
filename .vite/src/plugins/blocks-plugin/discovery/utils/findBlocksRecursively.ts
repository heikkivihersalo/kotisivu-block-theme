/**
 * External dependencies
 */
import { statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Shared dependencies
 */
import { DISCOVERY_CONFIG, FILE_NAMES } from '../../../../common/constants.ts';

/**
 * Internal dependencies
 */
import type { BlockInfo } from '../../../../common/types/blocks.ts';
import { extractBlockName } from './extractBlockName.ts';
import { parseBlockJson } from './parseBlockJson.ts';

/**
 * Check if a directory should be skipped during block discovery
 * @param dirPath - The directory path to check
 * @return true if the directory should be skipped
 */
function shouldSkipDirectory(dirPath: string): boolean {
	const dirName = dirPath.split(/[/\\]/).pop() || '';
	return (
		DISCOVERY_CONFIG.SKIP_DIRECTORIES.includes(dirName) ||
		dirName.startsWith('.')
	);
}

/**
 * Process a single directory item during block discovery
 */
function processDirectoryItem(
	itemPath: string,
	item: string,
	dirPath: string,
	rootPath: string,
	depth: number
): BlockInfo[] {
	try {
		const stat = statSync(itemPath);

		if (stat.isDirectory() && !shouldSkipDirectory(item)) {
			return findBlocksRecursively(itemPath, rootPath, depth + 1);
		}

		if (item === FILE_NAMES.BLOCK_CONFIG) {
			const blockJson = parseBlockJson(itemPath);
			return blockJson
				? [
						{
							path: dirPath,
							blockJson,
							name: extractBlockName(dirPath),
						},
					]
				: [];
		}
	} catch {
		// Silently skip inaccessible items
	}

	return [];
}

/**
 * Recursively find block.json files in a directory with depth control
 */
export function findBlocksRecursively(
	dirPath: string,
	rootPath: string,
	depth: number = 0
): BlockInfo[] {
	// Prevent infinite recursion
	if (depth > DISCOVERY_CONFIG.MAX_RECURSION_DEPTH) {
		return [];
	}

	try {
		const items = readdirSync(dirPath);
		return items.flatMap((item) =>
			processDirectoryItem(
				join(dirPath, item),
				item,
				dirPath,
				rootPath,
				depth
			)
		);
	} catch {
		return [];
	}
}
