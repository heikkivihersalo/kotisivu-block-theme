/**
 * External dependencies
 */
import { transform } from 'lightningcss';
import type { PluginContext } from 'rollup';

/**
 * Shared dependencies
 */
import {
	findActualStylePath,
	generateAssetFilename,
	readStylesheet,
} from '../utils';
import { FILE_EXTENSIONS } from '../constants.ts';
import type { EmittedAsset } from '../types/rollup.ts';
import type { OutputConfig } from '../types/assets.ts';

/**
 * Process a single style file
 */
export const processStyle = (
	pluginContext: PluginContext,
	styleFile: string,
	config: OutputConfig
): void => {
	const actualStylePath = findActualStylePath(config.basePath, styleFile);

	if (!actualStylePath) {
		console.warn(
			`Warning: Style file not found: ${styleFile} (tried ${FILE_EXTENSIONS.STYLES.join(', ')} extensions in ${config.basePath})`
		);
		return;
	}

	// Vite won't track this file for watching, so we'll add a manual watcher
	pluginContext.addWatchFile(actualStylePath);

	try {
		const cssContent = readStylesheet(actualStylePath);

		// Determine output filename based on WordPress conventions
		let outputFilename: string;
		if (styleFile === 'editor.css') {
			// WordPress convention: editor.css -> index.css
			outputFilename = generateAssetFilename(
				'index.css',
				config.outputPath
			);
		} else if (styleFile === 'style.css') {
			// WordPress convention: style.css -> style-index.css
			outputFilename = generateAssetFilename(
				'style-index.css',
				config.outputPath
			);
		} else {
			// Use original filename for other CSS files
			outputFilename = generateAssetFilename(
				styleFile,
				config.outputPath
			);
		}

		// Use LightningCSS to process and minify the CSS
		const { code, map } = transform({
			filename: outputFilename,
			code: Buffer.from(cssContent),
			minify: true,
			sourceMap: true,
		});

		pluginContext.emitFile({
			type: 'asset',
			fileName: outputFilename,
			source: code,
		} satisfies EmittedAsset);

		// Emit the source map if available
		if (map) {
			pluginContext.emitFile({
				type: 'asset',
				fileName: `${outputFilename}.map`,
				source: map.toString(),
			} satisfies EmittedAsset);
		}
	} catch (error) {
		console.warn(
			`Warning: Could not process style file ${actualStylePath}:`,
			error
		);
	}
};

/**
 * Process all styles for a block
 */
export const processStyles = (
	pluginContext: PluginContext,
	styles: string[],
	config: OutputConfig
): void => {
	for (const styleFile of styles) {
		processStyle(pluginContext, styleFile, config);
	}
};
