/**
 * External dependencies
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Helper function to validate and normalize paths
 * @param path - The path to validate
 * @param basePath - The base path to resolve against
 * @return Normalized path if valid, null otherwise
 */
export function validateAndNormalizePath(
	path: string,
	basePath: string
): string | null {
	if (!path || typeof path !== 'string') {
		return null;
	}

	try {
		const fullPath = resolve(basePath, path);
		return existsSync(fullPath) ? fullPath : null;
	} catch (error) {
		return null;
	}
}
