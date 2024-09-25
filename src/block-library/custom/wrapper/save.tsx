/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getBlockStyles, getIsReversedClass, classnames } from '@utils';

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save({ attributes }: Record<string, any>): JSX.Element {
	const { blockClass, style, isReversed } = attributes;

	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: classnames(blockClass, getIsReversedClass(isReversed)),
			style: getBlockStyles(style),
		} as Record<string, any>)
	);

	return <div {...innerBlocksProps} />;
}
