import { __ } from "@wordpress/i18n";
import { ImageMarkup } from '@components/image';
import { Button } from "@wordpress/components";
import placeholder from '../../../placeholder.png';

/**
 * Get image markup for block
 * @param {Object} props Block properties
 * @param {PointerEvent} eventCallback Event callback
 * @return {JSX.Element} Image markup
 */
const getImage = (props, eventCallback) => {
    const {
        className,
        mediaUrl,
        mediaAlt,
        mediaMime
    } = props.attributes;

    /**
     *  If no image is selected, return 'upload image' button
     */
    if (!mediaUrl) {
        return (
            <div className="button-container" >
                <Button onClick={eventCallback} className="button button-large">
                    {__('Pick a image', 'kotisivu-block-theme')}
                </Button>
                <img className="image-placeholder" src={placeholder} alt={mediaAlt} />
            </div>
        );
    }

    /**
     * If image is svg, return correct markup for svg image
     */
    if (mediaMime === "image/svg+xml") {
        return <img className={className} src={mediaUrl} alt={mediaAlt} />
    }

    /**
     * Return markup for image element
     */
    return (<ImageMarkup {...props} />);
}

export { getImage }

