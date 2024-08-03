/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import type { BlockInstance } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { handleTextFormatting } from '../index';

/**
 * Handle list items
 * @param {string[]} blocks Original text
 * @param {number} currentIndex Current index
 * @return {BlockInstance} Block instance
 */
function handleListItems(
	blocks: string[],
	currentIndex: number
): BlockInstance {
	/**
	 * Flag to keep track of the previous item
	 * - If the previous item was a list item, we can continue adding list items
	 * - Otherwise, we should stop adding list items and return the block
	 * @type {string | null}
	 */
	let previousItem: string | null = null;

	/**
	 * Temporary list items array to store the list items
	 * @type {BlockInstance[]}
	 */
	const listItems: BlockInstance[] = [];

	/**
	 * Loop through the blocks and add list items as long as the current item is no longer a list item
	 */
	for (let i = currentIndex; i < blocks.length; i++) {
		// ChatGPT sometimes adds empty lines, skip them
		if (blocks[i] === '') {
			continue;
		}

		// If the previous item was a list item and the current item is not a list item, break the loop
		if (previousItem === 'list-item' && !blocks[i].startsWith('-')) {
			break;
		}

		// If the current item is a list item, add it to the list items array
		if (blocks[i].startsWith('-')) {
			previousItem = 'list-item';

			listItems.push(
				createBlock('core/list-item', {
					content: handleTextFormatting(
						blocks[i].replace('-', '').trim()
					),
				})
			);
		}
	}

	/**
	 * Return the list block with the list items
	 */
	return createBlock(
		'core/list',
		{},
		listItems.filter((item) => item !== undefined)
	);
}

export { handleListItems };
