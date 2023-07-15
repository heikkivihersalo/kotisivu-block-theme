import {
    store as blocksStore,
} from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * Get block variations
 * @param {string} blockName
 * @returns {array} blockVariations
 */
export const getBlockVariations = (blockName) => {
    return useSelect(
        (select) => {
            const { getBlockVariations } = select(blocksStore);
            return getBlockVariations(blockName, 'block');
        },
        [blockName]
    )
}

/**
 * Build attributes from variation props
 * @param {object} variation
 * @returns {object} attributes
 */
export const getAttributesFromProps = (variation) => {
    return {
        variationName: variation.name,
        template: variation.innerBlocks,
        blockClass: variation.attributes.blockClass
    }
}
