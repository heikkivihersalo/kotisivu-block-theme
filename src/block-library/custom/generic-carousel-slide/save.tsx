/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save({ attributes }: Record<string, any>): JSX.Element {
	const { blockClass } = attributes;

	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: blockClass,
		})
	);

	return <li {...innerBlocksProps} />;
}
