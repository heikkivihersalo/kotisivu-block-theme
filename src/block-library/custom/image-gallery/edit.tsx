/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import MediaUploader from './components/MediaUploader';
import Image from './components/Image';
import type { BlockAttributes, BlockSetAttributes } from './types';

import './editor.css';

type Props = {
	attributes: BlockAttributes;
	setAttributes: BlockSetAttributes;
};

/**
 * Block edit function
 * @param {Object} props Properties
 * @param {Object} props.attributes Block attributes
 * @param {Function} props.setAttributes Set attributes
 * @return {JSX.Element} React component
 */
export default function Edit({
	attributes,
	setAttributes,
}: Props): JSX.Element {
	const { images, blockClass } = attributes;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: `image-gallery ${blockClass}`,
	});

	return (
		<div className="editor-image-gallery">
			{images.length >= 1 ? (
				<div {...blockProps}>
					{images.map((image) => (
						<Image key={image.mediaId} image={image} />
					))}
				</div>
			) : (
				<div className="editor-image-gallery__help">
					{__(
						'Selected images will be shown here',
						'kotisivu-block-theme'
					)}
				</div>
			)}
			<MediaUploader
				mediaIds={images.map((image) => image.mediaId)}
				setAttributes={setAttributes}
			/>
		</div>
	);
}
