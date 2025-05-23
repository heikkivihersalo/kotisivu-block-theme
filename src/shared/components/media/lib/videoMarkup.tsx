/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
type Props = {
	attributes: Omit<BlockJSON_Video, 'mediaId' | 'mediaAlt'>;
	blockProps?: Record<string, any>;
};

/**
 * Markup for video element. Uses the following variables for styling:
 * --_video-width (default: 100%)
 * --_video-height (default: auto)
 * --_video-max-width (default: 100%)
 * @param {Object} props Block attributes
 * @param {Omit<VideoAttributes, 'mediaId'>} props.attributes Video attributes
 * @param {Record<string, any>} props.blockProps Block properties
 * @return {JSX.Element} Video element
 */
const VideoMarkup = ({ attributes, blockProps = {} }: Props): JSX.Element => {
	const { mediaUrl, mediaWidth, mediaHeight, mediaMime } = attributes;

	return (
		<video
			{...blockProps}
			style={{
				width: 'var(--_video-width, 100%)',
				height: 'var(--_video-height, auto)',
				maxWidth: 'var(--_video-max-width, 100%)',
				display: 'block',
				margin: '0 auto',
				objectFit: 'cover',
				objectPosition: 'center center',
			}}
			width={mediaWidth}
			height={mediaHeight}
			autoPlay
			muted
			loop
		>
			<source src={mediaUrl} type={mediaMime} />
			{__(
				"Sorry, your browser doesn't support embedded videos.",
				'kotisivu-block-theme'
			)}
		</video>
	);
};

export { VideoMarkup };
