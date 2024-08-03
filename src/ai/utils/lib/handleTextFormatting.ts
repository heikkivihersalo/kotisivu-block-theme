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

export { handleTextFormatting };
