/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Shared dependencies
 */
import { useAdminForm } from '@/shared/hooks';
import type { ContactAdminSettingsData } from '@/shared/hooks/lib/useAdminForm/types/data';

/**
 * Internal dependencies
 */
import { OptionBody, OptionGroup } from '../components/containers';
import { Form, FormHead, FormBody, FormButton } from '../components/form';
import { Input } from '../components/inputs';

/**
 * Contact Settings Page
 * @return {JSX.Element} JSX for the contact settings page
 */
const Contact = (): JSX.Element | null => {
	const { formData, handleChange, handleSave } = useAdminForm({
		path: 'api/v1/settings/contact',
		nonce: window.kotisivuSettings?.nonce,
	});

	/**
	 * Return early if form is not set and loaded
	 */
	if (!formData) {
		return null;
	}

	/**
	 * Render the component
	 */
	return (
		<OptionBody
			name={__('Contact Information', 'kotisivu-block-theme')}
			description={__(
				'Please fill in your contact information below. This information is used dynamically, for example in the footer of your site.',
				'kotisivu-block-theme	'
			)}
		>
			<OptionGroup>
				<Form onSave={() => handleSave({ data: formData })}>
					<FormHead
						name={__('Company Information', 'kotisivu-block-theme')}
					/>
					<FormBody>
						<Input
							type="text"
							label={__('Name', 'kotisivu-block-theme')}
							name="name"
							value={(formData as ContactAdminSettingsData).name}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Address', 'kotisivu-block-theme')}
							name="address"
							value={
								(formData as ContactAdminSettingsData).address
							}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Zip Code', 'kotisivu-block-theme')}
							name="zip"
							value={(formData as ContactAdminSettingsData).zip}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('City', 'kotisivu-block-theme')}
							name="city"
							value={(formData as ContactAdminSettingsData).city}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Country', 'kotisivu-block-theme')}
							name="country"
							value={
								(formData as ContactAdminSettingsData).country
							}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('VAT Number', 'kotisivu-block-theme')}
							name="vat"
							value={(formData as ContactAdminSettingsData).vat}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Business ID', 'kotisivu-block-theme')}
							name="business_id"
							value={
								(formData as ContactAdminSettingsData)
									.business_id
							}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Email Address', 'kotisivu-block-theme')}
							name="email"
							value={(formData as ContactAdminSettingsData).email}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Phone Number', 'kotisivu-block-theme')}
							name="phone"
							value={(formData as ContactAdminSettingsData).phone}
							onChange={handleChange}
						/>
					</FormBody>
					<FormButton />
				</Form>
			</OptionGroup>
		</OptionBody>
	);
};

export default Contact;
