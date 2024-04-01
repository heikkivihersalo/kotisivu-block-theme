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
    unregisterBlockStyle('core/separator', 'default');
    unregisterBlockStyle('core/separator', 'wide');
    unregisterBlockStyle('core/separator', 'dots');

    /**
     * Register custom button styles
     */
    styles.forEach((style) => {
        registerBlockStyle('core/separator', style);
    });
});