/**
 * Internal dependencies
 */
import { wrapArray } from '../array/wrapArray.ts';

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
	return wrapArray(editorStyle)
		.concat(wrapArray(style))
		.concat(wrapArray(viewStyle))
		.filter(
			(style) => typeof style === 'string' && style.startsWith('file')
		)
		.map((style) => (style as string).replace('file:./', ''));
};
