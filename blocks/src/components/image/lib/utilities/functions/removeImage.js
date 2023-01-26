import { __ } from "@wordpress/i18n";

/**
 * Remove attributes from the given element
 * @param {*} props 
 */
const removeImage = (props) => (event) => {
    props.setAttributes({
        mediaUrl: '',
        mediaId: 0,
        mediaAlt: '',
        mediaMime: '',
        mediaWidth: '',
        mediaHeight: '',
        mediaSrcset: '',
        sizes: []
    })
}

export { removeImage }
