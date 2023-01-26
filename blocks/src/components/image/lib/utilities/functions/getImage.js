import { __ } from "@wordpress/i18n";
import { ImageMarkup } from '@common-components/image';
import {
    Button
} from "@wordpress/components";

import placeholder from '../../../../../../../assets/images/placeholder.png';

/**
 * Get image markup for block
 * @param {*} props 
 * @param {*} openEvent 
 * @returns 
 */
const getImage = (props, openEvent) => {
	const {
		attributes: {
			className,
			mediaUrl,
			mediaAlt,
            mediaMime
		},
	} = props;

    /**
     *  If no image is selected, return 'upload image' button
     */
    if (!mediaUrl) {
        return (
            <>
            <div className="button-container" >
                <Button onClick={openEvent} className="button button-large">
                    {__('Pick a image', 'kotisivu-block-theme')}
                </Button>
                <img class="image-placeholder" src={placeholder} />
            </div>
            </>
        );
    } 
    
    /**
     * If image is svg, return correct markup for svg image
     */
    if (mediaMime == "image/svg+xml") {
        return <img className={className} src={mediaUrl} alt={mediaAlt} />
    };


    /**
     * Return markup for image element
     */
    return (<ImageMarkup {...props} />);
}

export { getImage }
