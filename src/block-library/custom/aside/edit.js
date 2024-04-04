/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@components/inspector';
import { VariationPicker } from '@components/variations';
import { getBlockStyles, getIsReversedClass } from '@utils';

import Inspector from './components/Inspector.jsx';

import metadata from './block.json';
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
			variationName,
			isReversed,
		},
		setAttributes,
		clientId,
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(blockClass, getIsReversedClass(isReversed)),
		style: getBlockStyles({ style }),
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null,
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId,
		template,
		templateLock,
		blockProps,
	});

	/* If variation isn't selected, render variation select screen */
	if (!variationName) {
		return (
			<VariationPicker
				blockName={metadata.name}
				setAttributes={setAttributes}
			/>
		);
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
}
