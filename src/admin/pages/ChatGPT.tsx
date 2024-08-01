/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useAdminForm } from '@hooks';
import { OptionBody, OptionGroup } from '@admin/containers';
import { Form, FormHead, FormBody, FormButton } from '@admin/form';
import { Input } from '@admin/inputs';
import type { ChatGPTAdminFormData } from '@hooks';

/**
 * Analytics Settings Page
 * @return {JSX.Element} JSX for the analytics settings page
 */
const ChatGPT = (): JSX.Element | null => {
	const { formData, handleChange, handleSave } = useAdminForm({
		path: 'kotisivu-block-theme/v1/options/chatgpt',
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
			name={__('ChatGPT', 'kotisivu-block-theme')}
			description={sprintf(
				__(
					'Configure the ChatGPT API settings. You can get the API key from the ChatGPT dashboard. Access the dashboard <a href="%s">here</a>.',
					'kotisivu-block-theme'
				),
				'https://platform.openai.com/api-keys'
			)}
		>
			<OptionGroup>
				<Form onSave={() => handleSave({ data: formData })}>
					<FormHead
						name={__('API Settings', 'kotisivu-block-theme')}
					/>
					<FormBody>
						<Input
							type="text"
							label={__('Model', 'kotisivu-block-theme')}
							name="model"
							placeholder="gpt-4o-mini"
							value="gpt-4o-mini"
							disabled={true}
						/>
						<Input
							type="text"
							label={__('API Key', 'kotisivu-block-theme')}
							name="api_key"
							placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
							value={(formData as ChatGPTAdminFormData).api_key}
							onChange={handleChange}
						/>
					</FormBody>
					<FormButton />
				</Form>
			</OptionGroup>
		</OptionBody>
	);
};

export default ChatGPT;
