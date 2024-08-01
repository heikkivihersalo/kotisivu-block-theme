/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { parseMarkdownToBlocks } from './scripts.ts';
import Inspector from './components/Inspector.tsx';
import type { Response } from './types.ts';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @param {Function} props.setAttributes Block attributes setter
 * @return {JSX.Element} React component
 */
export default function Edit({
	attributes,
	clientId,
}: {
	attributes: Record<string, any>;
	clientId: string;
}): JSX.Element {
	const [isLoading, setIsLoading] = useState(false);
	const { blockClass } = attributes;

	const { insertBlock, replaceInnerBlocks } =
		useDispatch('core/block-editor');

	/**
	 * Handle ChatGPT add content
	 * @param {React.FormEvent<HTMLFormElement>} event
	 */
	async function handleAddContent(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		/**
		 * Handle initial loading state and form data
		 */
		setIsLoading(true);
		const formData = new FormData(event.currentTarget);
		const prompt = formData.get('prompt');

		/**
		 * Handle prompt validation
		 * TODO: window.alert is not recommended, use a proper validation method
		 */
		if (!prompt) {
			window.alert(__('Please enter a prompt', 'kotisivu-block-theme'));
			setIsLoading(false);
			return;
		}

		/**
		 * Clear existing blocks
		 */
		replaceInnerBlocks(clientId, []);

		/**
		 * Fetch response from API
		 */
		const response: Response = await apiFetch({
			method: 'POST',
			path: 'kotisivu-block-theme/v1/ai/generate',
			data: {
				prompt,
			},
		});

		/**
		 * Handle adding blocks to the editor
		 */
		const blocks = await parseMarkdownToBlocks(
			response.choices[0].message.content
		);

		blocks.forEach((block, index) => {
			insertBlock(block, index, clientId);
		});

		setIsLoading(false);
	}

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: blockClass,
	} as Record<string, any>);

	return (
		<>
			<Inspector
				handleContentCallback={handleAddContent}
				status={isLoading}
			/>
			<section {...blockProps}>
				<InnerBlocks />
			</section>
		</>
	);
}
