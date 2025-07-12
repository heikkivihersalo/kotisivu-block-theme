import { writeFileSync } from 'fs';

/**
 * Safely writes content to a file
 * @param {string} filePath - Path to the file
 * @param {string} content - Content to write
 */
export function safeWriteFile(filePath, content) {
	try {
		writeFileSync(filePath, content, 'utf8');
	} catch (error) {
		throw new Error(`Could not write file ${filePath}: ${error.message}`);
	}
}
