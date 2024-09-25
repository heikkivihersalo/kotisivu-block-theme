/**
 * Internal dependencies
 */
import actions from './data/actions.ts';
import controls from './data/controls.ts';
import reducer from './data/reducer.ts';
import resolvers from './data/resolvers.ts';
import selectors from './data/selectors.ts';

/**
 * Store constants
 */
export const STORE_NAME = 'theme/social-media';
export const STORE_CONFIG = {
	selectors,
	actions,
	reducer,
	resolvers,
	controls,
};
