import { glob } from 'glob';
import { BLOCK_PATTERNS } from '../../../constants.js';

/**
 * Get all block.json files for bundle generation
 * @param {string} blocksDir - Directory to search for blocks
 * @returns {Array} Array of block.json file paths
 */
export function getBlockJsonFiles(blocksDir) {
	return glob.sync(`${blocksDir}/${BLOCK_PATTERNS.BLOCK_JSON}`);
}
