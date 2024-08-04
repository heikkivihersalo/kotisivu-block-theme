/**
 * WordPress dependencies
 */
import type { BlockInstance } from '@wordpress/blocks';

declare const wp: any;

const { getBlockOrder, getBlockParents } = wp.data.select('core/block-editor');
const { insertBlock } = wp.data.dispatch('core/editor');

/**
 * Internal dependencies
 */
type Props = {
	currentBlock: BlockInstance | null;
	blocks: BlockInstance[];
};

/**
 * Add blocks to the editor
 * @param {Object} props
 * @param {BlockInstance|null} props.currentBlock Selected block
 * @param {BlockInstance[]} props.blocks Blocks to add
 * @return {void} void
 */
function addBlocksToEditor({ currentBlock, blocks }: Props): void {
	if (!currentBlock) {
		return;
	}

	/**
	 * Check if we are in a nested block or not and insert the blocks accordingly
	 */
	const parentBlocks = getBlockParents(currentBlock.clientId);

	if (parentBlocks.length > 0) {
		/**
		 * If the block is nested, insert the blocks inside the parent block
		 */
		const parentClientId = parentBlocks.pop();

		blocks.forEach((block, index) => {
			insertBlock(block, index, parentClientId);
		});
	} else {
		/**
		 * If the block is not nested, insert the blocks at the same level
		 */
		const currentIndex = getBlockOrder().indexOf(currentBlock.clientId);

		blocks.forEach((block, index) => {
			insertBlock(block, currentIndex + index);
		});
	}
}

export { addBlocksToEditor };
