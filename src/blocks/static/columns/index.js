/**
 * Forked from Gutenberg core/column repository. 
 * Version: 15.3.1
 * License: GPL-2.0-or-later
 * @link https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/columns
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { columns as icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";
import metadata from './block.json';
import variations from './variations';
import example from './example';
import './style.css';

const {
    apiVersion,
    name,
    title,
    category,
    description,
    keywords,
    textdomain,
    supports,
} = metadata;

export const settings = {
    apiVersion: apiVersion,
    title: __(title, 'kotisivu-block-theme'),
    description: __(description, 'kotisivu-block-theme'),
    category: category,
    icon,
	variations,
	example,
    supports: supports,
    keywords: keywords,
    textdomain: textdomain,
    edit,
    save,
    // getEditWrapperProps() {
    //     return {
    //         'data-align': 'full',
    //     };
    // }
}

registerBlockType(name, settings);
