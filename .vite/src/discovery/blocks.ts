/**
 * External dependencies
 */
import { statSync } from 'node:fs';

/**
 * Internal dependencies
 */
import { validateAndNormalizePath } from '../common/index.js';
import { findBlocksRecursively } from './utils/index.js';
import type { BlockInfo } from '../../types/index.js';

/**
 * Discover block.json files with custom path mappings
 * This function allows mapping source directories to custom output paths
 * @param pathMappings - Object mapping output paths to source directories
 * @param pwd - Current working directory to resolve relative paths
 * @return An array of BlockInfo objects for each discovered block
 */
export function discoverBlocksWithMapping(
	pathMappings: Record<string, string>,
	pwd: string
): BlockInfo[] {
	if (!pathMappings || typeof pathMappings !== 'object') {
		console.warn(
			'Warning: Invalid path mappings provided for block discovery'
		);
		return [];
	}

	if (!pwd || typeof pwd !== 'string') {
		console.warn(
			'Warning: Invalid working directory provided for mapped block discovery'
		);
		return [];
	}

	const blocks: BlockInfo[] = [];
	const errors: string[] = [];
	const mappingEntries = Object.entries(pathMappings);

	if (mappingEntries.length === 0) {
		console.warn('Warning: No path mappings specified for discovery');
		return [];
	}

	for (const [outputPath, sourcePath] of mappingEntries) {
		if (
			!outputPath ||
			!sourcePath ||
			typeof outputPath !== 'string' ||
			typeof sourcePath !== 'string'
		) {
			errors.push(
				`Invalid mapping entry: ${outputPath} -> ${sourcePath}`
			);
			continue;
		}

		const fullSourcePath = validateAndNormalizePath(sourcePath, pwd);

		if (!fullSourcePath) {
			errors.push(`Could not resolve source path: ${sourcePath}`);
			continue;
		}

		try {
			const stat = statSync(fullSourcePath);
			if (stat.isDirectory()) {
				const foundBlocks = findBlocksRecursively(
					fullSourcePath,
					pwd,
					0
				);

				// Add custom output path to each discovered block
				for (const block of foundBlocks) {
					const blockWithMapping: BlockInfo = {
						...block,
						outputPath: `${outputPath.replace(/\/$/, '')}/${block.name}`,
					};
					blocks.push(blockWithMapping);
				}
			} else {
				errors.push(`Source path is not a directory: ${sourcePath}`);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			errors.push(
				`Could not access source path ${sourcePath}: ${errorMessage}`
			);
		}
	}

	// Log accumulated errors
	if (errors.length > 0) {
		console.warn(
			'Block discovery with mapping completed with errors:',
			errors
		);
	}

	return blocks;
}
