import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { FILE_NAMES } from './constants.js';
import type { WordpressBlockJson, BlockInfo } from '../types/index.js';

/**
 * Discover block.json files in the specified folders
 */
export function discoverBlocks(
	blockFolders: string[],
	pwd: string
): BlockInfo[] {
	const blocks: BlockInfo[] = [];

	for (const folderPattern of blockFolders) {
		const fullPath = join(pwd, folderPattern);

		try {
			if (statSync(fullPath).isDirectory()) {
				// Search for block.json files recursively
				const foundBlocks = findBlocksRecursively(fullPath, pwd);
				blocks.push(...foundBlocks);
			}
		} catch (error) {
			console.warn(
				`Warning: Could not access folder ${folderPattern}:`,
				error instanceof Error ? error.message : String(error)
			);
		}
	}

	return blocks;
}

/**
 * Recursively find block.json files in a directory
 */
function findBlocksRecursively(dirPath: string, rootPath: string): BlockInfo[] {
	const blocks: BlockInfo[] = [];

	try {
		const items = readdirSync(dirPath);

		for (const item of items) {
			const itemPath = join(dirPath, item);
			const stat = statSync(itemPath);

			if (stat.isDirectory()) {
				// Recursively search subdirectories
				blocks.push(...findBlocksRecursively(itemPath, rootPath));
			} else if (item === FILE_NAMES.BLOCK_CONFIG) {
				// Found a block.json file
				try {
					const blockJsonContent = readFileSync(itemPath, 'utf-8');
					const blockJson: WordpressBlockJson =
						JSON.parse(blockJsonContent);
					const blockName = dirPath.split('/').pop() || 'unknown';

					blocks.push({
						path: dirPath,
						blockJson,
						name: blockName,
					});
				} catch (parseError) {
					console.warn(
						`Warning: Could not parse block.json at ${itemPath}:`,
						parseError instanceof Error
							? parseError.message
							: String(parseError)
					);
				}
			}
		}
	} catch (error) {
		console.warn(
			`Warning: Could not read directory ${dirPath}:`,
			error instanceof Error ? error.message : String(error)
		);
	}

	return blocks;
}

/**
 * Discover block.json files with custom path mappings
 */
export function discoverBlocksWithMapping(
	pathMappings: Record<string, string>,
	pwd: string
): BlockInfo[] {
	const blocks: BlockInfo[] = [];

	for (const [outputPath, sourcePath] of Object.entries(pathMappings)) {
		const fullSourcePath = join(pwd, sourcePath);

		try {
			if (statSync(fullSourcePath).isDirectory()) {
				// Search for block.json files recursively
				const foundBlocks = findBlocksRecursively(fullSourcePath, pwd);
				// Add custom output path with block name appended
				for (const block of foundBlocks) {
					blocks.push({
						...block,
						outputPath: `${outputPath}/${block.name}`,
					});
				}
			}
		} catch (error) {
			console.warn(
				`Warning: Could not access source path ${sourcePath}:`,
				error instanceof Error ? error.message : String(error)
			);
		}
	}

	return blocks;
}
