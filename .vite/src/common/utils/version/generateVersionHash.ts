import { generateFileHash } from './generateFileHash.ts';
import type { AssetInfo, ChunkInfo } from '../../../common/types/rollup.ts';

/**
 * Generate a version hash for the given bundle.
 * This hash can be used to identify changes in the bundle's content.
 *
 * @param bundle - The bundle to generate a hash for.
 * @return The generated version hash.
 */
export function generateVersionHash(bundle: {
	[fileName: string]: ChunkInfo | AssetInfo;
}): string {
	// Find the first file with code to generate hash from
	for (const file of Object.values(bundle)) {
		if (file.code) {
			return generateFileHash(file.code);
		}
	}
	return '';
}
