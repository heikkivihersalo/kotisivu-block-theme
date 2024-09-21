/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { VideoAttributes } from '@components/media';

/**
 * Controllers for gap
 *
 * @param {Object} props Block props
 * @param {Object} props.attributes Gutenberg block attributes
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const VideoControlButtons = ({
	attributes,
	setAttributes,
}: {
	attributes: Extract<VideoAttributes, { mediaId: number }>;
	setAttributes: (attributes: VideoAttributes) => void;
}): JSX.Element => {
	const { mediaId } = attributes;

	return (
		<div
			style={{
				display: 'flex',
				gap: '1rem',
				justifyContent: 'flex-start',
				marginTop: '1rem',
			}}
		>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) =>
						setAttributes({
							mediaId: media.id,
							mediaUrl: media.url,
							mediaAlt: media.alt,
							mediaMime: media.mime,
							mediaWidth: media.width,
							mediaHeight: media.height,
						})
					}
					allowedTypes={['video']}
					value={mediaId}
					render={({ open }) => (
						<Button onClick={open} isDefault>
							{__('Change video', 'kotisivu-block-theme')}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			<MediaUploadCheck>
				<Button
					onClick={() =>
						setAttributes({
							mediaId: 0,
							mediaUrl: '',
							mediaAlt: '',
							mediaMime: '',
							mediaWidth: undefined,
							mediaHeight: undefined,
						})
					}
					isLink
					isDestructive
				>
					{__('Remove video', 'kotisivu-block-theme')}
				</Button>
			</MediaUploadCheck>
		</div>
	);
};

export default VideoControlButtons;
