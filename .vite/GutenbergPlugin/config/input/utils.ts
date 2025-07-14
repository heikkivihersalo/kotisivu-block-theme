import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { BLOCK_PATTERNS } from '../constants.js';

/**
 * Find a file in the block directory based on patterns
 * @param blockDir - Block directory path
 * @param baseName - Base name (e.g., 'index', 'edit', 'view')
 * @returns Found file path or null
 */
export function findBlockFile(
	blockDir: string,
	baseName: string
): string | null {
	for (const ext of BLOCK_PATTERNS.SCRIPT_EXTENSIONS) {
		const filePath = resolve(blockDir, `${baseName}${ext}`);
		if (existsSync(filePath)) {
			return filePath;
		}
	}
	return null;
}

/**
 * Check if a CSS file has meaningful content (not empty or just whitespace/comments)
 * @param filePath - Path to the CSS file
 * @returns True if file has meaningful content
 */
export function hasValidCSSContent(filePath: string): boolean {
	try {
		const content = readFileSync(filePath, 'utf8');
		// Remove whitespace, comments, and empty rules
		const cleanedContent = content
			.replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
			.replace(/\s+/g, '') // Remove whitespace
			.trim();

		// Check if there's any meaningful CSS left
		return cleanedContent.length > 0;
	} catch (error) {
		console.warn(
			`Error reading CSS file ${filePath}:`,
			(error as Error).message
		);
		return false;
	}
}

/**
 * Find a CSS file in the block directory based on patterns
 * Only returns the file if it has meaningful content
 * @param blockDir - Block directory path
 * @param baseName - Base name (e.g., 'style', 'editor')
 * @returns Found file path or null
 */
export function findCSSFile(blockDir: string, baseName: string): string | null {
	for (const ext of BLOCK_PATTERNS.STYLE_EXTENSIONS) {
		const filePath = resolve(blockDir, `${baseName}${ext}`);
		if (existsSync(filePath) && hasValidCSSContent(filePath)) {
			return filePath;
		}
	}
	return null;
}
