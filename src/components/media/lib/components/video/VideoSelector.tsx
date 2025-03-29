/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import type { VideoAttributes } from '@components/media';
import { VideoPreview } from './VideoPreview.tsx';

/**
 * Video selector component
 * @param {Object} props
 * @param {VideoAttributes} props.attributes Block attributes
 * @param {Function} props.setAttributes Callback function
 * @return {JSX.Element} Video selector element
 */
const VideoSelector = ({
	attributes,
	setAttributes,
}: {
	attributes: Extract<VideoAttributes, { mediaId: number }>;
	setAttributes: (attributes: VideoAttributes) => void;
}): JSX.Element => {
	const { mediaId } = attributes;

	return (
		<div className="editor-post-featured-image">
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) => {
						setAttributes({
							mediaId: media.id,
							mediaUrl: media.url,
							mediaAlt: media.alt,
							mediaMime: media.mime,
							mediaWidth: media.width,
							mediaHeight: media.height,
						});
					}}
					allowedTypes={['video']}
					value={mediaId}
					render={({ open }) => (
						<VideoPreview
							attributes={attributes}
							callbackFn={open}
						/>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
};

export default VideoSelector;
