/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import type { GetAction } from '../types';

/**
 * Controls for the store
 */
const controls = {
	/**
	 * Get data from API endpoint
	 * @param {GetAction} action Action object
	 * @return {Promise<unknown>} Promise object
	 */
	GET(action: GetAction): Promise<unknown> {
		return apiFetch({ path: action.payload });
	},
};

export default controls;
