/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { Button } from '@wordpress/components';
import type { MediaUploader_Image } from '@/shared/components/media';
import type { BlockSetAttributes } from '../types';

type Props = {
	mediaIds: number[];
	setAttributes: BlockSetAttributes;
};

/**
 * Get the largest image size slug available
 * @param {Object[]} image Image sizes
 * @return {string} Image size slug key
 */
const getImageWidthAndHeight = (
	image: MediaUploader_Image
): { width: number | undefined; height: number | undefined } => {
	/**
	 * There is a possibility that the image does not have any sizes available
	 * In that case, return empty strings for width and height
	 */
	if (!image.sizes) {
		return {
			width: undefined,
			height: undefined,
		};
	}

	/**
	 * For normal cases where the image has sizes available we will get the largest possible size
	 */
	const sizeSlugs = Object.keys(image.sizes);

	const largestSize = sizeSlugs.reduce((prev, current) => {
		return image.sizes[prev].width > image.sizes[current].width
			? prev
			: current;
	});

	return {
		width: image.sizes[largestSize].width,
		height: image.sizes[largestSize].height,
	};
};

/**
 * Block edit function
 * @param {Object} props Properties
 * @param {number[]} props.mediaIds Media IDs
 * @param {Function} props.setAttributes Set attributes function
 * @return {JSX.Element} React component
 */
const MediaUploader = ({ mediaIds, setAttributes }: Props): JSX.Element => {
	const onSelect = (images: MediaUploader_Image[]) => {
		setAttributes({
			images: images.map((image) => {
				const { id, url, alt, mime } = image;
				const { width, height } = getImageWidthAndHeight(image);

				return {
					mediaId: id,
					mediaUrl: url,
					mediaAlt: alt,
					mediaMime: mime,
					mediaWidth: width,
					mediaHeight: height,
					lazyLoad: true,
				};
			}),
		});
	};

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={onSelect}
				allowedTypes={['image']}
				value={mediaIds}
				render={({ open }) => (
					<Button onClick={open} className="button button-large">
						{mediaIds.length < 1
							? __('Upload/Select Images', 'kotisivu-block-theme')
							: __('Edit', 'kotisivu-block-theme')}
					</Button>
				)}
				gallery
				multiple
			/>
		</MediaUploadCheck>
	);
};

export default MediaUploader;
