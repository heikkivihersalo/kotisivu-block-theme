/**
 * WordPress dependencies
 */
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getImage, setImage } from '../../utilities/index';

/**
 * Button component for image block
 * @param {Object} props Component properties
 * @return {JSX.Element} Button component
 */
const Button = (props) => {
	const {
		attributes: { mediaId },
	} = props;

	return (
		<>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) => setImage(media, props)}
					allowedTypes="image"
					value={mediaId}
					render={({ open }) => getImage(props, open)}
				/>
			</MediaUploadCheck>
		</>
	);
};

export default Button;
