/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Img from './components/Img';

/**
 * Block save function
 * @param {Object} props Properties
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save(props) {
	const {
		attributes: { images },
	} = props;

	const blockProps = useBlockProps.save({
		className: 'image-gallery',
	});

	return (
		<div {...blockProps}>
			{images.map((image) => (
				<Img
					key={image.mediaID}
					image={image}
					imageClass={'image-gallery__item'}
				/>
			))}
		</div>
	);
}
