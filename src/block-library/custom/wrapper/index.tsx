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
import edit from './edit';
import save from './save';
import variations from './variations.ts';
import './style.css';

/**
 * Block metadata
 */
const { name, title, category, attributes } = metadata;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
// @ts-ignore Let's ignore the error for now. We don't need to add block attributes two times.
registerBlockType(name, {
	/**
	 * @see ./block.json
	 */
	title,
	/**
	 * @see ./block.json
	 */
	category,
	/**
	 * @see ./block.json
	 */
	attributes,
	/**
	 * @see ./edit.tsx
	 */
	edit,
	/**
	 * @see ./save.tsx
	 */
	save,
	/**
	 * @see variations.js
	 */
	variations,
	/**
	 * Sets alignment.
	 */
	getEditWrapperProps(): { 'data-align': string } {
		return {
			'data-align': 'full',
		};
	},
});
