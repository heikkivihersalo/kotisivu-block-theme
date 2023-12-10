/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { unregisterBlockStyle, registerBlockStyle } from '@wordpress/blocks';

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
     * Unregister default button styles
     */
    unregisterBlockStyle('core/button', 'outline');
    unregisterBlockStyle('core/button', 'fill');
    
    /**
     * Register custom button styles
     */
    styles.forEach((style) => {
        registerBlockStyle('core/button', style);
    });
});