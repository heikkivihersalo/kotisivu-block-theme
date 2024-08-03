/**
 * WordPress dependencies
 */
declare const wp: any;
const { getSelectionStart, getSelectionEnd } =
	wp.data.select('core/block-editor');

/**
 * Get block text selection
 * @return string Block text selection
 */
function getSelectedText({ text }: { text: string }): {
	selection: string;
	startIndex: number;
	endIndex: number;
} {
	const { offset: startOffset } = getSelectionStart();
	const { offset: endOffset } = getSelectionEnd();

	return {
		selection: text.substring(startOffset, endOffset),
		startIndex: startOffset,
		endIndex: endOffset,
	};
}

export { getSelectedText };
