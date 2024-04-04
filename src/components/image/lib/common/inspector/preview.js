/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { removeImage, setImage } from '../../utilities/index';
import Lazyload from './lazyLoad';

/**
 * Preview component for image block
 * @param {Object} props Component properties
 * @return {JSX.Element} Preview component
 */
const Preview = (props) => {
	const {
		attributes: { mediaId },
	} = props;

	return (
		<div className="image-block-buttons">
			<div className="image-block-buttons__update">
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(media) => setImage(media, props)}
						allowedTypes="image"
						value={mediaId}
						render={({ open }) => (
							<Button onClick={open} isDefault isLarge>
								{__('Change image', 'kotisivu-block-theme')}
							</Button>
						)}
					/>
				</MediaUploadCheck>
				<MediaUploadCheck>
					<Button onClick={removeImage(props)} isLink isDestructive>
						{__('Remove image', 'kotisivu-block-theme')}
					</Button>
				</MediaUploadCheck>
			</div>
			<Lazyload {...props} />
		</div>
	);
};

export default Preview;
