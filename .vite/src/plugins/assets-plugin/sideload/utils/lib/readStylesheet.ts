/**
 * External dependencies
 */
import { readFileSync } from 'node:fs';
import { compile } from 'sass';

/**
 * Check if the given path is a SCSS file.
 *
 * @param {string} path - The file path to check.
 * @return {boolean} True if the file is a SCSS file, false otherwise.
 */
function isSCSSFile(path: string): boolean {
	return path.endsWith('.scss') || path.endsWith('.sass');
}

/**
 * Read and compile a stylesheet file (SCSS or CSS).
 *
 * @param {string} path - The path to the stylesheet file.
 * @return {string} The compiled CSS content.
 */
export function readStylesheet(path: string): string {
	if (isSCSSFile(path)) {
		const result = compile(path);
		return result.css;
	}

	return readFileSync(path, 'utf-8');
}
