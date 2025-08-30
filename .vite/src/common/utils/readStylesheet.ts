/**
 * External dependencies
 */
import { readFileSync } from 'node:fs';
import { compile } from 'sass';

/**
 * Read and compile a stylesheet file (SCSS or CSS).
 *
 * @param {string} path - The path to the stylesheet file.
 * @return {string} The compiled CSS content.
 */
export function readStylesheet(path: string): string {
	if (path.endsWith('.scss') || path.endsWith('.sass')) {
		const result = compile(path);
		return result.css;
	}

	return readFileSync(path, 'utf-8');
}
