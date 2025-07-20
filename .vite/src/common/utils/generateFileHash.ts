import { createHash } from 'node:crypto';

/**
 * Generate a hash for the given file contents.
 *
 * @param {string} contents - The contents of the file to hash.
 * @return {string} The MD5 hash of the file contents.
 */
export const generateFileHash = (contents: string) =>
	createHash('md5').update(contents).digest('hex');
