/**
 * External dependencies
 */
import { statSync } from 'node:fs';

/**
 * Shared dependencies
 */
import { generateSourcePath } from '../../common/utils/index.ts';

/**
 * Internal dependencies
 */
import { findBlocksRecursively } from '../../common/utils/index.ts';
import type { BlockInfo } from '../../common/types';

/**
 * Discover block.json files with custom path mappings
 */
export function discoverBlocksWithMappings(
	pathMappings: Record<string, string>,
	pwd: string
): BlockInfo[] {
	const blocks: BlockInfo[] = [];

	for (const [outputPath, sourcePath] of Object.entries(pathMappings)) {
		const fullSourcePath = generateSourcePath(sourcePath, pwd);
		if (!fullSourcePath) continue;

		try {
			const stat = statSync(fullSourcePath);
			if (!stat.isDirectory()) continue;

			const foundBlocks = findBlocksRecursively(fullSourcePath, pwd, 0);

			// Add custom output path to each discovered block
			foundBlocks.forEach((block) => {
				blocks.push({
					...block,
					outputPath: `${outputPath.replace(/\/$/, '')}/${block.name}`,
				});
			});
		} catch {
			// Silently skip inaccessible paths - this is expected during development
			continue;
		}
	}

	return blocks;
}
