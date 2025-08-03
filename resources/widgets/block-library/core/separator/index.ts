import { registerBlockStyle, unregisterBlockStyle } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import variations from './variations';
import './index.css';

/**
 * Run on DOM ready
 */
domReady(function () {
	/**
	 * Unregister default button styles
	 */
	unregisterBlockStyle('core/separator', 'default');
	unregisterBlockStyle('core/separator', 'wide');
	unregisterBlockStyle('core/separator', 'dots');

	/**
	 * Register custom button styles
	 */
	variations.forEach((style) => {
		registerBlockStyle('core/separator', style);
	});
});
