import { glob } from 'glob';

/**
 * Get all block.json files for bundle generation
 * @param {string} blocksDir - Directory to search for blocks
 * @returns {Array} Array of block.json file paths
 */
export function getBlockJsonFiles(blocksDir) {
	return glob.sync(`${blocksDir}/**/block.json`);
}
