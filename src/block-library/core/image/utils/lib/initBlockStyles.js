/**
 * WordPress dependencies
 */
import { unregisterBlockStyle, registerBlockStyle } from '@wordpress/blocks';

/**
 * Init block styles, unregister default styles and register custom styles
 * @param {Array} styles Custom block styles
 * @return {void}
 */
function initBlockStyles(styles = []) {
    unregisterBlockStyle('core/image', 'default');
    unregisterBlockStyle('core/image', 'rounded');

    styles.forEach((style) => {
        registerBlockStyle('core/image', style);
    });
}

export { initBlockStyles }
