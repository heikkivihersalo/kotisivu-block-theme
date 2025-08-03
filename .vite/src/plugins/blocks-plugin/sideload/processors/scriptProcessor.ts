/**
 * External dependencies
 */
import { build as esBuild } from 'esbuild';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	ESBUILD_CONFIG,
	FILE_EXTENSIONS,
	WORDPRESS_CONFIG,
} from '../../../../common/constants.js';

import {
	extractFilenameWithoutExtension,
	generateFileHash,
	generatePhpAssetFile,
} from '../../../../common/index.js';

import type { EmittedAsset } from '../../../../common/types/rollup.ts';

/**
 * Internal dependencies
 */
import { findActualFilePath, generateAssetFilename } from '../utils';
import type { OutputConfig } from '../../types.ts';

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

	if (!actualScriptPath) {
		console.warn(
			`Warning: Script file not found: ${script} (tried ${FILE_EXTENSIONS.SCRIPTS.join(', ')} extensions in ${config.basePath})`
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
		external: ['react', 'react-dom'], // Externalize React dependencies
		plugins: [
			{
				name: 'alias-wordpress-and-react',
				setup(build) {
					// Intercept React imports and map to WordPress globals
					build.onResolve({ filter: /^react$/ }, () => {
						return {
							path: 'react',
							namespace: 'react-alias',
						};
					});

					build.onResolve({ filter: /^react-dom$/ }, () => {
						return {
							path: 'react-dom',
							namespace: 'react-alias',
						};
					});

					build.onResolve({ filter: /^react\/jsx-runtime$/ }, () => {
						return {
							path: 'react/jsx-runtime',
							namespace: 'react-alias',
						};
					});

					build.onResolve(
						{ filter: /^react\/jsx-dev-runtime$/ },
						() => {
							return {
								path: 'react/jsx-dev-runtime',
								namespace: 'react-alias',
							};
						}
					);

					// Generate React shims
					build.onLoad(
						{ filter: /.*/, namespace: 'react-alias' },
						(args) => {
							if (args.path === 'react') {
								wpImports.push('react');
								return {
									contents: `
										const React = window.React;
										module.exports = React;
										module.exports.default = React;
									`,
									loader: 'js',
								};
							}
							if (args.path === 'react-dom') {
								wpImports.push('react-dom');
								return {
									contents: `
										const ReactDOM = window.ReactDOM;
										module.exports = ReactDOM;
										module.exports.default = ReactDOM;
									`,
									loader: 'js',
								};
							}
							if (args.path === 'react/jsx-runtime') {
								wpImports.push('react');
								return {
									contents: `
										const React = window.React;
										module.exports = {
											jsx: React.createElement,
											jsxs: React.createElement,
											Fragment: React.Fragment
										};
									`,
									loader: 'js',
								};
							}
							if (args.path === 'react/jsx-dev-runtime') {
								wpImports.push('react');
								return {
									contents: `
										const React = window.React;
										module.exports = {
											jsx: React.createElement,
											jsxs: React.createElement,
											jsxDEV: React.createElement,
											Fragment: React.Fragment
										};
									`,
									loader: 'js',
								};
							}
						}
					);

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
