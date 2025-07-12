import { getWordPressPackages, getThirdPartyLibraries } from '../constants.js';

/**
 * Create external dependencies function for Rollup
 * @returns {Function} External function for Rollup configuration
 */
export function createExternalFunction() {
	const wordpressPackages = getWordPressPackages();
	const thirdPartyLibraries = getThirdPartyLibraries();

	return (id) => {
		// Check for WordPress packages
		if (
			wordpressPackages.some(
				(pkg) => id === pkg || id.startsWith(pkg + '/')
			)
		) {
			return true;
		}

		// React packages - provided by WordPress via wp.element
		// More comprehensive React detection to catch all variants
		if (
			id === 'react' ||
			id === 'react-dom' ||
			id.startsWith('react/') ||
			id.includes('react/jsx-runtime') ||
			id.includes('react/jsx-dev-runtime') ||
			id.includes('node_modules/react/') ||
			id.includes('/react/') ||
			id.includes('react.development.js') ||
			id.includes('react-jsx-dev-runtime') ||
			id.includes('react.js') ||
			id.endsWith('react/index.js') ||
			id.includes('commonjs-') // Catch commonjs variants
		) {
			return true;
		}

		// Third-party libraries provided by WordPress
		if (thirdPartyLibraries.includes(id)) {
			return true;
		}

		return false;
	};
}
