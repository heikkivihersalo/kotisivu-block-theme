/**
 * Shared dependencies
 */
import { WORDPRESS_EXTERNALS } from '../../../../common/constants.ts';

/**
 * Internal dependencies
 */
import type { ViteManifestChunk } from '../../types.ts';

/**
 * Extract WordPress dependencies from a Vite manifest chunk
 * This function scans the imports of a chunk and returns a list of unique
 * WordPress dependencies in the wp- format.
 *
 * @param chunk - The Vite manifest chunk to extract dependencies from.
 * @return An array of unique WordPress dependencies in wp- format.
 */
export function extractWordPressDependencies(
	chunk: ViteManifestChunk
): string[] {
	const dependencies = new Set<string>();

	// Use modern WordPress externals from constants
	const wpCoreDeps = Object.fromEntries(
		Object.keys(WORDPRESS_EXTERNALS)
			.filter((key) => key.startsWith('@wordpress/'))
			.map((key) => [key, key.replace('@wordpress/', 'wp-')])
	);

	// Add common mappings
	wpCoreDeps.react = 'wp-element';
	wpCoreDeps['react-dom'] = 'wp-element';

	// Process imports to find WordPress dependencies
	if (chunk.imports) {
		chunk.imports.forEach((importPath) => {
			for (const [jsModule, wpDep] of Object.entries(wpCoreDeps)) {
				if (importPath.includes(jsModule)) {
					dependencies.add(wpDep);
				}
			}
		});
	}

	return Array.from(dependencies);
}
