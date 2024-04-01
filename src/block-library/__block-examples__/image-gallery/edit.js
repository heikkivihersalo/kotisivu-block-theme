import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

import MediaUploader from './components/MediaUploader';

import Img from './components/Img';

import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			images
		}
	} = props;

	const blockProps = useBlockProps({
		className: "image-gallery"
	});

	return (
		<div className="image-gallery__editor-wrapper">
			{
				images.length >= 1
					? (
						<div {...blockProps}>
							{images.map(image => (
								<Img key={image.mediaID} image={image} imageClass={"image-gallery__item"} />
							))}
						</div>
					)
					: <div className="image-gallery__help-text">
						{__('Selected images will be shown here', 'kotisivu-block-theme')}
					</div>
			}
			<MediaUploader mediaIDs={images.map(image => image.mediaID)} props={props} />
		</div>
	);
};

export default Edit;
