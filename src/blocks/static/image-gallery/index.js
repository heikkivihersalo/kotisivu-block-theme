import { __ } from "@wordpress/i18n";
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
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
    edit,
    save
}

registerBlockType(name, settings);

/**
 * Run on DOM ready
 */
domReady(function () {
    registerBlockStyle(name, {
        name: 'image-gallery-client',
        label: __('Client', 'kotisivu-block-theme'),
    });
});