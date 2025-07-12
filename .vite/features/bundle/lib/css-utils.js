import { join, dirname, basename } from 'path';
import { renameSync, unlinkSync } from 'fs';
import { getAllFiles, safeReadFile, safeWriteFile } from '../helpers.js';

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
			(fileName.includes('index-css') || fileName.includes('style-index'))
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
		(filePath) => basename(filePath) === 'index-css.css'
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

/**
 * Clean up CSS import comments from JavaScript files
 * @param {string} outputDir - Main output directory for blocks
 */
export function cleanupCssComments(outputDir) {
	console.log('🧹 Cleaning up CSS import comments from JavaScript files...');

	// Get all JS files in the output directory
	const allFiles = getAllFiles(outputDir);
	const jsFiles = allFiles.filter((file) => file.endsWith('.js'));

	for (const filePath of jsFiles) {
		try {
			let content = safeReadFile(filePath);
			let hasChanges = false;

			// Remove CSS import comments like /* empty css */ or /* css content */
			const cssCommentPattern = /\/\*\s*empty\s+css\s*\*\/\s*/gi;
			if (cssCommentPattern.test(content)) {
				content = content.replace(cssCommentPattern, '');
				hasChanges = true;
			}

			// Remove other CSS-related comments that Vite might leave
			const generalCssPattern = /\/\*\s*css[^*]*\*\/\s*/gi;
			if (generalCssPattern.test(content)) {
				content = content.replace(generalCssPattern, '');
				hasChanges = true;
			}

			// Clean up any double spaces that might result from removing comments
			if (hasChanges) {
				content = content.replace(/\s{2,}/g, ' ').trim();
				safeWriteFile(filePath, content);
				console.log(
					`🧹 Cleaned CSS comments from ${basename(filePath)}`
				);
			}
		} catch (error) {
			console.warn(
				`⚠️  Could not clean CSS comments from ${filePath}:`,
				error.message
			);
		}
	}
}

/**
 * Remove CSS import comments from a single JavaScript file
 * @param {string} filePath - Path to the JavaScript file
 */
export function removeCSSImportComments(filePath) {
	try {
		let content = safeReadFile(filePath);
		let hasChanges = false;

		// Remove CSS import comments like /* empty css */ or /* css content */
		const cssCommentPattern = /\/\*\s*empty\s+css\s*\*\/\s*/gi;
		if (cssCommentPattern.test(content)) {
			content = content.replace(cssCommentPattern, '');
			hasChanges = true;
		}

		// Remove other CSS-related comments that Vite might leave
		const generalCssPattern = /\/\*\s*css[^*]*\*\/\s*/gi;
		if (generalCssPattern.test(content)) {
			content = content.replace(generalCssPattern, '');
			hasChanges = true;
		}

		// Clean up any double spaces that might result from removing comments
		if (hasChanges) {
			content = content.replace(/\s{2,}/g, ' ').trim();
			safeWriteFile(filePath, content);
			console.log(`🧹 Cleaned CSS comments from ${basename(filePath)}`);
		}
	} catch (error) {
		console.warn(
			`⚠️  Could not clean CSS comments from ${filePath}:`,
			error.message
		);
	}
}
