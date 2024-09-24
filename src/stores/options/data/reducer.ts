/**
 * Internal dependencies
 */
import { SOCIAL, CONTACT } from '../constants';
import type { OptionAction } from '../types';

type Reducer = (
	state: object,
	action: {
		type: string;
		options: {
			data: {
				[key: string]: string;
			};
		};
	}
) => object;

/**
 * Reducer for the options store
 * @param {Object} state State object
 * @param {Object} action Action object
 * @return {Object} New state object
 */
const reducer: Reducer = (
	state = {
		contact: {},
		social: {},
	},
	action
) => {
	switch (action.type as OptionAction) {
		/**
		 * Handle setting contact info
		 */
		case 'SET_CONTACT': {
			const contactInfo: Record<string, any> = {};
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
		case 'SET_SOCIAL': {
			const socialAccounts: Record<string, any> = {};
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
