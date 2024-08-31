/**
 * Highlights the selected text in the given element.
 * @param {Element | null} element - The element to highlight the text in
 * @param {string} selectedText - The text to highlight
 * @return {void}
 */
function highlightTextSelection(
	element: Element | null,
	selectedText: string
): void {
	const blockText = element?.textContent;
	const selectedTextLength = selectedText?.length;

	if (!blockText || !selectedText) {
		return;
	}

	const selectedTextIndex = blockText.indexOf(selectedText);

	const textBeforeSelection = blockText.slice(0, selectedTextIndex);
	const textAfterSelection = blockText.slice(
		selectedTextIndex + selectedTextLength
	);

	element.innerHTML = `${textBeforeSelection}<mark style="background-color: #dbdbdb;padding: 0.375em 0.5em;border-radius: 0.175em;">${selectedText}</mark>${
		textAfterSelection ? textAfterSelection : ''
	}`;
}

export { highlightTextSelection };
