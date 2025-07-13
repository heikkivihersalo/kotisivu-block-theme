import { resolve, dirname, basename } from 'path';
import { readFileSync, existsSync } from 'fs';
import { getBlockJsonFiles } from '../utils/index.js';
import { WORDPRESS_FILE_OUTPUT, BLOCK_PATTERNS } from '../../constants.js';

/**
 * Find render.php file in the block directory
 * @param {string} blockDir - Block directory path
 * @returns {string|null} Found file path or null
 */
function findRenderPhp(blockDir) {
	const renderPhpPath = resolve(blockDir, 'render.php');
	return existsSync(renderPhpPath) ? renderPhpPath : null;
}

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
					fileName: `${filePrefix}${blockName}/${WORDPRESS_FILE_OUTPUT.BLOCK_JSON}`,
					source: blockJsonContent,
				});

				// Copy render.php if it exists
				const renderPhpPath = findRenderPhp(blockDir);
				if (renderPhpPath) {
					const renderPhpContent = readFileSync(
						renderPhpPath,
						'utf8'
					);
					this.emitFile({
						type: 'asset',
						fileName: `${filePrefix}${blockName}/${WORDPRESS_FILE_OUTPUT.RENDER_PHP}`,
						source: renderPhpContent,
					});
				}
			});
		}
	};
}
