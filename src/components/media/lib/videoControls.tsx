/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { VideoAttributes } from '@components/media';

import VideoSelector from './components/video/VideoSelector';
import VideoControlButtons from './components/video/VideoControlButtons';

/**
 * Video controls for block
 * @param {Object} props
 * @param {VideoAttributes} props.attributes Gutenberg block attributes
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} Video controls
 */
const VideoControls = ({
	attributes,
	setAttributes,
}: {
	attributes: VideoAttributes;
	setAttributes: (attributes: VideoAttributes) => void;
}): JSX.Element => {
	return (
		<div>
			<VideoSelector
				attributes={attributes}
				setAttributes={setAttributes}
			/>
			{attributes?.mediaUrl && (
				<VideoControlButtons
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			)}
		</div>
	);
};

export { VideoControls };
