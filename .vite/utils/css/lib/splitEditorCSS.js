import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { glob } from 'glob';
import { BLOCK_PATTERNS, WORDPRESS_FILE_OUTPUT } from '../../constants.js';

/**
 * Split consolidated editor CSS into individual index.css files per block
 * @param {Object} options - Build options
 * @param {Object} bundle - Bundle information
 * @param {string} outputDir - Output directory
 */
export function splitEditorCSS(options, bundle, outputDir) {
	const editorCSSPath = resolve(outputDir, 'editor-dependencies.css');
	
	// Check if the consolidated editor CSS file exists
	if (!existsSync(editorCSSPath)) {
		console.log('📝 No editor-dependencies.css found, skipping CSS splitting');
		return;
	}

	// Read the consolidated CSS content
	const consolidatedCSS = readFileSync(editorCSSPath, 'utf8');
	
	// Find all blocks that have edit files with CSS imports
	const blocksWithEditFiles = findBlocksWithEditFiles(outputDir);
	
	if (blocksWithEditFiles.length === 0) {
		console.log('📝 No blocks with edit files found, skipping CSS splitting');
		return;
	}

	// Extract CSS for each block and create individual index.css files
	let remainingCSS = consolidatedCSS;
	const processedBlocks = [];

	blocksWithEditFiles.forEach(({ blockDir, blockName, relativePath }) => {
		// Try to extract block-specific CSS
		const blockCSS = extractBlockCSS(consolidatedCSS, blockName, relativePath);
		
		if (blockCSS && blockCSS.trim().length > 0) {
			// Write individual index.css file
			const indexCSSPath = resolve(blockDir, WORDPRESS_FILE_OUTPUT.EDITOR_CSS);
			writeFileSync(indexCSSPath, blockCSS);
			console.log(`📄 Created: ${relativePath}/${WORDPRESS_FILE_OUTPUT.EDITOR_CSS}`);
			processedBlocks.push(blockName);
		}
	});

	// Remove the consolidated CSS file if we processed any blocks
	if (processedBlocks.length > 0) {
		unlinkSync(editorCSSPath);
		console.log(`✅ Processed ${processedBlocks.length} blocks, removed consolidated editor-dependencies.css`);
	}
}

/**
 * Find all blocks that have edit files
 * @param {string} outputDir - Output directory
 * @returns {Array} Array of block information
 */
function findBlocksWithEditFiles(outputDir) {
	const blocks = [];
	
	// Find all edit.js files in the build output
	const editFiles = glob.sync(`${outputDir}/**/edit.js`);
	
	editFiles.forEach(editFilePath => {
		const blockDir = dirname(editFilePath);
		const blockName = basename(blockDir);
		const relativePath = blockDir.replace(outputDir + '/', '');
		
		blocks.push({
			blockDir,
			blockName,
			relativePath,
			editFilePath
		});
	});
	
	return blocks;
}

/**
 * Extract CSS for a specific block from consolidated CSS
 * This is a simplified approach - in practice, you might need more sophisticated CSS parsing
 * @param {string} consolidatedCSS - The consolidated CSS content
 * @param {string} blockName - Block name
 * @param {string} relativePath - Relative path to the block
 * @returns {string} Extracted CSS for the block
 */
function extractBlockCSS(consolidatedCSS, blockName, relativePath) {
	// For now, return the entire consolidated CSS for each block
	// In a more sophisticated implementation, you would parse the CSS
	// and extract only the rules that belong to each specific block
	
	// Simple approach: if there's any CSS content, assume it belongs to this block
	// This works when each block has its own unique CSS that doesn't conflict
	return consolidatedCSS;
}
