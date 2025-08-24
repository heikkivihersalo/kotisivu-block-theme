/**
 * External dependencies
 */
import { build as esBuild } from 'esbuild';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { findActualFilePath } from '../utils';
import {
	extractFilenameWithoutExtension,
	generateAssetFilename,
	generateFileHash,
	generatePhpAssetFile,
} from '../utils';

import { ESBUILD_CONFIG, WORDPRESS_CONFIG } from '../constants.ts';
import { scssPlugin } from '../plugins/scssPlugin.ts';
import { ReactShimPlugin } from '../shims/react-shim-plugin.ts';

import type { EmittedAsset } from '../types/rollup.ts';
import type { OutputConfig } from '../types/assets.ts';

/**
 * Process a single script file
 */
export const processScript = async (
	pluginContext: PluginContext,
	script: string,
	config: OutputConfig,
	sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
): Promise<void> => {
	const actualScriptPath = findActualFilePath(config.basePath, script);
	if (!actualScriptPath) return;

	pluginContext.addWatchFile(actualScriptPath);
	const wpImports: string[] = [];

	// Build the script as a sideloaded file that isn't injected into the main bundle
	const result = await esBuild({
		entryPoints: [actualScriptPath],
		outfile: config.blockOutputDir + '/' + script,
		platform: ESBUILD_CONFIG.PLATFORM,
		bundle: true,
		write: false,
		metafile: true,
		sourcemap: sourcemap,
		loader: ESBUILD_CONFIG.LOADER_MAP,
		target: ESBUILD_CONFIG.TARGET,
		jsx: ESBUILD_CONFIG.JSX_TRANSFORM,
		jsxFactory: WORDPRESS_CONFIG.JSX_FACTORY,
		jsxFragment: WORDPRESS_CONFIG.JSX_FRAGMENT,
		minify: process.env.NODE_ENV === 'production',
		plugins: [scssPlugin, ReactShimPlugin(wpImports)],
	});

	const bundledDependencies = Object.keys(result.metafile.inputs).filter(
		(dep) => {
			if (dep === 'src/' + script) return false;
			if (/:/.test(dep)) return false;
			else return true;
		}
	);

	bundledDependencies.forEach((dep) => {
		pluginContext.addWatchFile(dep);
	});

	result.outputFiles.forEach((file) => {
		const hash = generateFileHash(file.text);
		const filename = extractFilenameWithoutExtension(script);

		// Check if this is a source map file
		if (file.path.endsWith('.map')) {
			const sourceMapFileName = generateAssetFilename(
				`${script}.map`,
				config.outputPath
			);

			pluginContext.emitFile({
				type: 'asset',
				fileName: sourceMapFileName,
				source: file.contents,
			} satisfies EmittedAsset);
			return;
		}

		// Create block-specific file paths for JavaScript files
		const assetFileName = generateAssetFilename(
			`${filename}.asset.php`,
			config.outputPath
		);
		const scriptFileName = generateAssetFilename(script, config.outputPath);

		pluginContext.emitFile({
			type: 'asset',
			fileName: assetFileName,
			source: generatePhpAssetFile(wpImports, hash),
		} satisfies EmittedAsset);

		pluginContext.emitFile({
			type: 'asset',
			fileName: scriptFileName,
			source: file.contents,
		} satisfies EmittedAsset);
	});
};

/**
 * Process all scripts for a block
 */
export const processScripts = async (
	pluginContext: PluginContext,
	scripts: string[],
	config: OutputConfig,
	sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both' = false
): Promise<void> => {
	for (const script of scripts) {
		await processScript(pluginContext, script, config, sourcemap);
	}
};
