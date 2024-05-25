/**
 * Individual Image Component
 * @param {Object} props - Image props
 * @param {Object} props.image - Image object
 * @param {string} props.imageClass - Image class
 * @return {JSX.Element} Image component
 */
const Img = ({ image, imageClass }) => {
	return (
		<img
			data-id={image.mediaID}
			loading={image.lazyLoad}
			className={imageClass}
			src={image.mediaUrl}
			alt={image.mediaAlt}
			width={image.mediaWidth}
			height={image.mediaHeight}
			type={image.mediaMime}
		/>
	);
};

export default Img;
