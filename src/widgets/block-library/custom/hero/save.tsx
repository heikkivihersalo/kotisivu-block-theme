/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getBlockStyles, classnames } from '@/shared/utils';
import type { BlockProps } from './types';

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save({ attributes }: BlockProps): JSX.Element {
	const { blockClass, ariaLabel, ariaLabelledBy, style } = attributes;

	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: classnames(blockClass),
			style: getBlockStyles(style),
			'aria-label': ariaLabel ? ariaLabel : null,
			'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null,
		})
	);

	return <section {...innerBlocksProps} />;
}
