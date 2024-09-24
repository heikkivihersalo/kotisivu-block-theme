/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

type Controls = {
	GET_CONTACT: (action: { path: string }) => Promise<any>;
	GET_SOCIAL: (action: { path: string }) => Promise<any>;
};

/**
 * Controls for the options store
 */
const controls: Controls = {
	/**
	 * Get contact info
	 * @param {Object} action Action object
	 * @return {Promise} Promise object
	 */
	GET_CONTACT(action) {
		const response = apiFetch({ path: action.path });
		return response;
	},
	/**
	 * Get social accounts
	 * @param {Object} action Action object
	 * @return {Promise} Promise object
	 */
	GET_SOCIAL(action) {
		const response = apiFetch({ path: action.path });
		return response;
	},
};

export default controls;
