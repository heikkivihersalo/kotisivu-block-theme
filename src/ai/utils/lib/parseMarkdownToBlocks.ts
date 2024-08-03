/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import type { BlockInstance } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { handleListItems, handleTextFormatting } from '../index';

/**
 * Parse markdown to blocks
 * @param {string} markdown Markdown string
 * @return {Promise<BlockInstance[]>} Array of block instances
 */
async function parseMarkdownToBlocks(
	markdown: string
): Promise<BlockInstance[]> {
	/**
	 * Index to skip to in the markdown string. Used for list items to prevent re-adding the same block
	 * @type {number}
	 */
	let skipTo: number = 0;

	/**
	 * Split the markdown string into blocks
	 * @type {string[]}
	 */
	const list: string[] = markdown.split('\n') || [];

	/**
	 * Loop thorugh the blocks and add blocks based on the block type
	 */
	const blocks: BlockInstance[] = [];

	for (let i = 0; i < list.length; i++) {
		// ChatGPT sometimes adds empty lines, skip them
		if (list[i] === '') {
			continue;
		}

		// Some blocks like list items can take multiple lines.
		// Prevent re-adding the same block by skipping to the next index
		if (skipTo > i) {
			continue;
		}

		// Handle adding blocks based on the block type
		const trimmedBlock = list[i].trim();

		switch (true) {
			case trimmedBlock.startsWith('-'):
				const listItems = handleListItems(list, i);
				skipTo = listItems.innerBlocks.length + i;
				blocks.push(listItems);
				break;
			case trimmedBlock.startsWith('#'):
				const level = trimmedBlock.match(/#/g)?.length;
				const content = trimmedBlock.replace(/#/g, '').trim();
				blocks.push(
					createBlock('core/heading', {
						content: handleTextFormatting(content),
						level: level !== undefined ? level : 2,
					})
				);
				break;
			default:
				if (trimmedBlock === '') {
					continue;
				}

				blocks.push(
					createBlock('core/paragraph', {
						content: handleTextFormatting(trimmedBlock),
					})
				);
				break;
		}
	}

	return blocks;
}

export { parseMarkdownToBlocks };
