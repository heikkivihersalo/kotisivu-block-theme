/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@/shared/components/inner-blocks';
import { VariationPicker } from '@components/variations';
import { classnames } from '@/shared/utils';
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
	const { blockClass, template, templateLock, allowedBlocks, variationName } =
		attributes;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames('splide__list', blockClass),
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
			<ul {...innerBlocksProps} />
		</>
	);
}
