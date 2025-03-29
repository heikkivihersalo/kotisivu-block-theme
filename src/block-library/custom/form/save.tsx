/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getBlockStyles, classnames } from '@utils';

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save({ attributes }: Record<string, any>): JSX.Element {
	const { blockClass, style, ariaLabel, ariaLabelledBy } = attributes;

	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: classnames(blockClass),
			style: getBlockStyles(style),
			'aria-label': ariaLabel ? ariaLabel : null,
			'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null,
		} as Record<string, any>)
	);

	return <section {...innerBlocksProps} />;
}
