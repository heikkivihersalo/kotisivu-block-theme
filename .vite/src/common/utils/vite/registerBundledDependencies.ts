/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Extract and register bundled dependencies for file watching
 * @param pluginContext - The Rollup plugin context
 * @param metafile - The esbuild metafile
 * @param script - The script file name
 */
export const registerBundledDependencies = (
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
