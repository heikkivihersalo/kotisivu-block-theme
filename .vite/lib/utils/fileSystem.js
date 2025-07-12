import { join, dirname, basename } from 'path';
import {
	existsSync,
	mkdirSync,
	renameSync,
	readdirSync,
	statSync,
	readFileSync,
	writeFileSync,
	unlinkSync,
} from 'fs';

/**
 * Moves files from source to destination directory
 * @param {string} source - Source file path
 * @param {string} destination - Destination file path
 */
export function moveFile(source, destination) {
	const destDir = dirname(destination);
	if (!existsSync(destDir)) {
		mkdirSync(destDir, { recursive: true });
	}
	renameSync(source, destination);
}

/**
 * Recursively finds all files in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} files - Array to collect file paths
 * @returns {string[]} Array of file paths
 */
export function getAllFiles(dir, files = []) {
	if (!existsSync(dir)) return files;

	const dirFiles = readdirSync(dir);
	for (const file of dirFiles) {
		const fullPath = join(dir, file);
		if (statSync(fullPath).isDirectory()) {
			getAllFiles(fullPath, files);
		} else {
			files.push(fullPath);
		}
	}
	return files;
}

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
