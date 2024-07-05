/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Handle form changes and updates
 * @param {Object} props Props
 * @param {string} props.path Path to the API endpoint
 * @param {string} props.nonce Nonce
 * @return {Object} formData, setFormData, handleChange, handleSave
 */
function useAdminForm({ path, nonce }) {
	const [formData, setFormData] = useState({});

	/**
	 * Get initial values
	 */
	useEffect(() => {
		apiFetch.use(apiFetch.createNonceMiddleware(nonce));

		apiFetch({
			method: 'GET',
			path,
		}).then((response) => {
			setFormData(response.data);
		});
	}, [path, nonce]);

	/**
	 * Handle form changes
	 * @param {Object} e Event
	 * @return {void}
	 */
	const handleChange = (e) => {
		switch (e.target.type) {
			case 'checkbox':
				setFormData({
					...formData,
					[e.target.name]: e.target.checked,
				});
				break;
			case 'number':
				setFormData({
					...formData,
					[e.target.name]: parseInt(e.target.value),
				});
				break;
			case 'text':
				setFormData({
					...formData,
					[e.target.name]: e.target.value,
				});
				break;
			default:
				break;
		}
	};

	/**
	 * Handle saving the form
	 * @param {Object} props Props
	 * @param {Object} props.data Form data
	 * @return {void}
	 */
	const handleSave = ({ data }) => {
		apiFetch.use(apiFetch.createNonceMiddleware(nonce));

		apiFetch({
			method: 'POST',
			path,
			data,
		}).then(() => {
			// eslint-disable-next-line no-alert
			window.alert(
				__('Settings have been saved.', 'kotisivu-block-theme')
			);
		});
	};

	return { formData, handleChange, handleSave };
}

export { useAdminForm };
