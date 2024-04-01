/**
 * Settings
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
} from "@wordpress/block-editor";
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@features/inspector';
import { VariationPicker, getBlockVariations } from "@features/variations";
import { getBlockStyles } from '@utils';

/**
 * Components
 */
import Inspector from "./components/Inspector.jsx";

/**
 * Styles
 */
import './editor.css';

/**
 * Block edit function
 * @param {Object} props - block props
 * @returns {Object} - React component
 */
export default function Edit(props) {
	const {
		attributes: {
			blockClass,
			ariaLabel,
			ariaLabelledBy,
			template,
			templateLock,
			style,
			variationName
		},
		setAttributes,
		clientId
	} = props;

	//
	// Set block props
	//
	const blockProps = useBlockProps({
		className: classnames(blockClass),
		style: getBlockStyles({ style }),
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId: clientId,
		template: template,
		templateLock: templateLock,
		blockProps: blockProps
	});

	//
	// Get variations
	//
	const blockVariations = getBlockVariations(metadata.name);

	// If variation isn't selected, render variation select screen
	if (!variationName) {
		return (
			<VariationPicker
				setAttributes={setAttributes}
				blockVariations={blockVariations}
			/>
		)
	}

	//
	// Return block edit view
	//
	return (
		<>
			<Inspector {...props} />
			<section {...innerBlocksProps} />
		</>
	);
};
