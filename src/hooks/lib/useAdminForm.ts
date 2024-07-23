/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import type { AdminFormData, AdminApiResponse, AdminFormProps } from '@hooks';

/**
 * Handle form changes and updates
 * @param {Object} props Props
 * @param {string} props.path Path to the API endpoint
 * @param {string} props.nonce Nonce
 * @return {Object} formData, setFormData, handleChange, handleSave
 */
function useAdminForm({ path, nonce }: AdminFormProps): {
	formData: AdminFormData;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSave: ({ data }: { data: AdminFormData }) => void;
} {
	const [formData, setFormData] = useState({});

	/**
	 * Get initial values
	 */
	useEffect(() => {
		if (nonce) {
			apiFetch.use(apiFetch.createNonceMiddleware(nonce));
		} else {
			console.error(
				__(
					'Nonce is missing for the admin form.',
					'kotisivu-block-theme'
				)
			);
		}

		apiFetch({
			method: 'GET',
			path,
		}).then((response: unknown) => {
			const adminResponse = response as AdminApiResponse;
			if ('data' in adminResponse) {
				setFormData(adminResponse.data);
			}
		});
	}, [path, nonce]);

	/**
	 * Handle form changes
	 * @param {React.ChangeEvent<HTMLInputElement>} e Event
	 * @return {void}
	 */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
			case 'textarea':
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
	const handleSave = ({ data }: { data: AdminFormData }): void => {
		if (nonce) {
			apiFetch.use(apiFetch.createNonceMiddleware(nonce));
		} else {
			console.error(
				__(
					'Nonce is missing for the admin form.',
					'kotisivu-block-theme'
				)
			);
		}

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
