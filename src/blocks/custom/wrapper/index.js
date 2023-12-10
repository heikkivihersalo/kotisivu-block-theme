/**
 * WordPress dependencies
 */
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from "./edit";
import save from "./save";
import variations from './variations.js';
import './style.css';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(metadata.name, {
    edit,
    save,
    variations,
    getEditWrapperProps() {
        return {
            'data-align': 'full',
        };
    }
});

/**
 * Run on DOM ready
 * 
 * @see https://developer.wordpress.org/reference/functions/register_block_style/
 */
domReady(function () {
    registerBlockStyle(metadata.name, {
        name: 'wrapper-shadow',
        label: __('Shadow', 'kotisivu-block-theme'),
    });
});