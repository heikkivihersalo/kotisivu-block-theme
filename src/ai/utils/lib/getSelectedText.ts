/**
 * WordPress dependencies
 */
declare const wp: any;
const { getSelectionStart, getSelectionEnd } =
	wp.data.select('core/block-editor');

/**
 * Internal dependencies
 */
type Props = {
	text: string;
};

type Selection = {
	selection: string;
	startIndex: number;
	endIndex: number;
};

/**
 * Get block text selection
 * @param {Props} props Block text
 * @param {string} props.text Block text
 * @return {Selection} Block text selection
 */
function getSelectedText({ text }: Props): Selection {
	const { offset: startOffset } = getSelectionStart();
	const { offset: endOffset } = getSelectionEnd();

	return {
		selection: text.substring(startOffset, endOffset),
		startIndex: startOffset,
		endIndex: endOffset,
	};
}

export { getSelectedText };
