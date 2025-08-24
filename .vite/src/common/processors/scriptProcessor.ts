/**
 * External dependencies
 */
import { build as esBuild } from 'esbuild';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import { findActualFilePath } from '../utils';
import { emitScriptAssets, emitSourceMap } from '../utils';

import { ESBUILD_CONFIG, WORDPRESS_CONFIG } from '../constants.ts';
import { scssPlugin } from '../plugins/scssPlugin.ts';
import { ReactShimPlugin } from '../plugins/reactShimPlugin.ts';

import type { OutputConfig } from '../types';

/**
 * Build script with esbuild
 * @param pluginContext - The Rollup plugin context
 * @param scriptPath - The path to the script file
 * @param config - The output configuration
 * @param sourcemap - The source map configuration
 * @param wpImports - List of WordPress imports used in the script
 */
const buildScript = async (
	scriptPath: string,
	script: string,
	config: OutputConfig,
	sourcemap: boolean | 'linked' | 'external' | 'inline' | 'both',
	wpImports: string[]
) => {
	return await esBuild({
		entryPoints: [scriptPath],
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
};

/**
 * Extract and register bundled dependencies for file watching
 * @param pluginContext - The Rollup plugin context
 * @param metafile - The esbuild metafile
 * @param script - The script file name
 */
const registerBundledDependencies = (
	pluginContext: PluginContext,
	metafile: any,
	script: string
) => {
	const bundledDependencies = Object.keys(metafile.inputs).filter((dep) => {
		if (dep === 'src/' + script) return false;
		if (/:/.test(dep)) return false;
		return true;
	});

	bundledDependencies.forEach((dep) => {
		pluginContext.addWatchFile(dep);
	});
};

/**
 * Process a single script file
 * @param pluginContext - The Rollup plugin context
 * @param script - The script file name
 * @param config - The output configuration
 * @param sourcemap - The source map configuration
 * @return {Promise<void>}
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

	// Build the script
	const result = await buildScript(
		actualScriptPath,
		script,
		config,
		sourcemap,
		wpImports
	);

	// Register dependencies for file watching
	registerBundledDependencies(pluginContext, result.metafile, script);

	// Emit output files
	result.outputFiles.forEach((file) => {
		if (file.path.endsWith('.map')) {
			emitSourceMap(pluginContext, file, script, config);
		} else {
			emitScriptAssets(pluginContext, file, script, config, wpImports);
		}
	});
};

/**
 * Process all scripts for a block
 * @param pluginContext - The Rollup plugin context
 * @param scripts - The script file names
 * @param config - The output configuration
 * @param sourcemap - The source map configuration
 * @return {Promise<void>}
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
