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
import variations from './variations';
import './style.css';

import type { WrapperBlockConfig } from './types';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(metadata.name, {
	/**
	 * @see block.json
	 */
	...metadata,
	/**
	 * @see edit.tsx
	 */
	edit,
	/**
	 * @see save.tsx
	 */
	save,
	/**
	 * @see variations.ts
	 */
	variations,
} as unknown as WrapperBlockConfig);
