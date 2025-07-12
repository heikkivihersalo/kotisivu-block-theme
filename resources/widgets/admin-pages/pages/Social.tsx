/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Shared dependencies
 */
import { useAdminForm } from '@/shared/hooks';
import type { SocialAccountsAdminSettingsData } from '@/shared/hooks/lib/useAdminForm/types/data';

/**
 * Internal dependencies
 */
import { OptionBody, OptionGroup } from '../components/containers';
import { Form, FormHead, FormBody, FormButton } from '../components/form';
import { Input } from '../components/inputs';

/**
 * Social Settings Page
 * @return {JSX.Element} JSX for the social settings page
 */
const Social = (): JSX.Element | null => {
	const { formData, handleChange, handleSave } = useAdminForm({
		path: 'api/v1/settings/socials',
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
			value: (formData as SocialAccountsAdminSettingsData).facebook,
		},
		{
			name: 'Twitter',
			key: 'twitter',
			value: (formData as SocialAccountsAdminSettingsData).twitter,
		},
		{
			name: 'Instagram',
			key: 'instagram',
			value: (formData as SocialAccountsAdminSettingsData).instagram,
		},
		{
			name: 'LinkedIn',
			key: 'linkedin',
			value: (formData as SocialAccountsAdminSettingsData).linkedin,
		},
		{
			name: 'YouTube',
			key: 'youtube',
			value: (formData as SocialAccountsAdminSettingsData).youtube,
		},
		{
			name: 'Pinterest',
			key: 'pinterest',
			value: (formData as SocialAccountsAdminSettingsData).pinterest,
		},
		{
			name: 'Snapchat',
			key: 'snapchat',
			value: (formData as SocialAccountsAdminSettingsData).snapchat,
		},
		{
			name: 'TikTok',
			key: 'tiktok',
			value: (formData as SocialAccountsAdminSettingsData).tiktok,
		},
		{
			name: 'Twitch',
			key: 'twitch',
			value: (formData as SocialAccountsAdminSettingsData).twitch,
		},
		{
			name: 'Reddit',
			key: 'reddit',
			value: (formData as SocialAccountsAdminSettingsData).reddit,
		},
		{
			name: 'Discord',
			key: 'discord',
			value: (formData as SocialAccountsAdminSettingsData).discord,
		},
		{
			name: 'WhatsApp',
			key: 'whatsapp',
			value: (formData as SocialAccountsAdminSettingsData).whatsapp,
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
