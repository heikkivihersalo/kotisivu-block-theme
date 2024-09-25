/**
 * Internal dependencies
 */
import actions from './actions';
import { API_PATH } from '../constants';

import type { SetAction, GetAction, ApiResponse } from '../types';

/**
 * Resolvers for the store.
 */
const resolvers = {
	/**
	 * Get generator function
	 * @return {Generator<GetAction, SetAction, ApiResponse>} Action object
	 */
	*get(): Generator<GetAction, SetAction, ApiResponse> {
		const result = yield actions.get(API_PATH);
		return actions.set(result.data);
	},
};

export default resolvers;
