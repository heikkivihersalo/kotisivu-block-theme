import { statSync } from 'node:fs';
import { join } from 'node:path';
import { FILE_NAMES, DISCOVERY_CONFIG } from '../../../constants.ts';
import { safeReadDirectory } from '../../common';
import { extractBlockName, parseBlockJson } from '../utils';
import type { BlockInfo } from '../../../types/index.ts';

/**
 * Helper function to validate and normalize paths
 * @param path - The path to validate
 * @param basePath - The base path to resolve against
 * @return Normalized path if valid, null otherwise
 */
function shouldSkipDirectory(dirPath: string): boolean {
	const dirName = dirPath.split(/[/\\]/).pop() || '';

	return (
		DISCOVERY_CONFIG.SKIP_DIRECTORIES.includes(dirName) ||
		dirName.startsWith('.')
	);
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

	const blocks: BlockInfo[] = [];
	const { items, error } = safeReadDirectory(dirPath);

	if (error) {
		console.warn(`Warning: ${error} at ${dirPath}`);
		return blocks;
	}

	for (const item of items) {
		const itemPath = join(dirPath, item);

		try {
			const stat = statSync(itemPath);

			if (stat.isDirectory()) {
				// Skip common directories that shouldn't contain blocks
				if (shouldSkipDirectory(item)) {
					continue;
				}

				// Recursively search subdirectories
				const subBlocks = findBlocksRecursively(
					itemPath,
					rootPath,
					depth + 1
				);
				blocks.push(...subBlocks);
			} else if (item === FILE_NAMES.BLOCK_CONFIG) {
				// Found a block.json file
				const { blockJson, error: parseError } =
					parseBlockJson(itemPath);

				if (parseError) {
					console.warn(`Warning: ${parseError} at ${itemPath}`);
					continue;
				}

				if (blockJson) {
					const blockName = extractBlockName(dirPath);
					const blockInfo: BlockInfo = {
						path: dirPath,
						blockJson,
						name: blockName,
					};

					blocks.push(blockInfo);
				}
			}
		} catch (statError) {
			const errorMessage =
				statError instanceof Error
					? statError.message
					: String(statError);
			console.warn(
				`Warning: Could not stat ${itemPath}: ${errorMessage}`
			);
		}
	}

	return blocks;
}
