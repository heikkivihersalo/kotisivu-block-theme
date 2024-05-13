/**
 * Internal dependencies
 */
import { SOCIAL, CONTACT } from '../constants';
import TYPES from '../types';
const { SET_CONTACT, SET_SOCIAL } = TYPES;

/**
 * Reducer for the options store
 * @param {Object} state State object
 * @param {Object} action Action object
 * @return {Object} New state object
 */
const reducer = (
	state = {
		contact: {},
		social: {},
	},
	action
) => {
	switch (action.type) {
		/**
		 * Handle setting contact info
		 */
		case SET_CONTACT: {
			const contactInfo = {};
			CONTACT.forEach((info) => {
				const value = action.options.data[info.db_key];
				contactInfo[info.key] = value;
			});

			return {
				...state,
				contact: contactInfo,
			};
		}
		/**
		 * Handle setting social accounts
		 */
		case SET_SOCIAL: {
			const socialAccounts = {};
			SOCIAL.forEach((account) => {
				const value = action.options.data[account.db_key];

				if (value !== '') {
					socialAccounts[account.key] = value;
				}
			});

			return {
				...state,
				social: socialAccounts,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
