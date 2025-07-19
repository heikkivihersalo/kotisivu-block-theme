import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { WordpressBlockJson } from './transform.js';

export interface BlockInfo {
	path: string;
	blockJson: WordpressBlockJson;
	name: string;
}

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
				error.message
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
			} else if (item === 'block.json') {
				// Found a block.json file
				try {
					const blockJsonContent = readFileSync(itemPath, 'utf-8');
					const blockJson: WordpressBlockJson =
						JSON.parse(blockJsonContent);
					const relativePath = itemPath
						.replace(rootPath, '')
						.replace(/^\/+/, '');
					const blockName = dirPath.split('/').pop() || 'unknown';

					blocks.push({
						path: dirPath,
						blockJson,
						name: blockName,
					});
				} catch (parseError) {
					console.warn(
						`Warning: Could not parse block.json at ${itemPath}:`,
						parseError.message
					);
				}
			}
		}
	} catch (error) {
		console.warn(
			`Warning: Could not read directory ${dirPath}:`,
			error.message
		);
	}

	return blocks;
}
