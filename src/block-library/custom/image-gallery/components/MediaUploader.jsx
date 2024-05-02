/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { Button } from '@wordpress/components';

/**
 * Block edit function
 * @param {Object} props Properties
 * @param {number[]} props.mediaIDs Media IDs
 * @param {Function} props.setAttributes Set attributes function
 * @return {JSX.Element} React component
 */
const MediaUploader = ({ mediaIDs, setAttributes }) => {
	const onSelect = (images) => {
		setAttributes({
			images: images.map((image) => {
				return {
					mediaID: image.id,
					mediaUrl: image.url,
					mediaALT: image.alt,
					mediaMime: image.mime,
					mediaWidth: `${image.sizes.full.width}px`,
					mediaHeight: `${image.sizes.full.height}px`,
					lazyLoad: 'lazy',
				};
			}),
		});
	};

	const ALLOWED_MEDIA_TYPES = ['image'];

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={onSelect}
				allowedTypes={ALLOWED_MEDIA_TYPES}
				value={mediaIDs}
				render={({ open }) => (
					<Button onClick={open} className="button button-large">
						{mediaIDs.length < 1
							? __('Upload/Select Images', 'kotisivu-block-theme')
							: __('Edit', 'kotisivu-block-theme')}
					</Button>
				)}
				gallery
				multiple
			/>
		</MediaUploadCheck>
	);
};

export default MediaUploader;
