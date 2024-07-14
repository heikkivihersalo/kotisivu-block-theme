/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getBlockStyles } from '@utils';

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save({ attributes }: Record<string, any>): JSX.Element {
	const { blockClass, ariaLabel, ariaLabelledBy, style } = attributes;

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
