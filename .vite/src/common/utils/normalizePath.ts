/**
 * External dependencies
 */
import { sep } from 'node:path';

/**
 * Normalize a path by ensuring it ends with a directory separator.
 *
 * @param {string | null | undefined} path - The path to normalize.
 * @returns {string | null} The normalized path or null if input is null/undefined.
 */
export function normalizePath(path: string | null | undefined): string | null {
	if (path === null || path === undefined) {
		return null;
	}
	const regex = new RegExp(sep + '$');
	return regex.test(path) ? path : path + sep;
}
