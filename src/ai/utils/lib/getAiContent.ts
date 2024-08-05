/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import type { Response } from '../../types.ts';

/**
 * Internal dependencies
 */
type Props = {
	prompt: FormDataEntryValue | null;
	selection: string;
};

/**
 * Get blocks from the AI
 * @param {string} prompt Prompt
 * @return {Promise<BlockInstance[]>} Array of block instances
 */
async function getAiContent({ prompt, selection }: Props): Promise<string> {
	const response: Response = await apiFetch({
		method: 'POST',
		path: 'kotisivu-block-theme/v1/ai/text/generate',
		data: {
			prompt: selection !== '' ? `${prompt}: ${selection}` : prompt,
		},
	});

	return response.choices[0].message.content;
}

export { getAiContent };
