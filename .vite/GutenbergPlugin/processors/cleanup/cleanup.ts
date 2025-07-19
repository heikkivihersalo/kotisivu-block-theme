/**
 * External dependencies
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Internal dependencies
 */
import type { AssetInfo, ChunkInfo } from '../../types/index.js';

/**
 * Clean up malformed CSS comments in JavaScript files
 * This fixes the issue where CSS imports leave malformed comments that break JavaScript
 *
 * @param options - Build options
 * @param bundle - Bundle information from Rollup
 * @param outputDir - Output directory path
 */
export async function cleanUpJavaScriptFiles(
	options: any,
	bundle: Record<string, AssetInfo | ChunkInfo>,
	outputDir: string
): Promise<void> {
	for (const [fileName, chunk] of Object.entries(bundle)) {
		// Only process JavaScript files
		if (chunk.type === 'chunk' && fileName.endsWith('.js')) {
			const filePath = join(outputDir, fileName);

			if (existsSync(filePath)) {
				try {
					let content = readFileSync(filePath, 'utf-8');

					// Fix malformed CSS comments that break JavaScript
					// Pattern: /* empty css             *//* empty css           */
					// This happens when CSS imports are extracted but leave malformed comments
					content = content.replace(
						/\/\*\s*empty\s+css\s*\*\/\/\*\s*empty\s+css\s*\*\//g,
						''
					);
					content = content.replace(/\/\*\s*empty\s+css\s*\*\//g, '');

					// Clean up any other malformed comment patterns
					content = content.replace(/\/\*\s*\*\/\/\*\s*\*\//g, '');

					// Remove leading whitespace if the file now starts with whitespace
					content = content.replace(/^\s+/, '');

					writeFileSync(filePath, content, 'utf-8');
					console.log(
						`🧹 Cleaned up malformed comments in: ${fileName}`
					);
				} catch (error) {
					console.warn(`⚠️  Failed to clean up ${fileName}:`, error);
				}
			}
		}
	}
}
