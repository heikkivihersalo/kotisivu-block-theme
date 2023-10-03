import Img from './common/img';
import SrcSet from './common/srcset';

/**
 * Get image markup
 * @param {*} props 
 * @returns 
 */
const ImageMarkup = ({ attributes: { mediaMime }, srcset, img }) => {

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
    return (
        mediaMime === "image/svg+xml"
            ? <Img {...props} />
            : <SrcSet {...props} />
    );
}

export { ImageMarkup }

