import { getWordPressPackages, getThirdPartyLibraries } from '../constants.js';

/**
 * Check if a module ID is a React-related package
 * @param {string} id - Module ID to check
 * @returns {boolean} True if the ID is a React package
 */
function isReactPackage(id) {
	return (
		id === 'react' ||
		id === 'react-dom' ||
		id === 'react/jsx-runtime' ||
		id === 'react/jsx-dev-runtime' ||
		id.includes('node_modules/react/') ||
		id.includes('/react/cjs/') ||
		id.includes('react.development.js') ||
		id.includes('react.production') ||
		id.includes('?commonjs-module') ||
		/\/node_modules\/react\//.test(id) ||
		/react\.development\.js/.test(id) ||
		/react\.production\.min\.js/.test(id)
	);
}

/**
 * Create external dependencies function for Rollup
 * @returns {Function} External function for Rollup configuration
 */
export function createExternalFunction() {
	const wordpressPackages = getWordPressPackages();
	const thirdPartyLibraries = getThirdPartyLibraries();

	return (id) => {
		// Check for React-related modules
		if (isReactPackage(id)) {
			return true;
		}

		// Check for WordPress packages
		if (
			wordpressPackages.some(
				(pkg) => id === pkg || id.startsWith(pkg + '/')
			)
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
