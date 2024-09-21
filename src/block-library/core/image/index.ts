/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import initBlockStyles from './utils/initBlockStyles.ts';
import variations from './variations.ts';
import './index.css';

/**
 * Run on DOM ready
 */
domReady(function () {
	initBlockStyles(variations);
});
