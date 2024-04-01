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
import './style.css';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(metadata.name, {
    edit,
    save
});


/**
 * Run on DOM ready
 * 
 * @see https://developer.wordpress.org/reference/functions/register_block_style/
 */
domReady(function () {
    registerBlockStyle(metadata.name, {
        name: 'image-gallery-client',
        label: __('Client', 'kotisivu-block-theme'),
    });
});