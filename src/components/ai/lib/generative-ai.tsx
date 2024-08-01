/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

import apiFetch from '@wordpress/api-fetch';

type Response = {
	id: string;
	object: string;
	created: Number;
	model: string;
	choices: Array<{
		index: Number;
		message: {
			role: string;
			content: string;
		};
		logprobs: null;
		finish_reason: string;
	}>;
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
	system_fingerprint: string;
};

/**
 * Controllers for block width
 * Props style must be defined in block attributes
 * @param {Object} props Component props
 * @param {Record<string, any>} props.style Block style
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const GenerativeAI = ({
	attributes,
	setAttributes,
}: {
	attributes: Record<string, any>;
	setAttributes: (newAttributes: Record<string, any>) => void;
}): JSX.Element => {
	async function search(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const prompt = formData.get('prompt');

		await apiFetch({
			method: 'POST',
			path: 'kotisivu-block-theme/v1/ai/generate',
			data: {
				prompt,
			},
		}).then((response: unknown) => {
			const gptResponse = response as Response;
			setAttributes({ content: gptResponse.choices[0].message.content });
		});
	}

	return (
		<>
			<PanelBody title={__('Width Controls', 'kotisivu-block-theme')}>
				<form onSubmit={search}>
					<label>Prompt</label>
					<textarea id="prompt" name="prompt" rows={4}></textarea>
					<button type="submit">Generate</button>
				</form>
			</PanelBody>
		</>
	);
};

export { GenerativeAI };
