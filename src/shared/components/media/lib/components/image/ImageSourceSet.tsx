/**
 * Internal dependencies
 */
type Props = {
	attributes: Omit<BlockJSON_Image, 'mediaId' | 'mediaMime' | 'mediaSrc'>;
};

/**
 * Image source set component
 * @param {Object} props
 * @param {ImageAttributes} props.attributes Block attributes
 * @return {JSX.Element} Image source set element
 */
const ImageSourceSet = ({ attributes }: Props): JSX.Element => {
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
