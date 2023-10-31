import { __ } from "@wordpress/i18n";
import { registerBlockType } from '@wordpress/blocks';
import variations from './variations.js';
import edit from "./edit";
import save from "./save";
import metadata from './block.json';
import './style.css';

const {
    apiVersion,
    name,
    title,
    category,
    icon,
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
    icon: icon,
    supports: supports,
    keywords: keywords,
    textdomain: textdomain,
    variations: variations,
    edit,
    save,
    getEditWrapperProps() {
        return {
            'data-align': 'full',
        };
    }
}

registerBlockType(name, settings);
