import { __ } from '@wordpress/i18n';
import { ImageMarkup } from '@/shared/components/media';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
// @ts-ignore
import placeholder from '../../assets/placeholder.png';

type Props = {
	attributes: BlockJSON_Image;
	callbackFn: () => void;
};

/**
 * Image preview component
 * @param {Object} props
 * @param {ImageAttributes} props.attributes Block attributes
 * @param {Function} props.callbackFn Callback function
 * @return {JSX.Element} Image preview element
 */
const ImagePreview = ({ attributes, callbackFn }: Props): JSX.Element => {
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
					alt={__(
						'Placeholder image for image component',
						'kotisivu-block-theme'
					)}
				/>
			</div>
		);
	}

	/**
	 * If image is svg, return correct markup for svg image
	 */
	if (attributes.mediaMime === 'image/svg+xml') {
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
