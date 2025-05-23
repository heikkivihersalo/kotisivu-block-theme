/**
 * Internal dependencies
 */
import ImageDefault from './components/image/ImageDefault';
import ImageSourceSet from './components/image/ImageSourceSet';

type Props = {
	attributes: BlockJSON_Image;
	img?: boolean;
	srcset?: boolean;
};

/**
 * Image component markup
 * @param {Object} props - Image props
 * @param {Object} props.attributes - Image attributes
 * @param {boolean} props.img - Force image format
 * @param {boolean} props.srcset - Force srcset format
 */
const ImageMarkup = ({ attributes, img, srcset }: Props) => {
	/**
	 * Force desired image format
	 */
	if (srcset) {
		return (
			<ImageSourceSet
				attributes={{
					mediaSrcSet: attributes.mediaSrcSet,
					mediaSrcSizes: attributes.mediaSrcSizes,
					mediaUrl: attributes.mediaUrl,
					mediaAlt: attributes.mediaAlt,
					mediaWidth: attributes.mediaWidth,
					mediaHeight: attributes.mediaHeight,
					lazyLoad: attributes.lazyLoad,
				}}
			/>
		);
	}

	if (img) {
		return (
			<ImageDefault
				attributes={{
					mediaUrl: attributes.mediaUrl,
					mediaAlt: attributes.mediaAlt,
					mediaWidth: attributes.mediaWidth,
					mediaHeight: attributes.mediaHeight,
					lazyLoad: attributes.lazyLoad,
				}}
			/>
		);
	}

	/**
	 * load svg image
	 */
	if (attributes.mediaMime === 'image/svg+xml') {
		return (
			<ImageDefault
				attributes={{
					mediaUrl: attributes.mediaUrl,
					mediaAlt: attributes.mediaAlt,
					mediaWidth: attributes.mediaWidth,
					mediaHeight: attributes.mediaHeight,
					lazyLoad: attributes.lazyLoad,
				}}
			/>
		);
	}

	/**
	 * load image
	 */
	return (
		<ImageSourceSet
			attributes={{
				mediaSrcSet: attributes.mediaSrcSet,
				mediaSrcSizes: attributes.mediaSrcSizes,
				mediaUrl: attributes.mediaUrl,
				mediaAlt: attributes.mediaAlt,
				mediaWidth: attributes.mediaWidth,
				mediaHeight: attributes.mediaHeight,
				lazyLoad: attributes.lazyLoad,
			}}
		/>
	);
};

export { ImageMarkup };
