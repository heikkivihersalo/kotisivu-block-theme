import { safeReadFile } from './safeReadFile.js';

/**
 * Extracts WordPress dependencies from JavaScript file content
 * @param {string} filePath - Path to the JavaScript file
 * @returns {string[]} Array of WordPress dependencies
 */
export function extractWordPressDependencies(filePath) {
	const commonWordPressDeps = [
		'wp-blocks',
		'wp-block-editor',
		'wp-components',
		'wp-compose',
		'wp-data',
		'wp-element',
		'wp-hooks',
		'wp-i18n',
		'wp-primitives',
		'wp-rich-text',
		'wp-server-side-render',
		'wp-url',
		'wp-api-fetch',
		'wp-html-entities',
		'wp-keycodes',
		'wp-notices',
		'wp-viewport',
	];

	try {
		const content = safeReadFile(filePath);
		const foundDeps = [];

		// Check for WordPress globals usage
		if (content.includes('wp.')) {
			// Extract wp.* usage patterns
			const wpMatches = content.match(/wp\.([a-zA-Z][a-zA-Z0-9]*)/g);
			if (wpMatches) {
				wpMatches.forEach((match) => {
					const wpModule = match.replace('wp.', 'wp-');
					// Convert camelCase to kebab-case
					const kebabCase = wpModule
						.replace(/([A-Z])/g, '-$1')
						.toLowerCase();
					if (
						commonWordPressDeps.includes(kebabCase) &&
						!foundDeps.includes(kebabCase)
					) {
						foundDeps.push(kebabCase);
					}
				});
			}
		}

		// Check for @wordpress/ imports
		const wpImportMatches = content.match(/@wordpress\/([a-z-]+)/g);
		if (wpImportMatches) {
			wpImportMatches.forEach((match) => {
				const wpDep = match.replace('@wordpress/', 'wp-');
				if (
					commonWordPressDeps.includes(wpDep) &&
					!foundDeps.includes(wpDep)
				) {
					foundDeps.push(wpDep);
				}
			});
		}

		// Add React if JSX is detected
		if (
			content.includes('jsxDEV') ||
			content.includes('jsx') ||
			content.includes('React')
		) {
			if (!foundDeps.includes('react')) {
				foundDeps.unshift('react');
			}
		}

		// Ensure essential WordPress dependencies are included for blocks
		const essentialDeps = ['wp-blocks', 'wp-block-editor', 'wp-i18n'];
		essentialDeps.forEach((dep) => {
			if (!foundDeps.includes(dep)) {
				foundDeps.push(dep);
			}
		});

		return foundDeps.sort();
	} catch (error) {
		console.warn(
			`⚠️  Could not analyze dependencies for ${filePath}:`,
			error.message
		);
		// Return default WordPress block dependencies
		return ['react', 'wp-block-editor', 'wp-blocks', 'wp-i18n'];
	}
}
