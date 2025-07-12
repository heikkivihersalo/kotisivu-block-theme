import { resolve, dirname, basename } from 'path';
import { readFileSync, existsSync } from 'fs';
import { getBlockJsonFiles } from '../blocks/index.js';

/**
 * Generates bundle files for blocks including block.json and render.php
 * @param {string} blocksDir - Directory containing blocks
 * @param {boolean} copyBlockJson - Whether to copy block.json files
 * @returns {Function} Generate bundle function for Vite plugin
 */
export function createBundleGenerator(blocksDir, copyBlockJson = true) {
	return function generateBundle(options, bundle) {
		if (!copyBlockJson) return;

		// Copy block.json files to output directory
		const blockJsonFiles = getBlockJsonFiles(blocksDir);

		blockJsonFiles.forEach((blockJsonPath) => {
			const blockDir = dirname(blockJsonPath);
			const blockName = basename(blockDir);
			const blockJsonContent = readFileSync(blockJsonPath, 'utf8');

			// Add block.json to bundle
			this.emitFile({
				type: 'asset',
				fileName: `${blockName}/block.json`,
				source: blockJsonContent,
			});

			// Copy render.php if it exists
			const renderPhpPath = resolve(blockDir, 'render.php');
			if (existsSync(renderPhpPath)) {
				const renderPhpContent = readFileSync(renderPhpPath, 'utf8');
				this.emitFile({
					type: 'asset',
					fileName: `${blockName}/render.php`,
					source: renderPhpContent,
				});
			}
		});
	};
}
