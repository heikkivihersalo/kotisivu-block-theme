import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

import Img from './components/Img';

const Save = (props) => {
	const {
		attributes: {
			images
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: 'image-gallery'
	});

	return (
		<div {...blockProps}>
			{
				images.map(image => (
					<Img key={image.mediaID} image={image} imageClass={"image-gallery__item"} />
				))
			}
		</div>
	);
};

export default Save;
