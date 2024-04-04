import Img from './common/img';
import SrcSet from './common/srcset';

/**
 * Get image markup
 * @param {Object} props Image properties
 * @return {JSX.Element} Image markup
 */
const ImageMarkup = (props) => {
	const {
		attributes: { mediaMime },
		srcset,
		img,
	} = props;

	/**
	 * Force desired image format
	 */
	if (srcset) return <SrcSet {...props} />;

	/**
	 *
	 */
	if (img) return <Img {...props} />;

	/**
	 * Load default behaviour
	 */
	return mediaMime === 'image/svg+xml' ? (
		<Img {...props} />
	) : (
		<SrcSet {...props} />
	);
};

export { ImageMarkup };
