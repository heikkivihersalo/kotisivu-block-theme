import { resolve, dirname, basename } from 'path';
import { readFileSync, existsSync } from 'fs';
import { getBlockJsonFiles } from '../utils/index.js';
import { WORDPRESS_FILES } from '../../constants.js';

/**
 * Generates bundle files for blocks including block.json and render.php
 * @param {Object|string} inputDirs - Object of {outputSubDir: inputDir} or legacy string
 * @param {boolean} copyBlockJson - Whether to copy block.json files
 * @returns {Function} Generate bundle function for Vite plugin
 */
export function createBundleGenerator(inputDirs, copyBlockJson = true) {
	return function generateBundle(options, bundle) {
		if (!copyBlockJson) return;

		// Handle both new object format and legacy string format
		const dirsToProcess =
			typeof inputDirs === 'string' ? { '': inputDirs } : inputDirs;

		// Process each input directory
		for (const [outputSubDir, inputDir] of Object.entries(dirsToProcess)) {
			const blockJsonFiles = getBlockJsonFiles(inputDir);

			blockJsonFiles.forEach((blockJsonPath) => {
				const blockDir = dirname(blockJsonPath);
				const blockName = basename(blockDir);
				const blockJsonContent = readFileSync(blockJsonPath, 'utf8');

				// Create file path with optional subdirectory
				const filePrefix = outputSubDir ? `${outputSubDir}/` : '';

				// Add block.json to bundle
				this.emitFile({
					type: 'asset',
					fileName: `${filePrefix}${blockName}/${WORDPRESS_FILES.BLOCK_JSON.output}`,
					source: blockJsonContent,
				});

				// Copy render.php if it exists
				const renderPhpPath = resolve(
					blockDir,
					WORDPRESS_FILES.RENDER_PHP.input
				);
				if (existsSync(renderPhpPath)) {
					const renderPhpContent = readFileSync(
						renderPhpPath,
						'utf8'
					);
					this.emitFile({
						type: 'asset',
						fileName: `${filePrefix}${blockName}/${WORDPRESS_FILES.RENDER_PHP.output}`,
						source: renderPhpContent,
					});
				}
			});
		}
	};
}
