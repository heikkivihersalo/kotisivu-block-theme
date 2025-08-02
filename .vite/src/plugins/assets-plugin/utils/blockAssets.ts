/**
 * Normalize unknown value to array
 * @param source - The value to normalize
 * @return An array containing the source value or the source value itself if it's already an array
 */
export const normaliseArray = (source: unknown): unknown[] =>
	Array.isArray(source) ? source : [source];

/**
 * Extract scripts from block.json configuration
 *
 * @param blockJson - The block.json configuration object
 * @return Array of script paths
 */
export const extractScripts = (
	blockJson: Record<string, unknown>
): string[] => {
	const viewScript = blockJson?.viewScript ?? [];
	const standardScript = blockJson?.script ?? [];
	const editorScript = blockJson?.editorScript ?? [];

	// Normalise into arrays and combine
	return normaliseArray(viewScript)
		.concat(normaliseArray(standardScript))
		.concat(normaliseArray(editorScript))
		.filter(
			(script) => typeof script === 'string' && script.startsWith('file')
		)
		.map((script) => (script as string).replace('file:./', ''));
};

/**
 * Extract styles from block.json configuration
 * @param blockJson - The block.json configuration object
 * @return Array of style paths
 */
export const extractStyles = (blockJson: Record<string, unknown>): string[] => {
	const editorStyle = blockJson?.editorStyle ?? [];
	const style = blockJson?.style ?? [];
	const viewStyle = blockJson?.viewStyle ?? [];

	// Normalise into arrays and combine
	return normaliseArray(editorStyle)
		.concat(normaliseArray(style))
		.concat(normaliseArray(viewStyle))
		.filter(
			(style) => typeof style === 'string' && style.startsWith('file')
		)
		.map((style) => (style as string).replace('file:./', ''));
};
