import {
	getWordPressGlobals,
	REACT_GLOBALS,
	getThirdPartyGlobals,
} from '../constants.js';

/**
 * Create globals mapping for external dependencies
 * @returns {Object} Globals mapping for Rollup output configuration
 */
export function createGlobalsMapping() {
	return {
		...getWordPressGlobals(),
		...REACT_GLOBALS,
		...getThirdPartyGlobals(),
	};
}
