import { createHash } from 'crypto';
import { safeReadFile } from './safeReadFile.js';

/**
 * Generates a hash for file versioning
 * @param {string} filePath - Path to the file to hash
 * @returns {string} Hash string
 */
export function generateFileHash(filePath) {
	try {
		const content = safeReadFile(filePath);
		return createHash('md5').update(content).digest('hex').substring(0, 16);
	} catch (error) {
		// Fallback to timestamp-based hash if file reading fails
		return createHash('md5')
			.update(Date.now().toString())
			.digest('hex')
			.substring(0, 16);
	}
}
