/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save()
	);

	return <div {...innerBlocksProps} />;
}
