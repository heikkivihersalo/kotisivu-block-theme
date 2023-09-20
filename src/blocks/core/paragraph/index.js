/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { registerBlockStyle } from '@wordpress/blocks';

/**
 * Other dependencies
 */
import styles from './styles.json';

/**
 * Run on DOM ready
 */
domReady(function () {
    /**
     * Register custom button styles
     */
    styles.forEach((style) => {
        registerBlockStyle('core/paragraph', style);
    });
});