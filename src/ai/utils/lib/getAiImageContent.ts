/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import type { ChatGPTImage, ChatGPTImageResponse } from '@ai/api';

/**
 * Get blocks from the AI
 * @param {string} prompt Prompt
 * @return {Promise<Image[]>} Array of block instances
 */
async function getAiImageContent({
	prompt,
}: {
	prompt: FormDataEntryValue | null;
}): Promise<ChatGPTImage[]> {
	const response: ChatGPTImageResponse = await apiFetch({
		method: 'POST',
		path: 'kotisivu-block-theme/v1/ai/image/generate',
		data: {
			prompt,
		},
	});

	return response.data;
}

export { getAiImageContent };
