/**
 * Internal dependencies
 */
import type { ImageAttributes } from '@components/media';

/**
 * Image source set component
 * @param {Object} props
 * @param {ImageAttributes} props.attributes Block attributes
 * @return {JSX.Element} Image source set element
 */
const ImageSourceSet = ({
	attributes,
}: {
	attributes: Omit<ImageAttributes, 'mediaId' | 'mediaMime' | 'mediaSrc'>;
}): JSX.Element => {
	const {
		mediaUrl,
		mediaAlt,
		mediaWidth,
		mediaHeight,
		lazyLoad,
		mediaSrcSet,
		mediaSrcSizes,
	} = attributes;

	return (
		<img
			loading={`${lazyLoad ? 'lazy' : 'eager'}`}
			srcSet={mediaSrcSet}
			sizes={mediaSrcSizes}
			src={mediaUrl}
			alt={mediaAlt}
			width={`${mediaWidth ? `${mediaWidth}px` : ''}`}
			height={`${mediaHeight ? `${mediaHeight}px` : ''}`}
		/>
	);
};

export default ImageSourceSet;
