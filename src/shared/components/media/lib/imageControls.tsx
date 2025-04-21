/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import ImageControlButtons from './components/image/ImageControlButtons';
import ImagePreview from './components/image/ImagePreview';
import { setImageAttributes } from './utilities';

type Props = {
	attributes: BlockJSON_Image;
	setAttributes: (attributes: BlockJSON_Image) => void;
};

/**
 * Image selector component
 * @param {Object} props
 * @param {ImageAttributes} props.attributes Block attributes
 * @param {Function} props.setAttributes Callback function
 * @return {JSX.Element} Image selector element
 */
const ImageControls = ({ attributes, setAttributes }: Props): JSX.Element => {
	const { mediaId, mediaUrl } = attributes;

	return (
		<>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) =>
						setImageAttributes(media, setAttributes)
					}
					allowedTypes={['image']}
					value={mediaId}
					render={({ open }) => (
						<ImagePreview
							attributes={attributes}
							callbackFn={open}
						/>
					)}
				/>
			</MediaUploadCheck>
			{mediaUrl && (
				<ImageControlButtons
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			)}
		</>
	);
};

export { ImageControls };
