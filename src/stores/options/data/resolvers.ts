/**
 * Internal dependencies
 */
import actions from './actions.js';
import { PATHS } from '../constants.js';

type Resolvers = {
	getContact: () => any;
	getSocial: () => any;
};

/**
 * Resolvers for the options store.
 */
const resolvers: Resolvers = {
	/**
	 * Get contact info
	 * @return {Object} Action object
	 */
	*getContact(): Generator<any, any, any> {
		const result = yield actions.getContact(PATHS.contact);
		return actions.setContact(result);
	},
	/**
	 * Get social accounts
	 * @return {Object} Action object
	 */
	*getSocial(): Generator<any, any, any> {
		const result = yield actions.getSocial(PATHS.social);
		return actions.setSocial(result);
	},
};

export default resolvers;
