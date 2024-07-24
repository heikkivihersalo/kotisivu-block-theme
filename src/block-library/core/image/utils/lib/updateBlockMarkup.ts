/**
 * WordPress dependencies
 */
import { createElement } from '@wordpress/element';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getImageSizeClass, getImageAlignmentClass } from '@utils';

type BlockType = {
	name: string;
};

type BlockAttributes = {
	className: string;
	sizeSlug: string;
	align: string;
};

type ImageProps = {
	className: string;
	src: string;
	title: string;
	alt: string;
	height: number;
	width: number;
	style: string;
};

/**
 * Updates block markup to better handle image semantics.
 * - If image has a caption or a link, return original element as is (<figure> -tag).
 * - If image is pure image, return new image element (<img> -tag).
 * @param {Object} element Block element
 * @param {Object} blockType Block type
 * @param {Object} attributes Block attributes
 * @return {JSX.Element} Updated block element
 */
function updateBlockMarkup(
	element: JSX.Element,
	blockType: BlockType,
	attributes: BlockAttributes
): JSX.Element | undefined {
	// skip if element is undefined
	if (!element) {
		return;
	}

	// only apply to image blocks
	if (blockType.name !== 'core/image') {
		return element;
	}

	// Get image element and check if it exists
	const imageElement = element?.props?.children?.props?.children[0];
	if (!imageElement) {
		return;
	}

	// Check if image has a caption or a link. Return original element if it does
	const figureElement = element?.props?.children?.props?.children[1];
	const hasCaption = figureElement?.props?.value?.text;
	const hasLink = imageElement?.props?.href;

	if (hasCaption || hasLink) {
		return element;
	}

	/**
	 * Get the image props
	 */
	const {
		props: { className, src, title, alt, height, width, style },
	}: {
		props: ImageProps;
	} = imageElement;

	/**
	 * Create new image block
	 */
	const imageBlock = createElement('img', {
		className: classnames(
			'wp-block-image',
			className,
			attributes.className,
			getImageSizeClass(attributes?.sizeSlug),
			getImageAlignmentClass(attributes?.align)
		),
		src,
		title,
		alt,
		height,
		width,
		style,
	});

	/**
	 * Return image block
	 */
	return imageBlock;
}

export { updateBlockMarkup };
