/**
 * Shared dependencies
 */
import { extractWpDependencies } from '../../../common/utils/index.ts';
import { FilePathResolver } from '../../../common/services/FilePathResolver';

import type {
	ViteManifest,
	WordPressAssetManifest,
} from '../../../common/types';

/**
 * Convert Vite 6 manifest to WordPress-compatible format
 * Leverages improved manifest structure in Vite 6
 *
 * @param viteManifest - The Vite manifest object.
 * @param publicPath - The public path for assets, defaults to '/'.
 * @return A WordPress asset manifest compatible with WordPress enqueue functions.
 */
export function convertViteManifestToWordPress(
	viteManifest: ViteManifest,
	publicPath: string = '/'
): WordPressAssetManifest {
	const wpManifest: WordPressAssetManifest = {};

	const shouldLoadInFooter = (src: string) => {
		return !src.includes('admin');
	};

	for (const [_src, chunk] of Object.entries(viteManifest)) {
		// Only process entry chunks for WordPress
		if (chunk.isEntry && chunk.src) {
			const assetKey = chunk.src.replace(/\.(ts|js|tsx|jsx)$/, '');

			wpManifest[assetKey] = {
				file: `${publicPath}${chunk.file}`,
				css: (chunk.css || []).map((css) => `${publicPath}${css}`),
				dependencies: extractWpDependencies(chunk.imports),
				version: FilePathResolver.generateVersionFromFile(chunk.file),
				in_footer: shouldLoadInFooter(chunk.src),
			};
		}
	}

	return wpManifest;
}
