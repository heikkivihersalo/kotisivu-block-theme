/**
 * Internal dependencies
 */
import type { ImageAttributes } from '@components/media';

/**
 * Image component
 * @param {Object} props
 * @param {ImageAttributes} props.attributes Block attributes
 * @return {JSX.Element} Image source set element
 */
const ImageDefault = ({
	attributes,
}: {
	attributes: Omit<
		ImageAttributes,
		'mediaId' | 'mediaMime' | 'mediaSrcSet' | 'mediaSrcSizes'
	>;
}): JSX.Element => {
	const { mediaUrl, mediaAlt, mediaWidth, mediaHeight, lazyLoad } =
		attributes;

	return (
		<img
			loading={`${lazyLoad ? 'lazy' : 'eager'}`}
			src={mediaUrl}
			alt={mediaAlt}
			width={`${mediaWidth ? `${mediaWidth}px` : ''}`}
			height={`${mediaHeight ? `${mediaHeight}px` : ''}`}
		/>
	);
};

export default ImageDefault;
