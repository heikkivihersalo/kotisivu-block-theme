type Selectors = {
	getContact: (state: { contact: object }) => object;
	getSocial: (state: { social: object }) => object;
};

/**
 * Selectors for the options store
 */
const selectors: Selectors = {
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
