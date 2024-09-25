/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@components/inner-blocks';
import { VariationPicker } from '@components/variations';
import { getBlockStyles, classnames } from '@utils';

import Inspector from './components/Inspector';

import metadata from './block.json';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @param {Function} props.setAttributes Block attributes setter
 * @param {string} props.clientId Block client ID
 * @return {JSX.Element} React component
 */
export default function Edit({
	attributes,
	setAttributes,
	clientId,
}: {
	attributes: Record<string, any>;
	setAttributes: (newAttributes: Record<string, any>) => void;
	clientId: string;
}): JSX.Element {
	const {
		blockClass,
		ariaLabel,
		ariaLabelledBy,
		template,
		templateLock,
		style,
		variationName,
	} = attributes;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(blockClass),
		style: getBlockStyles(style),
		'aria-label': ariaLabel ? ariaLabel : undefined,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : undefined,
	} as Record<string, any>);

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
			<Inspector attributes={attributes} setAttributes={setAttributes} />
			<section {...innerBlocksProps} />
		</>
	);
}
