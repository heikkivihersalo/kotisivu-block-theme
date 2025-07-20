import { parse, join } from 'node:path';

/**
 * Extract the filename without its extension from a given path.
 *
 * @param {string} path - The file path to extract the filename from.
 * @return {string} The filename without its extension.
 */
export const extractFilenameWithoutExtension = (path: string): string => {
	const parsed = parse(path);
	return join(parsed.dir, parsed.name);
};
