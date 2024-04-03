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
    if (!element || blockType.name !== 'core/image') return element;
    if (!element?.props?.children?.props?.children[0]) return element;
    if (attributes.caption || attributes?.href) return element;

    /**
     * Get the image props
     */
    const { props: {
        className,
        src,
        title,
        alt,
        height,
        width,
        style
    } } = element.props.children.props.children[0];

    const getAlignmentClass = (align) => {
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
     * If image doesn't have figcaption, create image element
     */
    const imageBlock = createElement('img', {
        className: classnames('wp-block-image', className, attributes.className, getBlockSizeClass(attributes?.sizeSlug), getAlignmentClass(attributes?.align)),
        src,
        title,
        alt,
        height,
        width,
        style
    });

    /**
     * Return image block
     */
    return imageBlock;
}

export { updateBlockMarkup }