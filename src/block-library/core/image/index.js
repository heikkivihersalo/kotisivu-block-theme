
/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import { updateBlockMarkup, initBlockStyles } from './utils';
import styles from './styles.json';
import './index.css';


/**
 * Filters
 */
addFilter(
    'blocks.getSaveElement',
    'ksd/image',
    updateBlockMarkup
);

/**
 * Run on DOM ready
 */
domReady(function () {
    initBlockStyles(styles);
});
