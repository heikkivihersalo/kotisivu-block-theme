/**
 * WordPress dependencies
 */
declare const wp: any;
const { getSelectedBlock } = wp.data.select('core/block-editor');

/**
 * Internal dependencies
 */
import { Selection } from '../../types';
import { getSelectedText, highlightTextSelection } from '../../utils';
import { ALLOWED_TEXT_BLOCKS } from '../../constants';

/**
 * Handle text prompt shortcut
 * @return {Promise<void>}
 */
async function getCurrentSelection(): Promise<Selection | null> {
	/**
	 * Check that we are in the correct block and set the selected block
	 */
	const currentBlock = await getSelectedBlock();

	const {
		name: blockName,
		attributes: {
			content: { text: blockTextContent },
		},
	} = currentBlock;

	if (!ALLOWED_TEXT_BLOCKS.includes(blockName)) {
		return null;
	}

	/**
	 * Get the selected text and elements
	 */
	const {
		text: selectedText,
		start: startIndex,
		end: endIndex,
	} = getSelectedText(blockTextContent);

	const blockElement = document.querySelector(
		`[data-block="${currentBlock.clientId}"]`
	);

	/**
	 * Highlight selected text
	 */
	highlightTextSelection(blockElement, selectedText);

	/**
	 * Return the selection
	 */
	return {
		block: currentBlock,
		anchor: blockElement,
		text: selectedText,
		start: startIndex,
		end: endIndex,
	};
}

export { getCurrentSelection };
