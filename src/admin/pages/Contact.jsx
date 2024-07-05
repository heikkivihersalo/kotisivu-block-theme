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

/**
 * Contact Settings Page
 * @return {JSX.Element} JSX for the contact settings page
 */
const Contact = () => {
	const { formData, handleChange, handleSave } = useAdminForm({
		path: 'kotisivu-block-theme/v1/options/contact',
		nonce: window.kotisivuSettings.nonce,
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
							value={formData.name}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Address', 'kotisivu-block-theme')}
							name="address"
							value={formData.address}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Zip Code', 'kotisivu-block-theme')}
							name="zip"
							value={formData.zip}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('City', 'kotisivu-block-theme')}
							name="city"
							value={formData.city}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Country', 'kotisivu-block-theme')}
							name="country"
							value={formData.country}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('VAT Number', 'kotisivu-block-theme')}
							name="vat"
							value={formData.vat}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Business ID', 'kotisivu-block-theme')}
							name="business_id"
							value={formData.business_id}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Email Address', 'kotisivu-block-theme')}
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Phone Number', 'kotisivu-block-theme')}
							name="phone"
							value={formData.phone}
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
