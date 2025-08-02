import { statSync } from 'node:fs';
import { join } from 'node:path';
import { FILE_NAMES, DISCOVERY_CONFIG } from '../../constants.js';
import { safeReadDirectory } from '../../index.js';
import { extractBlockName, parseBlockJson } from '../utils';
import type { BlockInfo } from '../../types/index.js';

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
 * @param itemPath - Path to the item to process
 * @param item - Name of the item
 * @param dirPath - Parent directory path
 * @param rootPath - Root path for relative paths
 * @param depth - Current recursion depth
 * @return Array of discovered blocks or empty array
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

		if (stat.isDirectory()) {
			return shouldSkipDirectory(item)
				? []
				: findBlocksRecursively(itemPath, rootPath, depth + 1);
		}

		if (item === FILE_NAMES.BLOCK_CONFIG) {
			const { blockJson, error } = parseBlockJson(itemPath);

			if (error) {
				console.warn(`Warning: ${error} at ${itemPath}`);
				return [];
			}

			if (blockJson) {
				return [
					{
						path: dirPath,
						blockJson,
						name: extractBlockName(dirPath),
					},
				];
			}
		}

		return [];
	} catch (statError) {
		const errorMessage =
			statError instanceof Error ? statError.message : String(statError);
		console.warn(`Warning: Could not stat ${itemPath}: ${errorMessage}`);
		return [];
	}
}

/**
 * Recursively find block.json files in a directory with depth control
 * @param dirPath - The directory path to start searching from
 * @param rootPath - The root path for relative paths in block info
 * @param depth - Current recursion depth (used to prevent infinite loops)
 * @return An array of BlockInfo objects for each discovered block
 */
export function findBlocksRecursively(
	dirPath: string,
	rootPath: string,
	depth: number = 0
): BlockInfo[] {
	// Prevent infinite recursion and overly deep searches
	if (depth > DISCOVERY_CONFIG.MAX_RECURSION_DEPTH) {
		console.warn(`Warning: Maximum recursion depth reached at ${dirPath}`);
		return [];
	}

	const { items, error } = safeReadDirectory(dirPath);

	if (error) {
		console.warn(`Warning: ${error} at ${dirPath}`);
		return [];
	}

	return items.flatMap((item) =>
		processDirectoryItem(
			join(dirPath, item),
			item,
			dirPath,
			rootPath,
			depth
		)
	);
}
