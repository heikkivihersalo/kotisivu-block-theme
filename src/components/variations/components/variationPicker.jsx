/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalBlockVariationPicker as BlockVariationPicker } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { useBlockVariations } from '@hooks';

/**
 * Build attributes from variation props
 * @param {Object} variation
 * @return {Object} attributes
 */
function getAttributesFromProps(variation) {
	return {
		variationName: variation?.name,
		template: variation?.innerBlocks,
		childTemplate: variation.attributes?.childTemplate,
		blockClass: variation.attributes?.blockClass,
		style: variation.attributes?.style,
	};
}

/**
 * Variation picker component
 * @param {Object} props Component properties
 * @param {string} props.blockName Block name
 * @param {Function} props.setAttributes Set attributes function
 * @return {JSX.Element} Variation picker component
 */
function VariationPicker({ blockName, setAttributes }) {
	const blockVariations = useBlockVariations(blockName);

	if (!blockVariations) {
		return null;
	}

	const handleSelect = (variation) => {
		setAttributes(getAttributesFromProps(variation));
	};

	return (
		<>
			<BlockVariationPicker
				label={__('Choose variation', 'kotisivu-block-theme')}
				instructions={__(
					'Select a block variation to start with.',
					'kotisivu-block-theme'
				)}
				onSelect={handleSelect}
				variations={blockVariations}
			/>
		</>
	);
}

export { VariationPicker };
