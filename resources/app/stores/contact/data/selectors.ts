/**
 * Internal dependencies
 */
import type { SetOption, Store } from '../types';

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
