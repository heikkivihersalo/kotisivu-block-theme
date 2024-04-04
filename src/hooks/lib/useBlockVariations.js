/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * Get block variations
 * @param {string} blockName
 * @return {Array} blockVariations
 */
// TODO: Refactor this to React standards
function useBlockVariations(blockName) {
	return useSelect(
		(select) => {
			const { getBlockVariations } = select(blocksStore);
			return getBlockVariations(blockName, 'block');
		},
		[blockName]
	);
}

export { useBlockVariations };
