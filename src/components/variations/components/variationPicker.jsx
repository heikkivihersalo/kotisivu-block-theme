/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import {__experimentalBlockVariationPicker as BlockVariationPicker} from '@wordpress/block-editor';
import {getAttributesFromProps} from '../utils';

const VariationPicker = ({setAttributes, blockVariations}) => {
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
};

export {VariationPicker};
