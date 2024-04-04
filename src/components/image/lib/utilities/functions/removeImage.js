/**
 * Reset image attributes
 * @param {Object} props Block properties
 * @return {Function} Function to reset image attributes
 */
const resetImageAttributes = (props) => () => {
	const defaultAttributes = {
		mediaUrl: '',
		mediaId: 0,
		mediaAlt: '',
		mediaMime: '',
		mediaWidth: '',
		mediaHeight: '',
		mediaSrcset: '',
		sizes: [],
	};
	props.setAttributes(defaultAttributes);
};

export { resetImageAttributes as removeImage };
