/**
 * Internal dependencies
 */
import type { SetAction, Store } from '../types';

/**
 * Reducer for the store
 * @param {Store | undefined} state Current state object
 * @param {SetAction} action Action object
 * @return {Store} New state object
 */
function reducer(state: Store = undefined, action: SetAction): Store {
	switch (action.type) {
		case 'SET': {
			return { ...state, ...action.payload };
		}
		default: {
			return state;
		}
	}
}

export default reducer;
