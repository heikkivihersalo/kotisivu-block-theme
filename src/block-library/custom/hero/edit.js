/**
 * WordPress dependencies
 */
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
import { getBlockStyles } from '@utils';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @return {JSX.Element} React component
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

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(blockClass),
		style: getBlockStyles({ style }),
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId,
		template,
		templateLock,
		blockProps
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
			<section {...innerBlocksProps} />
		</>
	);
};
