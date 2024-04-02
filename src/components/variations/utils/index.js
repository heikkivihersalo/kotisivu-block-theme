import {
    store as blocksStore,
} from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * Get block variations
 * @param {string} blockName
 * @return {Array} blockVariations
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
 * @param {Object} variation
 * @return {Object} attributes
 */
export const getAttributesFromProps = (variation) => {
    return {
        variationName: variation?.name,
        template: variation?.innerBlocks,
        childTemplate: variation.attributes?.childTemplate,
        blockClass: variation.attributes?.blockClass,
        style: variation.attributes?.style
    }
}
