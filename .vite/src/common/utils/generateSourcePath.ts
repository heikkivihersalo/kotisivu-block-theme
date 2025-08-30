/**
 * External dependencies
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Generate a source path by resolving the given path against the base path.
 * @param path - The path to validate
 * @param basePath - The base path to resolve against
 * @return The resolved path if it exists, otherwise null.
 */
export function generateSourcePath(
	path: string,
	basePath: string
): string | null {
	if (!path) return null;

	const fullPath = resolve(basePath, path);
	return existsSync(fullPath) ? fullPath : null;
}
