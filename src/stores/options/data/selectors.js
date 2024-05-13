/**
 * Selectors for the options store
 */
const selectors = {
	/**
	 * Get contact info
	 * @param {Object} state Store state
	 */
	getContact(state) {
		const { contact } = state;
		return contact;
	},
	/**
	 * Get social accounts
	 * @param {Object} state Store state
	 */
	getSocial(state) {
		const { social } = state;
		return social;
	},
};

export default selectors;
