/**
 * External dependencies
 */
import { build as esBuild } from 'esbuild';

/**
 * Shared dependencies
 */
import { ESBUILD_CONFIG, WORDPRESS_CONFIG } from '../constants';
import { scssPlugin } from '../plugins/scssPlugin';
import { ReactShimPlugin } from '../plugins/reactShimPlugin';
import type {
	ScriptProcessor,
	ScriptBuildOptions,
	ScriptProcessingResult,
} from '../interfaces/ScriptProcessor';

/**
 * ESBuild Processor Implementation
 *
 * This class implements the ScriptProcessor interface using ESBuild,
 * providing a testable and swappable script processing strategy.
 */
export class ESBuildProcessor implements ScriptProcessor {
	/**
	 * Build script using ESBuild
	 */
	async build(options: ScriptBuildOptions): Promise<ScriptProcessingResult> {
		const {
			entryPoint,
			outfile,
			outdir,
			sourcemap = true,
			minify = process.env.NODE_ENV === 'production',
			wpDependencies = [],
		} = options;

		const result = await esBuild({
			entryPoints: [entryPoint],
			...(outfile && { outfile }),
			...(outdir && { outdir }),
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
			minify,
			plugins: [scssPlugin, ReactShimPlugin(wpDependencies)],
			outExtension: { '.js': '.js', '.css': '.css' },
		});

		// Extract content from output files
		const jsContent =
			result.outputFiles?.find((f) => f.path.endsWith('.js'))?.text || '';
		const cssContent =
			result.outputFiles?.find((f) => f.path.endsWith('.css'))?.text ||
			'';
		const jsSourceMap =
			result.outputFiles?.find((f) => f.path.endsWith('.js.map'))?.text ||
			undefined;
		const cssSourceMap =
			result.outputFiles?.find((f) => f.path.endsWith('.css.map'))
				?.text || undefined;

		return {
			jsContent,
			cssContent: cssContent || undefined,
			jsSourceMap,
			cssSourceMap,
			wpDependencies,
			metafile: result.metafile,
		};
	}
}
