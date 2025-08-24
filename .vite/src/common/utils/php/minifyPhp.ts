/**
 * Minify PHP content by removing comments, unnecessary whitespace, and formatting
 * This is a conservative minifier that maintains readability while reducing file size
 * @param content - The PHP content to minify
 * @return The minified PHP content
 */
export const minifyPhp = (content: string): string => {
	let result = content;

	// Remove multi-line comments /* ... */
	result = result.replace(/\/\*[\s\S]*?\*\//g, '');

	// Remove single-line comments // ... but preserve URLs like http://
	result = result.replace(/(?<!:)\/\/(?!\/)[^\r\n]*/g, '');

	// Remove single-line comments # ...
	result = result.replace(/(?<!['"])#[^\r\n]*/g, '');

	// Remove excessive whitespace while preserving structure
	// Replace multiple spaces/tabs with single space
	result = result.replace(/[ \t]+/g, ' ');

	// Remove trailing whitespace from lines
	result = result.replace(/[ \t]+$/gm, '');

	// Remove leading whitespace but preserve indentation structure
	result = result.replace(/^[ \t]+/gm, '');

	// Remove multiple consecutive newlines, keep max 1 empty line
	result = result.replace(/\n{3,}/g, '\n\n');

	// Trim start and end
	result = result.trim();

	// Add back single newline at end of file if it doesn't exist
	if (!result.endsWith('\n')) {
		result += '\n';
	}

	return result;
};
