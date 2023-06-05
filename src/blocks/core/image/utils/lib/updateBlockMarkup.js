/**
 * WordPress dependencies
 */
import { createElement } from '@wordpress/element';
import classnames from 'classnames';

/**
 * Custom dependencies
 */
import { getBlockSizeClass } from '../../utils';


/**
 * Update block markup
 *
 * @param {*} element
 * @param {*} blockType
 * @param {*} attributes
 * @return {*} 
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

    /** 
     * If image doesn't have figcaption, create image element
     */
    const imageBlock = createElement('img', {
        className: classnames('wp-block-image', className, getBlockSizeClass(attributes?.sizeSlug)),
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