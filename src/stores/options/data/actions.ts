/**
 * Internal dependencies
 */
import type { OptionAction } from '../types';

type Actions = {
	setContact: (options: object) => { type: OptionAction; options: object };
	setSocial: (options: object) => { type: OptionAction; options: object };
	getContact: (path: string) => { type: string; path: string };
	getSocial: (path: string) => { type: string; path: string };
};

/**
 * Actions for the options store.
 * Used to dispatch data to the store.
 */
const actions: Actions = {
	/**
	 * Set contact info.
	 * @param {Object} options Options object.
	 * @return {Object} Action object.
	 */
	setContact(options: object) {
		return {
			type: 'SET_CONTACT',
			options,
		};
	},
	/**
	 * Set social accounts.
	 * @param {Object} options Options object.
	 * @return {Object} Action object.
	 */
	setSocial(options: object) {
		return {
			type: 'SET_SOCIAL',
			options,
		};
	},
	/**
	 * Get contact info.
	 * @param {string} path Path to the REST API endpoint.
	 * @return {Object} Action object.
	 */
	getContact(path: string) {
		return {
			type: 'GET_CONTACT',
			path,
		};
	},
	/**
	 * Get social accounts.
	 * @param {string} path Path to the REST API endpoint.
	 * @return {Object} Action object.
	 */
	getSocial(path: string) {
		return {
			type: 'GET_SOCIAL',
			path,
		};
	},
};

export default actions;
