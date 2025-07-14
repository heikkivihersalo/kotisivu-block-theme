import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const BUILD_DIR = resolve(__dirname, '../../../../../build/blocks');

/**
 * Get all block directories from the build output
 * @returns Array of block directory paths
 */
export function getBlockDirectories(): string[] {
	const blockLibraryPath = join(BUILD_DIR, 'block-library');
	const pageTemplatesPath = join(BUILD_DIR, 'page-templates');
	const templatePartsPath = join(BUILD_DIR, 'template-parts');

	const blockDirs: string[] = [];

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
 * @param blockDir - Block directory path
 * @param filename - File to check
 * @returns True if file exists
 */
export function hasFile(blockDir: string, filename: string): boolean {
	return existsSync(join(blockDir, filename));
}

/**
 * Get the block name from directory path
 * @param blockDir - Block directory path
 * @returns Block name
 */
export function getBlockName(blockDir: string): string {
	return blockDir.split('/').pop()!;
}

/**
 * Read file content from a block directory
 * @param blockDir - Block directory path
 * @param filename - File to read
 * @returns File content
 */
export function readBlockFile(blockDir: string, filename: string): string {
	return readFileSync(join(blockDir, filename), 'utf-8');
}
