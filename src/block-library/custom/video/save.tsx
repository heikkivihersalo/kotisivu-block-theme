/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { VideoMarkup } from '@components/media';

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save({ attributes }: Record<string, any>): JSX.Element {
	const { blockClass } = attributes;

	const blocksProps = useBlockProps.save({
		className: blockClass,
	});

	return (
		<VideoMarkup
			blockProps={blocksProps}
			attributes={{
				mediaUrl: attributes.mediaUrl,
				mediaWidth: attributes.mediaWidth,
				mediaHeight: attributes.mediaHeight,
				mediaMime: attributes.mediaMime,
			}}
		/>
	);
}
