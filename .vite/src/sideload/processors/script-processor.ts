import type { PluginContext } from 'rollup';
import { build as esBuild } from 'esbuild';
import { findActualFilePath } from '../utils/file-finder.js';
import {
	generateFileHash,
	generatePhpAssetFile,
	extractFilenameWithoutExtension,
} from '../../utils.js';
import { generateAssetFilename } from '../utils/output-config.js';
import type { EmittedAsset } from '../../../types/index.js';
import type { OutputConfig } from '../utils/output-config.js';

/**
 * Process a single script file
 */
export const processScript = async (
	pluginContext: PluginContext,
	script: string,
	config: OutputConfig
): Promise<void> => {
	const actualScriptPath = findActualFilePath(config.basePath, script);

	if (!actualScriptPath) {
		console.warn(
			`Warning: Script file not found: ${script} (tried .js, .jsx, .ts, .tsx extensions in ${config.basePath})`
		);
		return;
	}

	// Vite won't track this file for watching, so we'll add a manual watcher
	pluginContext.addWatchFile(actualScriptPath);
	const wpImports: string[] = [];

	// Build the script as a sideloaded file that isn't injected into the main bundle
	const result = await esBuild({
		entryPoints: [actualScriptPath],
		outfile: config.blockOutputDir + '/' + script,
		platform: 'browser',
		bundle: true,
		write: false,
		metafile: true,
		loader: {
			'.js': 'jsx',
			'.jsx': 'jsx',
			'.ts': 'tsx',
			'.tsx': 'tsx',
		},
		target: 'es2020',
		jsx: 'transform',
		jsxFactory: 'wp.element.createElement',
		jsxFragment: 'wp.element.Fragment',
		plugins: [
			{
				name: 'alias-wordpress',
				setup(build) {
					// Intercept @wordpress/* paths
					build.onResolve({ filter: /^@wordpress\// }, (args) => {
						return {
							path: args.path,
							namespace: 'wordpress-alias',
						};
					});

					// Generate a shim for @wordpress/* imports
					build.onLoad(
						{ filter: /.*/, namespace: 'wordpress-alias' },
						(args) => {
							const moduleName = args.path.split('/')[1];

							// Skip @wordpress/icons as it's not a WordPress core dependency
							// Icons should be bundled with the block or handled separately
							if (moduleName === 'icons') {
								return {
									contents: `
										console.warn('@wordpress/icons should be bundled with your block or replaced with individual icon imports');
										exports.default = {};
									`,
									loader: 'js',
								};
							}

							// Convert kebab-case to camelCase for WordPress globals
							const globalName = moduleName.replace(/-./g, (x) =>
								x[1].toUpperCase()
							);
							wpImports.push('wp-' + moduleName);
							return {
								contents: `
                  const wpModule = window.wp.${globalName};
                  for (const key in wpModule) {
                    if (Object.prototype.hasOwnProperty.call(wpModule, key)) {
                      exports[key] = wpModule[key];
                    }
                  }
                `,
								loader: 'js',
							};
						}
					);
				},
			},
		],
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

		// Create block-specific file paths
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
	config: OutputConfig
): Promise<void> => {
	for (const script of scripts) {
		await processScript(pluginContext, script, config);
	}
};
