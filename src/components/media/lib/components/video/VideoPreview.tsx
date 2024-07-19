/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { VideoMarkup } from '@components/media';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { VideoAttributes } from '@components/media';
// @ts-ignore
import placeholder from '../../assets/placeholder.png';

/**
 * Video preview component
 * @param {Object} props
 * @param {VideoAttributes} props.attributes Block attributes
 * @param {Function} props.callbackFn Callback function
 * @return {JSX.Element} Video preview element
 */
const VideoPreview = ({
	attributes,
	callbackFn,
}: {
	attributes: Extract<VideoAttributes, { mediaId: number }>;
	callbackFn: () => void;
}): JSX.Element => {
	/**
	 *  If no video is selected, return 'upload video' button
	 */
	if (!attributes.mediaUrl) {
		return (
			<div
				style={{
					display: 'grid',
					placeItems: 'center',
				}}
			>
				<Button
					onClick={callbackFn}
					className="button button-large"
					style={{
						gridArea: '1/1',
						zIndex: 1,
					}}
				>
					{__('Pick a video', 'kotisivu-block-theme')}
				</Button>
				<img
					style={{
						gridArea: '1/1',
					}}
					className="image-placeholder"
					src={placeholder}
				/>
			</div>
		);
	}

	/**
	 * Return markup for image element
	 */
	return <VideoMarkup attributes={attributes} />;
};

export { VideoPreview };
