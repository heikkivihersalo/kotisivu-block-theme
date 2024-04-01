/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import variations from './variations.js';
import edit from "./edit";
import save from "./save";
import './style.css';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(metadata.name, {
    /**
     * @see ./edit.js
     */
    edit,
    /**
     * @see ./save.js
     */
    save,
    /**
     * @see ./variations.js
     */
    variations,
    /**
     * Sets alignment.
     *
     * @param attributes
     * @returns {{'data-align': *}}
     */
    getEditWrapperProps(attributes) {
        return {
            'data-align': 'full'
        };
    },
});
