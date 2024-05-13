/**
 * Internal dependencies
 */
import actions from './actions.js';
import { PATHS } from '../constants.js';

/**
 * Resolvers for the options store.
 */
const resolvers = {
	/**
	 * Get contact info
	 * @return {Object} Action object
	 */
	*getContact() {
		const result = yield actions.getContact(PATHS.contact);
		return actions.setContact(result);
	},
	/**
	 * Get social accounts
	 * @return {Object} Action object
	 */
	*getSocial() {
		const result = yield actions.getSocial(PATHS.social);
		return actions.setSocial(result);
	},
};

export default resolvers;
