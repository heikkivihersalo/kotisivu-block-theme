/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save({ attributes }: Record<string, any>): JSX.Element {
	const { blockClass } = attributes;

	const blockProps = useBlockProps.save({
		className: blockClass,
	} as Record<string, any>);

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
