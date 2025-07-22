/**
 * Internal dependencies
 */
import { generateFileHash } from '../../common/index.ts';
import type { AssetInfo, ChunkInfo } from '../../../types/index.ts';

/**
 * Generate version hash from bundle content
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
