/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { removeImageAttributes, setImageAttributes } from '../../utilities';

type Props = {
	attributes: BlockJSON_Image;
	setAttributes: (attributes: BlockJSON_Image) => void;
};

/**
 * Image control buttons
 * @param {Object} props Block props
 * @param {Object} props.attributes Gutenberg block attributes
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const ImageControlButtons = ({
	attributes,
	setAttributes,
}: Props): JSX.Element => {
	return (
		<div>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) =>
						setImageAttributes(media, setAttributes)
					}
					allowedTypes={['image']}
					value={attributes.mediaId}
					render={({ open }) => (
						<Button onClick={open} isDefault>
							{__('Change image', 'kotisivu-block-theme')}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			<MediaUploadCheck>
				<Button
					onClick={() => removeImageAttributes(setAttributes)}
					isLink
					isDestructive
				>
					{__('Remove image', 'kotisivu-block-theme')}
				</Button>
			</MediaUploadCheck>
		</div>
	);
};

export default ImageControlButtons;
