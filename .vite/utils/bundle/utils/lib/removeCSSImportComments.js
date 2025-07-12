import { basename } from 'path';
import { safeReadFile } from './safeReadFile.js';
import { safeWriteFile } from './safeWriteFile.js';

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
