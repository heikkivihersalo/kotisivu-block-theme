/**
 * Internal dependencies
 */
type Props = {
	attributes: Omit<
		BlockJSON_Image,
		'mediaId' | 'mediaMime' | 'mediaSrcSet' | 'mediaSrcSizes'
	>;
};
/**
 * Image component
 * @param {Object} props
 * @param {ImageAttributes} props.attributes Block attributes
 * @return {JSX.Element} Image source set element
 */
const ImageDefault = ({ attributes }: Props): JSX.Element => {
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
