/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@features/inspector';
import metadata from './block.json';
import { VariationPicker, getBlockVariations } from "@features/variations";

/**
 * Styles
 */
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			variationName,
			blockClass,
			template,
			templateLock,
		},
		clientId,
		setAttributes
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: blockClass
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId: clientId,
		template: template,
		templateLock: templateLock,
		blockProps: blockProps
	});

	/**
	 * Get variations
	 */
	const blockVariations = getBlockVariations(metadata.name);

	/* If variation isn't selected, render variation select screen */
	if (!variationName) {
		return (
			<VariationPicker
				setAttributes={setAttributes}
				blockVariations={blockVariations}
			/>
		)
	}

	return (
		<>
			<ul {...innerBlocksProps} />
		</>
	);
};

export default Edit;