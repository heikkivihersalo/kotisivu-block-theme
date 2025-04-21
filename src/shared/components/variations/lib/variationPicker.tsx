/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/* eslint-disable @wordpress/no-unsafe-wp-apis */
// @ts-ignore
import { __experimentalBlockVariationPicker as BlockVariationPicker } from '@wordpress/block-editor';
/* eslint-enable @wordpress/no-unsafe-wp-apis */

/**
 * Internal dependencies
 */
import { useBlockVariations } from '@/shared/hooks';
import type { BlockVariation } from '@wordpress/blocks';

type Props = {
	blockName: string;
	setAttributes: (newAttributes: Record<string, any>) => void;
};

/**
 * Build attributes from variation props
 * @param {Object} variation
 * @return {Object} attributes
 */
function getAttributesFromProps(variation: BlockVariation) {
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
function VariationPicker({
	blockName,
	setAttributes,
}: Props): JSX.Element | null {
	const blockVariations = useBlockVariations(blockName);

	if (!blockVariations) {
		return null;
	}

	return (
		<>
			<BlockVariationPicker
				label={__('Choose variation', 'kotisivu-block-theme')}
				instructions={__(
					'Select a block variation to start with.',
					'kotisivu-block-theme'
				)}
				onSelect={(variation: BlockVariation) => {
					setAttributes(getAttributesFromProps(variation));
				}}
				variations={blockVariations}
			/>
		</>
	);
}

export { VariationPicker };
