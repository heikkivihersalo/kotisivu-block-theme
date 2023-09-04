import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

import Inspector from './components/Inspector';
import MediaUploader from './components/MediaUploader';

import Img from './components/Img';

import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			images,
			sectionHeading
		}
	} = props;

	const blockProps = useBlockProps({
		className: "image-gallery"
	});

	return (
		<>
			<Inspector {...props} />
			<section {...blockProps}>
				<h2 className="is-visually-hidden">{sectionHeading}</h2>
				{
					images.length >= 1
						? (
							<div className="image-gallery__container">
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
			</section>
		</>
	);
};

export default Edit;
