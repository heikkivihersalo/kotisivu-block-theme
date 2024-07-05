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
 * Social Settings Page
 * @return {JSX.Element} JSX for the social settings page
 */
const Social = () => {
	const { formData, handleChange, handleSave } = useAdminForm({
		path: 'kotisivu-block-theme/v1/options/social',
		nonce: window.kotisivuSettings.nonce,
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
			value: formData.facebook,
		},
		{
			name: 'Twitter',
			key: 'twitter',
			value: formData.twitter,
		},
		{
			name: 'Instagram',
			key: 'instagram',
			value: formData.instagram,
		},
		{
			name: 'LinkedIn',
			key: 'linkedin',
			value: formData.linkedin,
		},
		{
			name: 'YouTube',
			key: 'youtube',
			value: formData.youtube,
		},
		{
			name: 'Pinterest',
			key: 'pinterest',
			value: formData.pinterest,
		},
		{
			name: 'Snapchat',
			key: 'snapchat',
			value: formData.snapchat,
		},
		{
			name: 'TikTok',
			key: 'tiktok',
			value: formData.tiktok,
		},
		{
			name: 'Twitch',
			key: 'twitch',
			value: formData.twitch,
		},
		{
			name: 'Reddit',
			key: 'reddit',
			value: formData.reddit,
		},
		{
			name: 'Discord',
			key: 'discord',
			value: formData.discord,
		},
		{
			name: 'WhatsApp',
			key: 'whatsapp',
			value: formData.whatsapp,
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
