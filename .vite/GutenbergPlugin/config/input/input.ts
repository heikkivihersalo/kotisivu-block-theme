import { dirname, basename } from 'path';
import { readFileSync } from 'fs';
import { glob } from 'glob';
import { BLOCK_PATTERNS } from '../constants.js';
import { findBlockFile, findCSSFile } from './utils.js';
import type { ViteInput } from '../../types.js';

/**
 * Discover all block.json files and create build entries
 * @param blocksDir - Directory to search for blocks
 * @param outputSubDir - Output subdirectory for this input (optional)
 * @returns Input configuration for Vite
 */
export function createBlockInputs(
	blocksDir: string,
	outputSubDir = ''
): ViteInput {
	// Find all block.json files
	const blockJsonFiles = glob.sync(
		`${blocksDir}/${BLOCK_PATTERNS.BLOCK_JSON}`
	);

	if (blockJsonFiles.length === 0) {
		console.warn('No block.json files found in', blocksDir);
		return {};
	}

	const input: ViteInput = {};

	blockJsonFiles.forEach((blockJsonPath) => {
		const blockDir = dirname(blockJsonPath);
		const blockName = basename(blockDir);

		// Create entry key with optional subdirectory prefix
		const entryPrefix = outputSubDir ? `${outputSubDir}/` : '';

		// Read block.json to understand the structure
		const blockJson = JSON.parse(readFileSync(blockJsonPath, 'utf8'));

		// Check for main script file (index.ts, index.js, index.tsx, index.jsx)
		// This should include the edit functionality and will bundle editor dependencies
		const indexFile = findBlockFile(blockDir, 'index');
		if (indexFile) {
			input[`${entryPrefix}${blockName}/index`] = indexFile;
		}

		// Check for editor styles (editor.css, editor.scss)
		// These should generate index.css files for editor styles
		const editorCssFile = findCSSFile(blockDir, 'editor');
		if (editorCssFile) {
			// If there's already an index entry (JS), we need a separate CSS entry
			// Use a different key for CSS-only entries
			const cssEntryKey = indexFile
				? `${entryPrefix}${blockName}/editor-styles`
				: `${entryPrefix}${blockName}/index`;

			input[cssEntryKey] = editorCssFile;
		}

		// Check for view files (view.ts, view.js, etc.)
		const viewFile = findBlockFile(blockDir, 'view');
		if (viewFile) {
			input[`${entryPrefix}${blockName}/view`] = viewFile;
		}

		// Check for frontend styles (style.css, style.scss)
		// Only include if the file has meaningful content
		const styleCssFile = findCSSFile(blockDir, 'style');
		if (styleCssFile) {
			input[`${entryPrefix}${blockName}/style-index`] = styleCssFile;
		}
	});

	return input;
}
