/**
 * Internal dependencies
 */
import type { BlockJSON_ImageAttributes } from '@components/media';

type Props = {
	image: BlockJSON_ImageAttributes;
};

/**
 * Individual Image Component
 * @param {Object} props - Image props
 * @param {Object} props.image - Image object
 * @return {JSX.Element} Image component
 */
function Image({ image }: Props): JSX.Element {
	return (
		<img
			data-id={image.mediaId}
			loading={`${image.lazyLoad ? 'lazy' : 'eager'}`}
			className="image-gallery__image"
			src={image.mediaUrl}
			alt={image.mediaAlt}
			width={image.mediaWidth}
			height={image.mediaHeight}
		/>
	);
}

export default Image;
