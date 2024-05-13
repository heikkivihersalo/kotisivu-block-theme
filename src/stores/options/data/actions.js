/**
 * Internal dependencies
 */
import TYPES from '../types';
const {
	SET_SOCIAL,
	SET_CONTACT,
	GET_SOCIAL,
	GET_CONTACT,
} = TYPES;

/**
 * Actions for the options store.
 * Used to dispatch data to the store.
 */
const actions = {
	/**
	 * Set contact info.
	 * @param {Object} options Options object.
	 * @return {Object} Action object.
	 */
	setContact(options) {
		return {
			type: SET_CONTACT,
			options,
		};
	},
	/**
	 * Set social accounts.
	 * @param {Object} options Options object.
	 * @return {Object} Action object.
	 */
	setSocial(options) {
		return {
			type: SET_SOCIAL,
			options,
		};
	},
	/**
	 * Get contact info.
	 * @param {string} path Path to the REST API endpoint.
	 * @return {Object} Action object.
	 */
	getContact(path) {
		return {
			type: GET_CONTACT,
			path,
		};
	},
	/**
	 * Get social accounts.
	 * @param {string} path Path to the REST API endpoint.
	 * @return {Object} Action object.
	 */
	getSocial(path) {
		return {
			type: GET_SOCIAL,
			path,
		};
	},
};

export default actions;
