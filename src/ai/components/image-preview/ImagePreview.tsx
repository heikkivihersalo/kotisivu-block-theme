/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ImagePreviewItem from './ImagePreviewItem';
import { ChatGPTImage } from '@ai/api';

/**
 * Image preview component
 * @param {Object} props - Component props
 * @param {ChatGPTImage[]} props.preview - Image preview
 * @return {JSX.Element} Image preview component
 */
const ImagePreview = ({
	preview,
}: {
	preview: ChatGPTImage[] | null;
}): JSX.Element | null => {
	if (!preview) {
		return null;
	}

	return (
		<div>
			{preview.map((image, index) => (
				<ImagePreviewItem
					key={index}
					src={`data:image/jpeg;base64,${image.b64_json}`}
				/>
			))}
		</div>
	);
};

export default ImagePreview;
