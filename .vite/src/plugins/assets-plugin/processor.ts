/**
 * External dependencies
 */
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { build as esBuild } from 'esbuild';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { ESBUILD_CONFIG, WORDPRESS_CONFIG } from '../../common/constants.ts';
import {
	generateFileHash,
	generatePhpAssetFile,
	DevFileEmitter,
} from '../../common/utils/index.ts';
import { CssProcessor } from '../../common/processors/CssProcessor.ts';
import { scssPlugin } from '../../common/plugins/scssPlugin.ts';

import type {
	DiscoveredAssetInfo,
	AssetProcessorConfig,
} from '../../common/types';

/**
 * Internal dependencies
 */
import { ReactShimPlugin } from '../../common/plugins/reactShimPlugin.ts';

/**
 * Process generic assets and generate corresponding PHP asset files
 * @param context - Rollup plugin context
 * @param assets - Array of discovered asset information
 * @param config - Asset processor configuration
 */
export const processAssets = async (
	context: PluginContext,
	assets: DiscoveredAssetInfo[],
	{
		outputDirectory,
		dependencies = [],
		sourcemap = false,
		fileEmitter,
	}: AssetProcessorConfig
): Promise<void> => {
	// Create CSS processor instance
	const cssProcessor = new CssProcessor(fileEmitter);

	for (const asset of assets) {
		try {
			context.addWatchFile(asset.sourcePath);
			const jsOutputPath = resolve(
				outputDirectory,
				`${asset.outputPath}.js`
			);
			mkdirSync(dirname(jsOutputPath), { recursive: true });
			const wpImports: string[] = [];

			const result = await esBuild({
				entryPoints: [asset.sourcePath],
				outdir: dirname(jsOutputPath),
				platform: ESBUILD_CONFIG.PLATFORM,
				bundle: true,
				write: false,
				metafile: true,
				sourcemap,
				loader: ESBUILD_CONFIG.LOADER_MAP,
				target: ESBUILD_CONFIG.TARGET,
				jsx: ESBUILD_CONFIG.JSX_TRANSFORM,
				jsxFactory: WORDPRESS_CONFIG.JSX_FACTORY,
				jsxFragment: WORDPRESS_CONFIG.JSX_FRAGMENT,
				minify: process.env.NODE_ENV === 'production',
				plugins: [scssPlugin, ReactShimPlugin(wpImports)],
				outExtension: { '.js': '.js', '.css': '.css' },
			});

			const jsContent =
				result.outputFiles?.find((f) => f.path.endsWith('.js'))?.text ||
				'';
			const cssContent =
				result.outputFiles?.find((f) => f.path.endsWith('.css'))
					?.text || '';
			const jsSourceMapFile = result.outputFiles?.find((f) =>
				f.path.endsWith('.js.map')
			);
			const hash = generateFileHash(jsContent);

			const configDeps = dependencies.filter((dep) => dep.trim() !== '');
			const allDependencies = [...configDeps, ...wpImports];
			const phpContent = generatePhpAssetFile(allDependencies, hash);

			// Emit JavaScript file
			await DevFileEmitter.safeEmitFile(context, {
				type: 'asset',
				fileName: `${asset.outputPath}.js`,
				source: jsContent,
			});

			// Emit source map if available
			if (jsSourceMapFile) {
				await DevFileEmitter.safeEmitFile(context, {
					type: 'asset',
					fileName: `${asset.outputPath}.js.map`,
					source: jsSourceMapFile.text,
				});
			}

			// Emit PHP asset file
			await DevFileEmitter.safeEmitFile(context, {
				type: 'asset',
				fileName: `${asset.outputPath}.asset.php`,
				source: phpContent,
			});

			// Process CSS if available
			if (cssContent.trim()) {
				await cssProcessor.processWithBasePath(
					context,
					asset.outputPath,
					cssContent
				);
			}
		} catch {
			// Skip assets that can't be processed
			continue;
		}
	}
};
