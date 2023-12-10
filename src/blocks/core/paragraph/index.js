/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { registerBlockStyle } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import styles from './styles.json';
import './index.css';

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