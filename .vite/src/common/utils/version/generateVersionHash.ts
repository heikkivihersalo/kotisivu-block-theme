import { createHash } from 'node:crypto';
import type { BundlerAssetInfo, BundlerChunkInfo } from '../../types';

/**
 * Generate a version hash for the given bundle.
 * This hash can be used to identify changes in the bundle's content.
 *
 * @param bundle - The bundle to generate a hash for.
 * @return The generated version hash.
 */
export function generateVersionHash(bundle: {
	[fileName: string]: BundlerChunkInfo | BundlerAssetInfo;
}): string {
	const hash = createHash('md5');

	const sortedFiles = Object.values(bundle).sort((a, b) =>
		a.fileName.localeCompare(b.fileName)
	);

	for (const file of sortedFiles) {
		const source = file.type === 'chunk' ? file.code : file.source;
		if (source) {
			hash.update(source);
		}
	}

	return hash.digest('hex');
}
