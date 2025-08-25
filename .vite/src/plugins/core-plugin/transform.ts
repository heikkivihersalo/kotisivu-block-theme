/**
 * External dependencies
 */
import { sep } from 'node:path';
import type { PluginContext } from 'rollup';
import { type ResolvedConfig, preprocessCSS } from 'vite';

/**
 * Shared dependencies
 */
import { trimSlashes, wrapArray } from '../../common/utils';
import { REGEX_PATTERNS } from '../../common/constants.js';
import { DevFileEmitter } from '../../common/utils/vite/DevFileEmitter';
import type {
	WordPressBlockJSON,
	BundlerEmittedAsset,
} from '../../common/types';

/**
 * transform
 *
 * Catches any CSS files imported into the block, normalises their filepath and then emits them as
 * separate files into the final build.
 *
 * Enables each Wordpress build folder to maintain its structure like style.css, editor-style.css et al.
 *
 * @see https://rollupjs.org/plugin-development/#transform
 */
export async function transform(
	this: PluginContext,
	code: string,
	id: string,
	blockFile: WordPressBlockJSON,
	config: ResolvedConfig,
	_environment?: any,
	fileEmitter?: DevFileEmitter
): Promise<string | boolean | void> {
	const [filename] = id.split('?');
	const isStylesheet = REGEX_PATTERNS.CSS_FILE_EXTENSION.test(filename);
	if (!isStylesheet) return;

	// Modern Vite 6: Environment is available for future enhancements
	// const isServer = isServerEnvironment(environment);

	const result = await preprocessCSS(code, id, config);

	const outputPath = trimSlashes(
		id.replace(`${process.cwd()}${sep}src`, '').replace(/\\/g, '/')
	).replace(REGEX_PATTERNS.CSS_FILE_EXTENSION, '.css');

	const style = blockFile?.style ? wrapArray(blockFile.style) : [];
	const editorStyle = blockFile?.editorStyle
		? wrapArray(blockFile.editorStyle)
		: [];
	const viewStyle = blockFile?.viewStyle
		? wrapArray(blockFile.viewStyle)
		: [];
	const stylesheets = (
		[...style, ...editorStyle, ...viewStyle].flat(Infinity) as string[]
	)
		.filter((s) => !!s)
		.map((s) => trimSlashes(s.replace('file:.', '')));

	if (stylesheets.includes(outputPath) === false) return result.code;

	if (fileEmitter) {
		await fileEmitter.emitFile(this, {
			type: 'asset',
			fileName: outputPath,
			source: result.code,
		} satisfies BundlerEmittedAsset);
	} else {
		const { DevFileEmitter } = await import(
			'../../common/utils/vite/DevFileEmitter'
		);
		await DevFileEmitter.safeEmitFile(this, {
			type: 'asset',
			fileName: outputPath,
			source: result.code,
		} satisfies BundlerEmittedAsset);
	}
}
