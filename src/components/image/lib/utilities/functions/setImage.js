/**
 * Converts sizes to srcSet
 * @param {Array} sizes Image sizes
 * @return {string} srcSet string for image
 */
const convertToSrcSet = (sizes) => {
	return sizes
		.slice()
		.reverse()
		.map(({ width, url }) => `${url} ${width}w`)
		.join(', ');
};

/**
 * Converts sizes to media query strings
 * @param {Array} sizes Image sizes
 * @return {Array} media query strings for image
 */
const convertToSizes = (sizes) => {
	const reversedSizes = [...sizes].reverse();
	return reversedSizes
		.map((size, index) => {
			return index === reversedSizes.length - 1
				? `${size.width}px`
				: `(max-width: ${size.width}px) ${size.width}px`;
		})
		.join(', ');
};

/**
 * Get image sizes from WordPress object
 * @param {Object} obj WordPress image object
 * @return {Array} Image sizes
 */
const getImageSizes = (obj) => {
	const sizes = Object.entries(obj).map(([key, value], index) => ({
		id: index,
		name: key,
		url: value.url,
		width: value.width,
		height: value.height,
	}));

	/* Sort images from largest to smallest */
	const isHorizontal = sizes[0].width >= sizes[0].height;
	sizes.sort((a, b) =>
		isHorizontal ? b.width - a.width : b.height - a.height
	);

	return sizes;
};

/**
 * Sets the image attributes
 * @param {Object} media
 * @param {Object} props
 * @return {void}
 */
const setImage = (media, props) => {
	const { mime, url, id, alt, sizes, width, height } = media;

	/* If image is svg, set svg properties correctly */
	if (mime === 'image/svg+xml') {
		props.setAttributes({
			mediaUrl: url,
			mediaId: id,
			mediaAlt: alt,
			mediaMime: mime,
		});
		return;
	}

	/* Get image sizes from WordPress */
	const imageSizes = getImageSizes(sizes);

	/* Set attributes for image block */
	props.setAttributes({
		mediaUrl: url,
		mediaId: id,
		mediaAlt: alt,
		mediaMime: mime,
		mediaWidth: width,
		mediaHeight: height,
		mediaSrcSet: convertToSrcSet(imageSizes),
		mediaSrcSizes: convertToSizes(imageSizes),
	});
};

export { setImage };
