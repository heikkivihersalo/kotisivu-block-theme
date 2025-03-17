/**
 * Internal dependencies
 */
import { ACTIONS } from '../constants';

import type { SetOption, GetOption, SetAction, GetAction } from '../types';

/**
 * Actions for the store.
 * Used to dispatch data to the store.
 */
const actions = {
	/**
	 * Set action for the store.
	 * @param {SetOption} data Options object.
	 * @return {SetAction} Action object.
	 */
	set(data: SetOption): SetAction {
		return {
			type: ACTIONS.SETTER,
			payload: data,
		};
	},
	/**
	 * Get action for the store.
	 * @param {GetOption} path Options path
	 * @return {GetAction} Action object.
	 */
	get(path: GetOption): GetAction {
		return {
			type: ACTIONS.GETTER,
			payload: path,
		};
	},
};

export default actions;
