import { join, dirname, basename } from 'path';
import { renameSync, unlinkSync } from 'fs';
import { getAllFiles } from './getAllFiles.js';
import { safeReadFile } from './safeReadFile.js';
import { safeWriteFile } from './safeWriteFile.js';
import { OUTPUT_PATTERNS } from '../../../constants.js';

/**
 * Fix CSS file extensions and rename editor-styles to index
 * @param {string} outputDir - Main output directory for blocks
 */
export function fixCssFiles(outputDir) {
	console.log('🎨 Fixing CSS file extensions and names...');

	// First pass: Get all files and convert JS to CSS
	let allFiles = getAllFiles(outputDir);
	const filesToConvert = [];

	for (const filePath of allFiles) {
		const fileName = basename(filePath);

		// Collect .js files that should be .css (for empty CSS files processed by Vite)
		if (
			fileName.endsWith('.js') &&
			(fileName.includes(OUTPUT_PATTERNS.INDEX_CSS) || fileName.includes(OUTPUT_PATTERNS.STYLE_INDEX))
		) {
			// Check if this is actually a CSS file by reading content
			try {
				const content = safeReadFile(filePath);
				// If it's an empty or nearly empty JS file, it was originally CSS
				if (
					content.trim().length < 50 ||
					content.includes('export {}')
				) {
					filesToConvert.push(filePath);
				}
			} catch (error) {
				console.warn(
					`⚠️  Could not process ${fileName}:`,
					error.message
				);
			}
		}
	}

	// Convert all JS files to CSS first
	for (const filePath of filesToConvert) {
		const fileName = basename(filePath);
		const dirName = dirname(filePath);
		const cssFileName = fileName.replace('.js', '.css');
		const newPath = join(dirName, cssFileName);

		try {
			// Write an empty CSS file instead
			safeWriteFile(newPath, '');
			// Remove the JS file
			unlinkSync(filePath);
			console.log(`🔄 Converted ${fileName} → ${cssFileName}`);
		} catch (error) {
			console.warn(`⚠️  Could not convert ${fileName}:`, error.message);
		}
	}

	// Second pass: Refresh file list and rename all index-css.css to index.css
	allFiles = getAllFiles(outputDir);
	const filesToRename = allFiles.filter(
		(filePath) => basename(filePath) === `${OUTPUT_PATTERNS.INDEX_CSS}.css`
	);

	for (const filePath of filesToRename) {
		const dirName = dirname(filePath);
		const newPath = join(dirName, 'index.css');
		try {
			renameSync(filePath, newPath);
			console.log(
				`📝 Renamed index-css.css → index.css in ${basename(dirName)}`
			);
		} catch (error) {
			console.warn(
				`⚠️  Could not rename ${basename(filePath)} in ${basename(dirName)}:`,
				error.message
			);
		}
	}
}
