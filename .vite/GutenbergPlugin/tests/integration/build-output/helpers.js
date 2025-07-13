import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const BUILD_DIR = resolve(__dirname, '../../../../../build/blocks');

/**
 * Get all block directories from the build output
 * @returns {string[]} Array of block directory paths
 */
export function getBlockDirectories() {
	const blockLibraryPath = join(BUILD_DIR, 'block-library');
	const pageTemplatesPath = join(BUILD_DIR, 'page-templates');
	const templatePartsPath = join(BUILD_DIR, 'template-parts');

	const blockDirs = [];

	// Get block-library blocks
	if (existsSync(blockLibraryPath)) {
		const blockLibraryDirs = readdirSync(blockLibraryPath)
			.map((dir) => join(blockLibraryPath, dir))
			.filter((path) => statSync(path).isDirectory());
		blockDirs.push(...blockLibraryDirs);
	}

	// Get page-templates blocks
	if (existsSync(pageTemplatesPath)) {
		const pageTemplateDirs = readdirSync(pageTemplatesPath)
			.map((dir) => join(pageTemplatesPath, dir))
			.filter((path) => statSync(path).isDirectory());
		blockDirs.push(...pageTemplateDirs);
	}

	// Get template-parts blocks
	if (existsSync(templatePartsPath)) {
		const templatePartDirs = readdirSync(templatePartsPath)
			.map((dir) => join(templatePartsPath, dir))
			.filter((path) => statSync(path).isDirectory());
		blockDirs.push(...templatePartDirs);
	}

	return blockDirs;
}

/**
 * Check if a file exists in a block directory
 * @param {string} blockDir - Block directory path
 * @param {string} filename - File to check
 * @returns {boolean} True if file exists
 */
export function hasFile(blockDir, filename) {
	return existsSync(join(blockDir, filename));
}

/**
 * Get the block name from directory path
 * @param {string} blockDir - Block directory path
 * @returns {string} Block name
 */
export function getBlockName(blockDir) {
	return blockDir.split('/').pop();
}

/**
 * Read file content from a block directory
 * @param {string} blockDir - Block directory path
 * @param {string} filename - File to read
 * @returns {string} File content
 */
export function readBlockFile(blockDir, filename) {
	return readFileSync(join(blockDir, filename), 'utf-8');
}
