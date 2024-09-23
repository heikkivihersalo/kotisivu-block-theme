/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Image from './components/Image';
import type { BlockAttributes } from './types';

type Props = {
	attributes: BlockAttributes;
};

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Object} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save({ attributes }: Props): JSX.Element {
	const { images, blockClass } = attributes;

	const blockProps = useBlockProps.save({
		className: `image-gallery ${blockClass}`,
	});

	return (
		<div {...blockProps}>
			{images.map((image) => (
				<Image key={image.mediaId} image={image} />
			))}
		</div>
	);
}
