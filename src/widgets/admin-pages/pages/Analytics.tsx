/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Shared dependencies
 */
import { useAdminForm } from '@/shared/hooks';
import type { AnalyticsAdminSettingsData } from '@/shared/hooks/lib/useAdminForm/types/data';

/**
 * Internal dependencies
 */
import { OptionBody, OptionGroup } from '../components/containers';
import { Form, FormHead, FormBody, FormButton } from '../components/form';
import { Input } from '../components/inputs';

/**
 * Analytics Settings Page
 * @return {JSX.Element} JSX for the analytics settings page
 */
const Analytics = (): JSX.Element | null => {
	const { formData, handleChange, handleSave } = useAdminForm({
		path: 'api/v1/settings/tagmanager',
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
			name={__('Analytics Settings', 'kotisivu-block-theme')}
			description={__(
				'Using Tag Manager is the recommended way of adding analytics (including cookie management) to your site. Kotisivu Theme uses unique script to delay the loading of analytics so it does not have any performance impact on your site.',
				'kotisivu-block-theme'
			)}
		>
			<OptionGroup>
				<Form onSave={() => handleSave({ data: formData })}>
					<FormHead
						name={__('Google Tag Manager', 'kotisivu-block-theme')}
						toggleName="active"
						toggleValue={
							(formData as AnalyticsAdminSettingsData).active
						}
						toggleCallback={handleChange}
					/>
					<FormBody>
						<Input
							type="text"
							label={__('Container ID', 'kotisivu-block-theme')}
							name="id"
							placeholder="GTM-123456"
							value={(formData as AnalyticsAdminSettingsData).id}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label={__('Container URL', 'kotisivu-block-theme')}
							name="url"
							placeholder="www.googletagmanager.com"
							value={(formData as AnalyticsAdminSettingsData).url}
							onChange={handleChange}
						/>
						<Input
							type="number"
							label={__('Timeout', 'kotisivu-block-theme')}
							name="timeout"
							value={
								(formData as AnalyticsAdminSettingsData).timeout
							}
							onChange={handleChange}
							placeholder={'2000'}
						/>
					</FormBody>
					<FormButton />
				</Form>
			</OptionGroup>
		</OptionBody>
	);
};

export default Analytics;
