/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps
} from "@wordpress/block-editor";
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { InnerBlocksAppender } from '@components/inspector';
import Inspector from "./components/Inspector.jsx";
import { VariationPicker, getBlockVariations } from "@components/variations";
import { getBlockStyles, getIsReversedClass } from '@utils';

/**
 * Styles
 */
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			blockClass,
			template,
			templateLock,
			style,
			variationName,
			isReversed
		},
		setAttributes,
		clientId
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(blockClass, getIsReversedClass(isReversed)),
		style: getBlockStyles({ style })
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
			<div {...innerBlocksProps} />
		</>
	);
};

export default Edit;