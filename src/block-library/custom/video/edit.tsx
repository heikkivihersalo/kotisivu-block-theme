/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { VideoControls, VideoMarkup } from '@components/media';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @param {Function} props.setAttributes Callback function
 * @return {JSX.Element} React component
 */
export default function Edit({
	attributes,
	setAttributes,
}: {
	attributes: Record<string, any>;
	setAttributes: (attributes: Record<string, any>) => void;
}): JSX.Element {
	const {
		blockClass,
		mediaId,
		mediaUrl,
		mediaAlt,
		mediaMime,
		mediaWidth,
		mediaHeight,
	} = attributes;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: blockClass,
	});

	/**
	 * Return block edit view
	 */
	return (
		<>
			<div {...blockProps}>
				<VideoControls
					attributes={{
						mediaId,
						mediaUrl,
						mediaAlt,
						mediaMime,
						mediaWidth,
						mediaHeight,
					}}
					setAttributes={setAttributes}
				/>
			</div>
		</>
	);
}
