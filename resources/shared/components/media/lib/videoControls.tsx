/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import VideoSelector from './components/video/VideoSelector';
import VideoControlButtons from './components/video/VideoControlButtons';

type Props = {
	attributes: BlockJSON_Video;
	setAttributes: (attributes: BlockJSON_Video) => void;
};

/**
 * Video controls for block
 * @param {Object} props
 * @param {VideoAttributes} props.attributes Gutenberg block attributes
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} Video controls
 */
const VideoControls = ({ attributes, setAttributes }: Props): JSX.Element => {
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
