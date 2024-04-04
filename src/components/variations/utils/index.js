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
		style: variation.attributes?.style,
	};
};
