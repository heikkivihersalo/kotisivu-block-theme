/**
 * SrcSet component
 * @param {Object} props Component properties
 * @return {JSX.Element} SrcSet component
 */
const SrcSet = (props) => {
	const {
		attributes: {
			className,
			mediaSrcSet,
			mediaSrcSizes,
			mediaUrl,
			mediaAlt,
			mediaWidth,
			mediaHeight,
			lazyLoad,
		},
	} = props;
	return (
		<img
			loading={`${lazyLoad ? 'lazy' : 'eager'}`}
			className={className}
			srcSet={mediaSrcSet}
			sizes={mediaSrcSizes}
			src={mediaUrl}
			alt={mediaAlt}
			width={`${mediaWidth ? `${mediaWidth}px` : ''}`}
			height={`${mediaHeight ? `${mediaHeight}px` : ''}`}
		/>
	);
};

export default SrcSet;
