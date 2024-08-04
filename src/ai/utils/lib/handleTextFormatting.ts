/**
 * Handle text formatting
 * @param {string} text Original text
 * @return {string} Formatted text
 */
function handleTextFormatting(text: string): string {
	return text
		.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
		.replace(/\*(.*)\*/gim, '<em>$1</em>');
}

export { handleTextFormatting };
