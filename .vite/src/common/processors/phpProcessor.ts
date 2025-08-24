/**
 * External dependencies
 */
import { readFileSync } from 'node:fs';
import type { PluginContext } from 'rollup';
import type { EmittedAsset } from '../types/rollup.ts';

/**
 * Minify PHP content by removing comments, unnecessary whitespace, and formatting
 * This is a conservative minifier that maintains readability while reducing file size
 */
export const minifyPhp = (content: string): string => {
	let result = content;

	// Remove multi-line comments /* ... */
	result = result.replace(/\/\*[\s\S]*?\*\//g, '');

	// Remove single-line comments // ... but preserve URLs like http://
	result = result.replace(/(?<!:)\/\/(?!\/)[^\r\n]*/g, '');

	// Remove single-line comments # ...
	result = result.replace(/(?<!['"])#[^\r\n]*/g, '');

	// Remove excessive whitespace while preserving structure
	// Replace multiple spaces/tabs with single space
	result = result.replace(/[ \t]+/g, ' ');

	// Remove trailing whitespace from lines
	result = result.replace(/[ \t]+$/gm, '');

	// Remove leading whitespace but preserve indentation structure
	result = result.replace(/^[ \t]+/gm, '');

	// Remove multiple consecutive newlines, keep max 1 empty line
	result = result.replace(/\n{3,}/g, '\n\n');

	// Trim start and end
	result = result.trim();

	// Add back single newline at end of file if it doesn't exist
	if (!result.endsWith('\n')) {
		result += '\n';
	}

	return result;
};

/**
 * Process a single PHP file and minify it
 */
export const processPhp = (
	pluginContext: PluginContext,
	phpPath: string,
	outputFileName: string,
	shouldMinify: boolean = true
): void => {
	try {
		pluginContext.addWatchFile(phpPath);
		const phpContent = readFileSync(phpPath, 'utf-8');
		const processedContent = shouldMinify
			? minifyPhp(phpContent)
			: phpContent;

		pluginContext.emitFile({
			type: 'asset',
			fileName: outputFileName,
			source: processedContent,
		} satisfies EmittedAsset);
	} catch {
		// Skip files that can't be processed
	}
};

/**
 * Process multiple PHP files
 */
export const processPhpFiles = (
	pluginContext: PluginContext,
	phpFiles: Array<{ sourcePath: string; outputPath: string }>,
	shouldMinify: boolean = true
): void => {
	for (const { sourcePath, outputPath } of phpFiles) {
		processPhp(pluginContext, sourcePath, outputPath, shouldMinify);
	}
};
