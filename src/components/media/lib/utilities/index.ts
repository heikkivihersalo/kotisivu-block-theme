/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import type { ImageAttributes } from '@components/media';

/**
 * Convert WordPress image sizes to correctly formatted srcset string
 * @param {Object} sizes - Image sizes from WordPress
 * @return {string} srcset string
 */
function convertToSrcSetString(
	sizes: Array<{ width: number; url: string }>
): string {
	return sizes
		.slice(0)
		.reverse()
		.map((size) => {
			const width = size.width;
			const url = size.url;

			return `${url} ${width}w`;
		})
		.join(', ');
}

/**
 * Convert WordPress image sizes to correctly formatted width string
 * e.g (max-width: 1024px) 100vw, 1024px (max-width: 768px) 100vw, 768px etc.
 * @param {Object} sizes - Image sizes from WordPress
 * @return {string} sizes string
 */
function convertToSizesString(sizes: Array<{ width: number }>): string {
	const sizesReverse = sizes.slice(0).reverse();
	return sizesReverse
		.map((size, index) => {
			return index === sizesReverse.length - 1
				? `${size.width}px`
				: `(max-width: ${size.width}px) ${size.width}px`;
		})
		.join(', ');
}

/**
 * Get image sizes from WordPress
 * @param {Object} obj
 * @return {Object} sizes and srcset
 */
function getImageSizes(obj: Record<string, any>): {
	sizes: string;
	srcset: string;
} {
	const initialSizes = Object.entries(obj).map(([key, value], index) => {
		return {
			id: index,
			name: key,
			url: value.url,
			width: value.width,
			height: value.height,
		};
	});

	/* Sort images from largest to smallest */
	if (initialSizes[0].width >= initialSizes[0].height) {
		/* Image orientation is horizontal */
		initialSizes.sort((a, b) => b.width - a.width);
	} else {
		/* Image orientation is vertical */
		initialSizes.sort((a, b) => b.height - a.height);
	}

	/**
	 * Return the sizes and src set
	 */
	return {
		sizes: convertToSizesString(initialSizes),
		srcset: convertToSrcSetString(initialSizes),
	};
}

/**
 * Remove attributes from the given element
 * @param {Function} setAttributes
 * @return {void}
 */
function removeImageAttributes(
	setAttributes: (attributes: ImageAttributes) => void
): void {
	setAttributes({
		mediaId: 0,
		mediaUrl: '',
		mediaAlt: '',
		mediaMime: '',
		mediaWidth: undefined,
		mediaHeight: undefined,
		mediaSrcSet: '',
		mediaSrcSizes: '',
	});
}

/**
 * Set image attributes
 * @param {Object} media
 * @param {Function} setAttributes
 * @return {void}
 */
function setImageAttributes(
	media: Record<string, any>,
	setAttributes: (attributes: ImageAttributes) => void
): void {
	/* If image is svg, set svg properties correctly */
	if (media.mime === 'image/svg+xml') {
		setAttributes({
			mediaUrl: media.url,
			mediaId: media.id,
			mediaAlt: media.alt,
			mediaMime: media.mime,
			mediaWidth: media.width || 0,
			mediaHeight: media.height || 0,
		});

		return;
	}

	/* Get image sizes from WordPress */
	const { sizes, srcset } = getImageSizes(media.sizes);

	/* Set attributes for image block */
	setAttributes({
		mediaUrl: media.url,
		mediaId: media.id,
		mediaAlt: media.alt,
		mediaMime: media.mime,
		mediaWidth: media.width,
		mediaHeight: media.height,
		mediaSrcSet: srcset,
		mediaSrcSizes: sizes,
	});
}

export { removeImageAttributes, setImageAttributes };
