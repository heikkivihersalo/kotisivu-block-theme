/**
 * External dependencies
 */
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
import { build as esBuild } from 'esbuild';
import { transform } from 'lightningcss';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	ESBUILD_CONFIG,
	WORDPRESS_CONFIG,
} from '../../../../common/constants.js';
import {
	generateFileHash,
	generatePhpAssetFile,
} from '../../../../common/utils';
import { scssPlugin } from '../../../../common/plugins/scssPlugin.ts';
import type { DiscoveredAssetInfo } from '../../../../common/types/assets.ts';

/**
 * Asset processor configuration
 */
interface AssetProcessorConfig {
	outputDirectory: string;
	dependencies?: string[];
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
}

/**
 * Process generic assets and generate corresponding PHP asset files
 * @param context - Rollup plugin context
 * @param assets - Array of discovered asset information
 * @param config - Asset processor configuration
 */
export const processAssets = async (
	context: PluginContext,
	assets: DiscoveredAssetInfo[],
	config: AssetProcessorConfig
): Promise<void> => {
	const { outputDirectory, dependencies = [], sourcemap = false } = config;

	for (const asset of assets) {
		try {
			// Add the asset file to Rollup's bundle for processing
			context.addWatchFile(asset.sourcePath);

			// Determine output paths
			const jsOutputPath = resolve(
				outputDirectory,
				`${asset.outputPath}.js`
			);

			// Ensure output directory exists (for esbuild processing)
			mkdirSync(dirname(jsOutputPath), { recursive: true });

			const wpImports: string[] = [];

			// Build the asset using esbuild (similar to how scripts are processed)
			const result = await esBuild({
				entryPoints: [asset.sourcePath],
				outdir: dirname(jsOutputPath), // Use outdir instead of outfile to enable CSS extraction
				platform: ESBUILD_CONFIG.PLATFORM,
				bundle: true,
				write: false, // Don't write directly, we'll handle it through Rollup
				metafile: true,
				sourcemap: sourcemap,
				loader: ESBUILD_CONFIG.LOADER_MAP,
				target: ESBUILD_CONFIG.TARGET,
				jsx: ESBUILD_CONFIG.JSX_TRANSFORM,
				jsxFactory: WORDPRESS_CONFIG.JSX_FACTORY,
				jsxFragment: WORDPRESS_CONFIG.JSX_FRAGMENT,
				minify: process.env.NODE_ENV === 'production',
				plugins: [
					scssPlugin,
					{
						name: 'alias-wordpress-and-react',
						setup(build) {
							// Intercept @wordpress/* paths
							build.onResolve(
								{ filter: /^@wordpress\// },
								(args) => {
									return {
										path: args.path,
										namespace: 'wordpress-alias',
									};
								}
							);

							// Generate a shim for @wordpress/* imports
							build.onLoad(
								{ filter: /.*/, namespace: 'wordpress-alias' },
								(args) => {
									const moduleName = args.path.split('/')[1];
									const wpHandle = 'wp-' + moduleName;

									// Convert kebab-case to camelCase for window.wp properties
									const globalName =
										moduleName === 'block-editor'
											? 'blockEditor'
											: moduleName.replace(
													/-([a-z])/g,
													(g) => g[1].toUpperCase()
												);

									// Only add valid WordPress dependencies
									const validWpDependencies = [
										'wp-element',
										'wp-blocks',
										'wp-block-editor',
										'wp-components',
										'wp-data',
										'wp-i18n',
										'wp-api-fetch',
										'wp-compose',
										'wp-hooks',
										'wp-notices',
										'wp-rich-text',
										'wp-url',
										'wp-server-side-render',
									];

									if (
										validWpDependencies.includes(
											wpHandle
										) &&
										!wpImports.includes(wpHandle)
									) {
										wpImports.push(wpHandle);
									}

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

							// Handle React imports
							build.onResolve({ filter: /^react$/ }, (args) => {
								return {
									path: args.path,
									namespace: 'react-alias',
								};
							});

							build.onLoad(
								{ filter: /.*/, namespace: 'react-alias' },
								() => {
									if (!wpImports.includes('wp-element')) {
										wpImports.push('wp-element');
									}

									return {
										contents: `
								const wpElement = window.wp.element;
								module.exports = wpElement;
							`,
										loader: 'js',
									};
								}
							);

							// Handle React DOM imports
							build.onResolve(
								{ filter: /^react-dom$/ },
								(args) => {
									return {
										path: args.path,
										namespace: 'react-dom-alias',
									};
								}
							);

							build.onLoad(
								{ filter: /.*/, namespace: 'react-dom-alias' },
								() => {
									if (!wpImports.includes('wp-element')) {
										wpImports.push('wp-element');
									}

									return {
										contents: `
								const wpElement = window.wp.element;
								module.exports = wpElement;
							`,
										loader: 'js',
									};
								}
							);

							// Handle React JSX Runtime imports
							build.onResolve(
								{ filter: /^react\/jsx-runtime$/ },
								(args) => {
									return {
										path: args.path,
										namespace: 'react-jsx-runtime-alias',
									};
								}
							);

							build.onLoad(
								{
									filter: /.*/,
									namespace: 'react-jsx-runtime-alias',
								},
								() => {
									if (!wpImports.includes('wp-element')) {
										wpImports.push('wp-element');
									}

									return {
										contents: `
								const wpElement = window.wp.element;
								module.exports = {
									jsx: wpElement.createElement,
									jsxs: wpElement.createElement,
									Fragment: wpElement.Fragment
								};
							`,
										loader: 'js',
									};
								}
							);

							// Handle React JSX Dev Runtime imports
							build.onResolve(
								{ filter: /^react\/jsx-dev-runtime$/ },
								(args) => {
									return {
										path: args.path,
										namespace:
											'react-jsx-dev-runtime-alias',
									};
								}
							);

							build.onLoad(
								{
									filter: /.*/,
									namespace: 'react-jsx-dev-runtime-alias',
								},
								() => {
									if (!wpImports.includes('wp-element')) {
										wpImports.push('wp-element');
									}

									return {
										contents: `
								const wpElement = window.wp.element;
								module.exports = {
									jsxDEV: wpElement.createElement,
									Fragment: wpElement.Fragment
								};
							`,
										loader: 'js',
									};
								}
							);
						},
					},
				],
				outExtension: {
					'.js': '.js',
					'.css': '.css',
				},
			}); // Get the built JavaScript content
			const jsOutputFile = result.outputFiles?.find((file) =>
				file.path.endsWith('.js')
			);
			const jsContent = jsOutputFile?.text || '';

			// Extract CSS content if any
			let cssContent = '';
			const cssOutputFile = result.outputFiles?.find((file) =>
				file.path.endsWith('.css')
			);
			if (cssOutputFile) {
				cssContent = cssOutputFile.text;
			}

			// Check for source map files
			const jsSourceMapFile = result.outputFiles?.find((file) =>
				file.path.endsWith('.js.map')
			);

			// Generate hash for the asset file
			const hash = generateFileHash(jsContent);

			// Extract dependencies from the build result
			const assetDependencies = extractAssetDependencies(
				asset.sourcePath,
				result
			);

			// Filter out empty dependencies and combine with extracted dependencies
			const configDeps = dependencies.filter(
				(dep) => dep && dep.trim() !== ''
			);
			const allDependencies = [
				...configDeps,
				...assetDependencies,
				...wpImports,
			];

			// Generate PHP asset file content
			const phpContent = generatePhpAssetFile(allDependencies, hash);

			// Emit JS file through Rollup
			context.emitFile({
				type: 'asset',
				fileName: `${asset.outputPath}.js`,
				source: jsContent,
			});

			// Emit JS source map if it exists
			if (jsSourceMapFile) {
				context.emitFile({
					type: 'asset',
					fileName: `${asset.outputPath}.js.map`,
					source: jsSourceMapFile.text,
				});
			}

			// Emit PHP asset file through Rollup
			context.emitFile({
				type: 'asset',
				fileName: `${asset.outputPath}.asset.php`,
				source: phpContent,
			});

			// Emit CSS file through Rollup if there's CSS content
			if (cssContent.trim()) {
				const styleFileName = `${asset.outputPath}.css`;

				// Use LightningCSS to process and minify the CSS
				const { code, map } = transform({
					filename: styleFileName,
					code: Buffer.from(cssContent),
					minify: true,
					sourceMap: true,
				});

				context.emitFile({
					type: 'asset',
					fileName: styleFileName,
					source: code,
				});

				// Emit the processed CSS source map
				if (map) {
					context.emitFile({
						type: 'asset',
						fileName: `${styleFileName}.map`,
						source: map.toString(),
					});
				}
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			console.error(
				`✗ Failed to process asset ${asset.name}: ${errorMessage}`
			);
		}
	}
};

/**
 * Extract dependencies from TypeScript/JavaScript asset file
 * @param _assetPath - Path to the asset file (unused for now)
 * @param _buildResult - esbuild result containing metafile (unused for now)
 * @returns Array of WordPress dependencies
 */
export function extractAssetDependencies(
	_assetPath: string,
	_buildResult?: any
): string[] {
	// TODO: Implement dependency extraction from build metafile if needed
	// Currently dependencies are specified in the plugin configuration
	return [];
}
