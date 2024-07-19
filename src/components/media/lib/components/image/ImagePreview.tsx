import { __ } from '@wordpress/i18n';
import { ImageMarkup } from '@components/media';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { ImageAttributes } from '@components/media';
// @ts-ignore
import placeholder from '../../assets/placeholder.png';

/**
 * Image preview component
 * @param {Object} props
 * @param {ImageAttributes} props.attributes Block attributes
 * @param {Function} props.callbackFn Callback function
 * @returns
 */
const ImagePreview = ({
	attributes,
	callbackFn,
}: {
	attributes: ImageAttributes;
	callbackFn: () => void;
}): JSX.Element => {
	/**
	 *  If no image is selected, return 'upload image' button
	 */
	if (!attributes.mediaUrl) {
		return (
			<div
				style={{
					display: 'grid',
					placeItems: 'center',
				}}
			>
				<Button
					onClick={callbackFn}
					className="button button-large"
					style={{
						gridArea: '1/1',
						zIndex: 1,
					}}
				>
					{__('Pick a image', 'kotisivu-block-theme')}
				</Button>
				<img
					style={{
						gridArea: '1/1',
					}}
					className="image-placeholder"
					src={placeholder}
				/>
			</div>
		);
	}

	/**
	 * If image is svg, return correct markup for svg image
	 */
	if (attributes.mediaMime == 'image/svg+xml') {
		return <img src={attributes.mediaUrl} alt={attributes.mediaAlt} />;
	}

	/**
	 * Return markup for image element
	 */
	return (
		<ImageMarkup
			attributes={{
				mediaId: attributes.mediaId,
				mediaUrl: attributes.mediaUrl,
				mediaAlt: attributes.mediaAlt,
				mediaWidth: attributes.mediaWidth,
				mediaMime: attributes.mediaMime,
				mediaHeight: attributes.mediaHeight,
				mediaSrcSet: attributes.mediaSrcSet,
				mediaSrcSizes: attributes.mediaSrcSizes,
				lazyLoad: attributes.lazyLoad,
			}}
		/>
	);
};

export default ImagePreview;
