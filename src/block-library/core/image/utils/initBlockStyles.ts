/**
 * WordPress dependencies
 */
import { unregisterBlockStyle, registerBlockStyle } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import type { BlockStyle } from 'core-blocks';

/**
 * Init block styles, unregister default styles and register custom styles
 * @param {BlockStyle[]} styles - Custom block styles
 * @return {void}
 */
function initBlockStyles(styles: BlockStyle[] = []): void {
	unregisterBlockStyle('core/image', 'default');
	unregisterBlockStyle('core/image', 'rounded');

	styles.forEach((style) => {
		registerBlockStyle('core/image', style);
	});
}

export default initBlockStyles;
