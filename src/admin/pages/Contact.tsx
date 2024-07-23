/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useAdminForm } from '@hooks';
import { OptionBody, OptionGroup } from '@admin/containers';
import { Form, FormHead, FormBody, FormButton } from '@admin/form';
import { Input } from '@admin/inputs';
import type { ContactAdminFormData } from '@hooks';

/**
 * Contact Settings Page
 * @return {JSX.Element} JSX for the contact settings page
 */
const Contact = (): JSX.Element | null => {
	const { formData, handleChange, handleSave } = useAdminForm({
		path: 'kotisivu-block-theme/v1/options/contact',
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
							value={(formData as ContactAdminFormData).name}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Address', 'kotisivu-block-theme')}
							name="address"
							value={(formData as ContactAdminFormData).address}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Zip Code', 'kotisivu-block-theme')}
							name="zip"
							value={(formData as ContactAdminFormData).zip}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('City', 'kotisivu-block-theme')}
							name="city"
							value={(formData as ContactAdminFormData).city}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Country', 'kotisivu-block-theme')}
							name="country"
							value={(formData as ContactAdminFormData).country}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('VAT Number', 'kotisivu-block-theme')}
							name="vat"
							value={(formData as ContactAdminFormData).vat}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Business ID', 'kotisivu-block-theme')}
							name="business_id"
							value={
								(formData as ContactAdminFormData).business_id
							}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Email Address', 'kotisivu-block-theme')}
							name="email"
							value={(formData as ContactAdminFormData).email}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Phone Number', 'kotisivu-block-theme')}
							name="phone"
							value={(formData as ContactAdminFormData).phone}
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
