/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import type { Image, ImageResponse } from '../../types.ts';

/**
 * Get blocks from the AI
 * @param {string} prompt Prompt
 * @return {Promise<Image[]>} Array of block instances
 */
async function getAiImageContent({
	prompt,
}: {
	prompt: FormDataEntryValue | null;
}): Promise<Image[]> {
	const response: ImageResponse = await apiFetch({
		method: 'POST',
		path: 'kotisivu-block-theme/v1/ai/image/generate',
		data: {
			prompt: prompt,
		},
	});

	return response.data;
}

export { getAiImageContent };
