/**
 * External dependencies
 */
import { transform } from 'lightningcss';
import type { PluginContext } from 'rollup';

/**
 * Emit CSS files
 * @param context - Rollup plugin context
 * @param baseOutputPath - Base output path for the CSS file
 * @param cssContent - CSS content to emit
 */
export function emitCss(
	context: PluginContext,
	baseOutputPath: string,
	cssContent: string
) {
	const styleFileName = `${baseOutputPath}.css`;
	const { code, map } = transform({
		filename: styleFileName,
		code: Buffer.from(cssContent),
		minify: true,
		sourceMap: true,
	});
	context.emitFile({ type: 'asset', fileName: styleFileName, source: code });
	if (map)
		context.emitFile({
			type: 'asset',
			fileName: `${styleFileName}.map`,
			source: map.toString(),
		});
}
