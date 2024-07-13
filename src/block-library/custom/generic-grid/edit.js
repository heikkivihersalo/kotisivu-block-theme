/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@components/inner-blocks';
import { VariationPicker } from '@components/variations';
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
			template,
			templateLock,
			allowedBlocks,
			variationName,
		},
		clientId,
		setAttributes,
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: blockClass,
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId,
		template,
		templateLock,
		blockProps,
		allowedBlocks,
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
			<div {...innerBlocksProps} />
		</>
	);
}
