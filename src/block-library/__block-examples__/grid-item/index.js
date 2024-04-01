/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
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
    save,
    usesContext: ['ksd/childTemplate']
});
