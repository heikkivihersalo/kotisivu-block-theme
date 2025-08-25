/**
 * External dependencies
 */
import { transform } from 'lightningcss';
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import { DevFileEmitter } from './DevFileEmitter';

/**
 * Emit CSS files
 * @param context - Rollup plugin context
 * @param baseOutputPath - Base output path for the CSS file
 * @param cssContent - CSS content to emit
 * @param fileEmitter - Optional DevFileEmitter instance for development mode
 */
export async function emitCss(
	context: PluginContext,
	baseOutputPath: string,
	cssContent: string,
	fileEmitter?: DevFileEmitter
) {
	const styleFileName = `${baseOutputPath}.css`;
	const { code, map } = transform({
		filename: styleFileName,
		code: Buffer.from(cssContent),
		minify: true,
		sourceMap: true,
	});

	if (fileEmitter) {
		await fileEmitter.emitFile(context, {
			type: 'asset',
			fileName: styleFileName,
			source: code,
		});
		if (map) {
			await fileEmitter.emitFile(context, {
				type: 'asset',
				fileName: `${styleFileName}.map`,
				source: map.toString(),
			});
		}
	} else {
		await DevFileEmitter.safeEmitFile(context, {
			type: 'asset',
			fileName: styleFileName,
			source: code,
		});
		if (map) {
			await DevFileEmitter.safeEmitFile(context, {
				type: 'asset',
				fileName: `${styleFileName}.map`,
				source: map.toString(),
			});
		}
	}
}
