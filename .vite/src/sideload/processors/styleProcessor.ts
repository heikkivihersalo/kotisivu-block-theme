import type { PluginContext } from 'rollup';
import { readFileSync } from 'node:fs';
import { findActualStylePath } from '../utils/fileFinder.js';
import { generateAssetFilename } from '../utils/outputConfig.js';
import { FILE_EXTENSIONS } from '../../constants.js';
import type { EmittedAsset } from '../../../types/index.js';
import type { OutputConfig } from '../utils/outputConfig.js';

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
		// For CSS files, we can read them directly and emit them
		const cssContent = readFileSync(actualStylePath, 'utf-8');

		// Create block-specific file path
		const styleFileName = generateAssetFilename(
			styleFile,
			config.outputPath
		);

		pluginContext.emitFile({
			type: 'asset',
			fileName: styleFileName,
			source: cssContent,
		} satisfies EmittedAsset);
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
