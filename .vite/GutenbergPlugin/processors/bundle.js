import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { glob } from 'glob';
import { BLOCK_PATTERNS, WORDPRESS_FILE_OUTPUT } from '../config/constants.js';

/**
 * Get all block.json files from a directory
 * @param {string} blocksDir - Directory to search for blocks
 * @returns {string[]} Array of block.json file paths
 */
export function getBlockJsonFiles(blocksDir) {
	return glob.sync(`${blocksDir}/${BLOCK_PATTERNS.BLOCK_JSON}`);
}

/**
 * Create bundle generator for copying block.json files and generating manifest
 * @param {Object} inputDirs - Input directories configuration
 * @param {boolean} copyBlockJson - Whether to copy block.json files
 * @returns {Function} Bundle generator function
 */
export function createBundleGenerator(inputDirs, copyBlockJson = true) {
	return function generateBundle(options, bundle) {
		const manifest = {};

		// Process each input directory
		for (const [outputSubDir, inputDir] of Object.entries(inputDirs)) {
			const blockJsonFiles = getBlockJsonFiles(inputDir);

			blockJsonFiles.forEach((blockJsonPath) => {
				const blockDir = dirname(blockJsonPath);
				const blockName = blockDir.split('/').pop();

				// Create entry key with optional subdirectory prefix
				const entryPrefix = outputSubDir ? `${outputSubDir}/` : '';
				const blockKey = `${entryPrefix}${blockName}`;

				// Initialize block entry in manifest
				if (!manifest[blockKey]) {
					manifest[blockKey] = {
						blockJson: `${blockKey}/${WORDPRESS_FILE_OUTPUT.BLOCK_JSON}`,
					};
				}

				// Copy block.json to output
				if (copyBlockJson) {
					this.emitFile({
						type: 'asset',
						fileName: `${blockKey}/${WORDPRESS_FILE_OUTPUT.BLOCK_JSON}`,
						source: JSON.stringify(
							JSON.parse(readFileSync(blockJsonPath, 'utf8')),
							null,
							2
						),
					});
				}

				// Add script entries to manifest based on what exists in the bundle
				const indexKey = `${blockKey}/index`;
				const viewKey = `${blockKey}/view`;
				const styleKey = `${blockKey}/style-index`;

				if (bundle[indexKey + '.js']) {
					manifest[blockKey].editorScript = `${blockKey}/${WORDPRESS_FILE_OUTPUT.EDITOR_SCRIPT}`;
				}

				if (bundle[viewKey + '.js']) {
					manifest[blockKey].viewScript = `${blockKey}/${WORDPRESS_FILE_OUTPUT.VIEW_SCRIPT}`;
				}

				if (bundle[styleKey + '.css']) {
					manifest[blockKey].style = `${blockKey}/${WORDPRESS_FILE_OUTPUT.STYLE}`;
				}
			});
		}

		// Emit manifest.json
		this.emitFile({
			type: 'asset',
			fileName: 'manifest.json',
			source: JSON.stringify(manifest, null, 2),
		});
	};
}
