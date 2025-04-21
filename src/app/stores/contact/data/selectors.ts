/**
 * Internal dependencies
 */
import type { Store, SetOption } from '../types';

/**
 * Selectors for the store
 */
const selectors = {
	/**
	 * Get store state
	 * @param {Store} state Store state
	 */
	get(state: Store): SetOption {
		return state;
	},
};

export default selectors;
