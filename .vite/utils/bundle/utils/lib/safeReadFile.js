import { readFileSync } from 'fs';

/**
 * Safely reads a file and returns its content
 * @param {string} filePath - Path to the file
 * @returns {string} File content
 */
export function safeReadFile(filePath) {
	try {
		return readFileSync(filePath, 'utf8');
	} catch (error) {
		throw new Error(`Could not read file ${filePath}: ${error.message}`);
	}
}
