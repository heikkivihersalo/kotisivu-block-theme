/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import MediaUploader from './components/MediaUploader';
import Img from './components/Img';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @return {JSX.Element} React component
 */
export default function Edit(props) {
	const {
		attributes: { images },
		setAttributes,
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: 'image-gallery image-gallery-editor__images',
	});

	return (
		<div className="image-gallery-editor">
			{images.length >= 1 ? (
				<div {...blockProps}>
					{images.map((image) => (
						<Img
							key={image.mediaID}
							image={image}
							imageClass={'image-gallery__item'}
						/>
					))}
				</div>
			) : (
				<div className="image-gallery-editor__help">
					{__(
						'Selected images will be shown here',
						'kotisivu-block-theme'
					)}
				</div>
			)}
			<MediaUploader
				mediaIDs={images.map((image) => image.mediaID)}
				setAttributes={setAttributes}
			/>
		</div>
	);
}
