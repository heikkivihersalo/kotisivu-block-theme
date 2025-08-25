import { createHash } from 'node:crypto';

/**
 * Generate a hash for a file.
 * @param content - The content of the file to hash.
 * @returns The hash of the file.
 */
export function generateFileHash(content: Buffer | string): string {
	return createHash('md5').update(content).digest('hex');
}
