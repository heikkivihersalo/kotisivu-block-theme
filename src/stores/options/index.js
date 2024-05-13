/**
 * Internal dependencies
 */
import actions from './data/actions.js';
import controls from './data/controls.js';
import reducer from './data/reducer.js';
import resolvers from './data/resolvers.js';
import selectors from './data/selectors.js';

/**
 * Store constants
 */
export const STORE_NAME = 'theme/options';
export const STORE_CONFIG = {
	selectors,
	actions,
	reducer,
	resolvers,
	controls,
};
