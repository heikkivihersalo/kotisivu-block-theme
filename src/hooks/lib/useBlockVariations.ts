/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

import type { BlockVariation } from '@hooks';

/**
 * Get block variations
 * @param {string} blockName
 * @return {Array} blockVariations
 */
function useBlockVariations(blockName: string): BlockVariation[] {
	return useSelect(
		(select: any) => {
			const { getBlockVariations } = select(blocksStore);
			return getBlockVariations(blockName, 'block');
		},
		[blockName]
	);
}

export { useBlockVariations };
