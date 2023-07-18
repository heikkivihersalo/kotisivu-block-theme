/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls
} from "@wordpress/block-editor";
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { InnerBlocksAppender } from '@features/inspector';
import Inspector from "./components/Inspector.jsx";
import { VariationPicker, getBlockVariations } from "@features/variations";
import { getBlockSyles, getIsReversedClass } from '@utils';

/**
 * Styles
 */
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			ariaLabel,
			ariaLabelledBy,
			blockClass,
			template,
			templateLock,
			style,
			isReversed,
			variationName
		},
		setAttributes,
		clientId
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(blockClass, getIsReversedClass(isReversed)),
		style: getBlockSyles({ style }),
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
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

	/**
	 * Return block edit view
	 */
	return (
		<>
			<Inspector {...props} />
			<aside {...innerBlocksProps} />
		</>
	);
};

export default Edit;