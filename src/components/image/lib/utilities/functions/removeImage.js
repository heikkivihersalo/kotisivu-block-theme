/**
 * Reset image attributes
 * @param {*} props
 */
const resetImageAttributes = (props) => (event) => {
    const defaultAttributes = {
        mediaUrl: '',
        mediaId: 0,
        mediaAlt: '',
        mediaMime: '',
        mediaWidth: '',
        mediaHeight: '',
        mediaSrcset: '',
        sizes: []
    };
    props.setAttributes(defaultAttributes);
}

export { resetImageAttributes as removeImage }
