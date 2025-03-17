/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { registerBlockStyle } from '@wordpress/blocks';

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
	 * Register custom button styles
	 */
	variations.forEach((style) => {
		registerBlockStyle('core/heading', style);
	});
});
