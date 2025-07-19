import { generateFileHash, generatePhpAssetFile } from './utils.js';
import type { OutputOptions, PluginContext } from 'rollup';
import type { EmittedAsset, AssetInfo, ChunkInfo } from '../types/index.js';

/**
 * generateBundle
 *
 * Wordpress blocks wont be detected unless an `index.asset.php` file is generated for each one which
 * tells WP information about versioning and dependencies.
 *
 * This function maps the imports from the @wordpress namespace, generates a version hash and then
 * emits the required php file into the build folder
 *
 * @see https://rollupjs.org/plugin-development/#generatebundle
 */
export function generateBundle(
	this: PluginContext,
	_options: OutputOptions,
	bundle: { [fileName: string]: ChunkInfo | AssetInfo },
	dependencies: string[]
) {
	let hash: string = '';

	const imports = Object.values(bundle).reduce((acc, file) => {
		if (!file.code) return acc;

		hash = generateFileHash(file.code);
		file.imports.forEach((i) => {
			i = i.replace(/^@wordpress\//, 'wp-');
			acc.add(i);
		}, acc);
		return acc;
	}, new Set()) as Set<string>;

	for (const dependency of dependencies) {
		imports.add(dependency);
	}

	this.emitFile({
		type: 'asset',
		fileName: 'index.asset.php',
		source: generatePhpAssetFile(imports, hash),
	} satisfies EmittedAsset);
}
