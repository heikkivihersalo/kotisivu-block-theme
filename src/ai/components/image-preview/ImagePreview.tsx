/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ImagePreviewItem from './ImagePreviewItem';
import type { Image } from '../../types';

/**
 * Form component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form children
 * @param {Function} props.onSubmit - Form submit handler
 * @return {JSX.Element} Form component
 */
const ImagePreview = ({
	preview,
}: {
	preview: Image[] | null;
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
