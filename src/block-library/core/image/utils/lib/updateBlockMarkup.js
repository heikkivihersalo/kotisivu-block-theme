/**
 * WordPress dependencies
 */
import { createElement } from '@wordpress/element';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getBlockSizeClass } from '../../utils';

/**
 * Get block alignment class name
 * @param {string} align Block alignment
 * @return {string} Alignment class name
 */
function getAlignmentClass(align) {
	if (!align) return null;

	switch (align) {
		case 'left':
			return 'has-align-left';
		case 'right':
			return 'has-align-right';
		case 'center':
			return 'has-align-center';
		case 'wide':
			return 'has-align-wide';
		case 'full':
			return 'has-align-full';
		default:
			return null;
	}
}

/**
 * Update block markup
 * @param {Object} element Block element
 * @param {Object} blockType Block type
 * @param {Object} attributes Block attributes
 * @return {JSX.Element} Updated block element
 */
function updateBlockMarkup(element, blockType, attributes) {
	/**
	 * Guard clauses
	 */
	if (!element || blockType.name !== 'core/image') {
		return element; // If element is not an image block
	}

	const imageElement = element?.props?.children?.props?.children[0];
	const figureElement = element?.props?.children?.props?.children[1];
	const hasCaption = figureElement?.props?.value?.text;
	const hasLink = imageElement?.props?.href;

	if (!imageElement || hasCaption || hasLink) {
		return element; // If image has a caption or a link, return the original element
	}

	/**
	 * Get the image props
	 */
	const {
		props: { className, src, title, alt, height, width, style },
	} = imageElement;

	/**
	 * If image doesn't have figcaption, create image element
	 */
	const imageBlock = createElement('img', {
		className: classnames(
			'wp-block-image',
			className,
			attributes.className,
			getBlockSizeClass(attributes?.sizeSlug),
			getAlignmentClass(attributes?.align)
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
