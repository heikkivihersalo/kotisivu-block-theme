import { resolve, dirname, basename } from 'path';
import { readFileSync, existsSync } from 'fs';
import { getBlockJsonFiles } from '../utils/index.js';
import { WORDPRESS_FILES } from '../../constants.js';

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
				fileName: `${blockName}/${WORDPRESS_FILES.BLOCK_JSON.output}`,
				source: blockJsonContent,
			});

			// Copy render.php if it exists
			const renderPhpPath = resolve(
				blockDir,
				WORDPRESS_FILES.RENDER_PHP.input
			);
			if (existsSync(renderPhpPath)) {
				const renderPhpContent = readFileSync(renderPhpPath, 'utf8');
				this.emitFile({
					type: 'asset',
					fileName: `${blockName}/${WORDPRESS_FILES.RENDER_PHP.output}`,
					source: renderPhpContent,
				});
			}
		});
	};
}
