import { resolve, dirname, basename } from 'path';
import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

/**
 * Discover all block.json files and create build entries
 * @param {string} blocksDir - Directory to search for blocks
 * @returns {Object} Input configuration for Vite
 */
export function createBlockInputs(blocksDir) {
	// Find all block.json files
	const blockJsonFiles = glob.sync(`${blocksDir}/**/block.json`);

	if (blockJsonFiles.length === 0) {
		console.warn('No block.json files found in', blocksDir);
		return {};
	}

	const input = {};

	blockJsonFiles.forEach((blockJsonPath) => {
		const blockDir = dirname(blockJsonPath);
		const blockName = basename(blockDir);

		// Read block.json to understand the structure
		const blockJson = JSON.parse(readFileSync(blockJsonPath, 'utf8'));

		// Check for main script file (index.ts, index.js, index.tsx, index.jsx)
		const indexFile = ['index.ts', 'index.tsx', 'index.js', 'index.jsx']
			.map((filename) => resolve(blockDir, filename))
			.find((filepath) => existsSync(filepath));

		if (indexFile) {
			input[`${blockName}/index`] = indexFile;
		}

		// Check for editor-specific files
		const editorFiles = [
			'editor.ts',
			'editor.tsx',
			'editor.js',
			'editor.jsx',
		]
			.map((filename) => resolve(blockDir, filename))
			.find((filepath) => existsSync(filepath));

		if (editorFiles) {
			input[`${blockName}/editor`] = editorFiles;
		}

		// Check for view files (view.ts, view.js, etc.)
		const viewFiles = ['view.ts', 'view.tsx', 'view.js', 'view.jsx']
			.map((filename) => resolve(blockDir, filename))
			.find((filepath) => existsSync(filepath));

		if (viewFiles) {
			input[`${blockName}/view`] = viewFiles;
		}

		// Check for editor styles (editor.css) - output as index.css to match WordPress convention
		const editorCssFile = resolve(blockDir, 'editor.css');
		if (existsSync(editorCssFile)) {
			input[`${blockName}/index-css`] = editorCssFile;
		}

		// Check for frontend styles (style.css)
		const styleCssFile = resolve(blockDir, 'style.css');
		if (existsSync(styleCssFile)) {
			input[`${blockName}/style-index`] = styleCssFile;
		}
	});

	return input;
}

/**
 * Get all block.json files for bundle generation
 * @param {string} blocksDir - Directory to search for blocks
 * @returns {Array} Array of block.json file paths
 */
export function getBlockJsonFiles(blocksDir) {
	return glob.sync(`${blocksDir}/**/block.json`);
}
