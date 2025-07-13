import { resolve, dirname, basename } from 'path';
import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';
import { BLOCK_PATTERNS, WORDPRESS_FILE_OUTPUT } from '../../constants.js';

/**
 * Find a file in the block directory based on patterns
 * @param {string} blockDir - Block directory path
 * @param {string} baseName - Base name (e.g., 'index', 'edit', 'view')
 * @returns {string|null} Found file path or null
 */
function findBlockFile(blockDir, baseName) {
	for (const ext of BLOCK_PATTERNS.SCRIPT_EXTENSIONS) {
		const filePath = resolve(blockDir, `${baseName}${ext}`);
		if (existsSync(filePath)) {
			return filePath;
		}
	}
	return null;
}

/**
 * Find a CSS file in the block directory based on patterns
 * @param {string} blockDir - Block directory path
 * @param {string} baseName - Base name (e.g., 'style', 'editor')
 * @returns {string|null} Found file path or null
 */
function findCSSFile(blockDir, baseName) {
	for (const ext of BLOCK_PATTERNS.STYLE_EXTENSIONS) {
		const filePath = resolve(blockDir, `${baseName}${ext}`);
		if (existsSync(filePath)) {
			return filePath;
		}
	}
	return null;
}

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
		// This should include the edit functionality and will bundle editor dependencies
		const indexFile = findBlockFile(blockDir, 'index');
		if (indexFile) {
			input[`${entryPrefix}${blockName}/index`] = indexFile;
		}

		// Check for view files (view.ts, view.js, etc.)
		const viewFile = findBlockFile(blockDir, 'view');
		if (viewFile) {
			input[`${entryPrefix}${blockName}/view`] = viewFile;
		}

		// Check for frontend styles (style.css, style.scss)
		const styleCssFile = findCSSFile(blockDir, 'style');
		if (styleCssFile) {
			input[`${entryPrefix}${blockName}/style-index`] = styleCssFile;
		}
	});

	return input;
}
