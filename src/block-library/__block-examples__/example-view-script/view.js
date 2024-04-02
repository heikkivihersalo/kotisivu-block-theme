/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import domReady from '@wordpress/dom-ready';

/**
 * External dependencies
 *
 */

/**
 * Components
 */
import Example from './components/Example.jsx';

/**
 * Render block
 */
domReady(function () {
    createRoot(document.getElementById('example-view-script')).render(
        <Example />
    );
});
