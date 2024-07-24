/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { unregisterBlockStyle, registerBlockStyle } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import variations from './variations.ts';
import './index.css';

/**
 * Run on DOM ready
 */
domReady(function () {
	/**
	 * Unregister default button styles
	 */
	unregisterBlockStyle('core/button', 'fill');

	/**
	 * Register custom button styles
	 */
	variations.forEach((style) => {
		registerBlockStyle('core/button', style);
	});
});
