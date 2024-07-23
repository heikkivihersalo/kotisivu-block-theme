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
import type { SocialAdminFormData } from '@hooks';

/**
 * Social Settings Page
 * @return {JSX.Element} JSX for the social settings page
 */
const Social = (): JSX.Element | null => {
	const { formData, handleChange, handleSave } = useAdminForm({
		path: 'kotisivu-block-theme/v1/options/social',
		nonce: window.kotisivuSettings?.nonce,
	});

	/**
	 * Return early if form is not set and loaded
	 */
	if (!formData) {
		return null;
	}

	const accounts = [
		{
			name: 'Facebook',
			key: 'facebook',
			value: (formData as SocialAdminFormData).facebook,
		},
		{
			name: 'Twitter',
			key: 'twitter',
			value: (formData as SocialAdminFormData).twitter,
		},
		{
			name: 'Instagram',
			key: 'instagram',
			value: (formData as SocialAdminFormData).instagram,
		},
		{
			name: 'LinkedIn',
			key: 'linkedin',
			value: (formData as SocialAdminFormData).linkedin,
		},
		{
			name: 'YouTube',
			key: 'youtube',
			value: (formData as SocialAdminFormData).youtube,
		},
		{
			name: 'Pinterest',
			key: 'pinterest',
			value: (formData as SocialAdminFormData).pinterest,
		},
		{
			name: 'Snapchat',
			key: 'snapchat',
			value: (formData as SocialAdminFormData).snapchat,
		},
		{
			name: 'TikTok',
			key: 'tiktok',
			value: (formData as SocialAdminFormData).tiktok,
		},
		{
			name: 'Twitch',
			key: 'twitch',
			value: (formData as SocialAdminFormData).twitch,
		},
		{
			name: 'Reddit',
			key: 'reddit',
			value: (formData as SocialAdminFormData).reddit,
		},
		{
			name: 'Discord',
			key: 'discord',
			value: (formData as SocialAdminFormData).discord,
		},
		{
			name: 'WhatsApp',
			key: 'whatsapp',
			value: (formData as SocialAdminFormData).whatsapp,
		},
	];

	/**
	 * Render the component
	 */
	return (
		<OptionBody name={__('Social Media Accounts', 'kotisivu-block-theme')}>
			<OptionGroup>
				<Form onSave={() => handleSave({ data: formData })}>
					<FormHead
						name={__(
							'Social Media Accounts',
							'kotisivu-block-theme'
						)}
					/>
					<FormBody>
						{accounts.map((account) => (
							<Input
								key={account.key}
								type="text"
								label={account.name}
								name={account.key}
								value={account.value}
								onChange={handleChange}
							/>
						))}
					</FormBody>
					<FormButton />
				</Form>
			</OptionGroup>
		</OptionBody>
	);
};

export default Social;
