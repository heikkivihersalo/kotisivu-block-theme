import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

import Img from './components/Img';

const Save = (props) => {

	console.log(props);

	const {
		attributes: {
			images,
			sectionHeading
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: 'image-gallery'
	});

	return (
		<section {...blockProps}>
			<h2 className="is-visually-hidden">{sectionHeading}</h2>
			<div className="image-gallery__container">
				{
					images.map(image => (
						<Img key={image.mediaID} image={image} imageClass={"image-gallery__item"} />
					))
				}
			</div>
		</section>
	);
};

export default Save;
