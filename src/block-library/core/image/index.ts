/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import { updateBlockMarkup, initBlockStyles } from './utils';
import variations from './variations.ts';
import './index.css';

/**
 * Filters
 */
addFilter(
	'blocks.getSaveElement',
	'kotisivu-block-theme/image',
	updateBlockMarkup
);

/**
 * Run on DOM ready
 */
domReady(function () {
	initBlockStyles(variations);
});
