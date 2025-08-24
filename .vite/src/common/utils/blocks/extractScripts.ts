/**
 * Internal dependencies
 */
import { wrapArray } from '../array/wrapArray.ts';

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
	return wrapArray(viewScript)
		.concat(wrapArray(standardScript))
		.concat(wrapArray(editorScript))
		.filter(
			(script) => typeof script === 'string' && script.startsWith('file')
		)
		.map((script) => (script as string).replace('file:./', ''));
};
