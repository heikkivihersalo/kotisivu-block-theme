import { createBlock } from '@wordpress/blocks';
import type { BlockInstance } from '@wordpress/blocks';

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

/**
 * Handle text formatting
 * @param {string} originalText Original text
 * @return {string} Formatted text
 */
function handleTextFormatting(originalText: string): string {
	return originalText
		.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
		.replace(/\*(.*)\*/gim, '<em>$1</em>');
}

/**
 * Handle list items
 * @param {string[]} blocks Original text
 * @param {number} currentIndex Current index
 * @return {BlockInstance} Block instance
 */
function handleListItems(
	blocks: string[],
	currentIndex: number
): BlockInstance<{
	content: string;
}> {
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

export { handleListItems, handleTextFormatting, parseMarkdownToBlocks };
