/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import updateBlockMarkup from './utils/updateBlockMarkup.tsx';
import initBlockStyles from './utils/initBlockStyles.ts';
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
