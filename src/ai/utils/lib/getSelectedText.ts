/**
 * WordPress dependencies
 */
declare const wp: any;
const { getSelectionStart, getSelectionEnd } =
	wp.data.select('core/block-editor');

/**
 * Internal dependencies
 */
import type { Selection } from '../../types';

/**
 * Get block text selection
 * @param {string} text Block text
 * @return {Selection} Block text selection
 */
function getSelectedText(text: string): Selection {
	const { offset: startOffset } = getSelectionStart();
	const { offset: endOffset } = getSelectionEnd();

	return {
		text: text.substring(startOffset, endOffset),
		start: startOffset,
		end: endOffset,
	};
}

export { getSelectedText };
