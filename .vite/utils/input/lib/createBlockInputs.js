import { resolve, dirname, basename } from 'path';
import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';
import { BLOCK_PATTERNS, WORDPRESS_FILES } from '../../constants.js';

/**
 * Discover all block.json files and create build entries
 * @param {string} blocksDir - Directory to search for blocks
 * @param {string} outputSubDir - Output subdirectory for this input (optional)
 * @returns {Object} Input configuration for Vite
 */
export function createBlockInputs(blocksDir, outputSubDir = '') {
	// Find all block.json files
	const blockJsonFiles = glob.sync(
		`${blocksDir}/${BLOCK_PATTERNS.BLOCK_JSON}`
	);

	if (blockJsonFiles.length === 0) {
		console.warn('No block.json files found in', blocksDir);
		return {};
	}

	const input = {};

	blockJsonFiles.forEach((blockJsonPath) => {
		const blockDir = dirname(blockJsonPath);
		const blockName = basename(blockDir);

		// Create entry key with optional subdirectory prefix
		const entryPrefix = outputSubDir ? `${outputSubDir}/` : '';

		// Read block.json to understand the structure
		const blockJson = JSON.parse(readFileSync(blockJsonPath, 'utf8'));

		// Check for main script file (index.ts, index.js, index.tsx, index.jsx)
		const indexFile = WORDPRESS_FILES.INDEX_JS.input
			.map((filename) => resolve(blockDir, filename))
			.find((filepath) => existsSync(filepath));

		if (indexFile) {
			input[`${entryPrefix}${blockName}/index`] = indexFile;
		}

		// Check for view files (view.ts, view.js, etc.)
		const viewFiles = WORDPRESS_FILES.VIEW_JS.input
			.map((filename) => resolve(blockDir, filename))
			.find((filepath) => existsSync(filepath));

		if (viewFiles) {
			input[`${entryPrefix}${blockName}/view`] = viewFiles;
		}

		// Check for editor styles (editor.css, editor.scss) - output as index.css to match WordPress convention
		const editorCssFile = WORDPRESS_FILES.EDITOR_CSS.input
			.map((filename) => resolve(blockDir, filename))
			.find((filepath) => {
				if (!existsSync(filepath)) return false;
				
				// Always include CSS files, but mark empty ones for later processing
				return true;
			});

		if (editorCssFile) {
			// Check if the file has content
			try {
				const fs = require('fs');
				const content = fs.readFileSync(editorCssFile, 'utf8').trim();
				if (content.length > 0) {
					// Only create entries for blocks with actual CSS content
					input[`${entryPrefix}${blockName}/index-css`] = editorCssFile;
				}
			} catch {
				// If we can't read the file, skip it
			}
		}

		// Check for frontend styles (style.css, style.scss)
		const styleCssFile = WORDPRESS_FILES.STYLE_CSS.input
			.map((filename) => resolve(blockDir, filename))
			.find((filepath) => existsSync(filepath));

		if (styleCssFile) {
			input[`${entryPrefix}${blockName}/style-index`] = styleCssFile;
		}
	});

	return input;
}
