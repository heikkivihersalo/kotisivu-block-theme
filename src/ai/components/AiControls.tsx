/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { useState, useCallback } from '@wordpress/element';

declare const wp: any;

const { getSelectedBlock } = wp.data.select('core/block-editor');

/**
 * Internal dependencies
 */
import {
	getAiContent,
	addBlocksToEditor,
	parseMarkdownToBlocks,
	getSelectedText,
	replateSelectedText,
} from '../utils';
import AiPopover from './AiPopover';
import { Selection } from '../types';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/list-item',
];

/**
 * Higher order component to add AI controls to the paragraph block
 * @param {React.ComponentType<any>} BlockEdit - The block edit component
 * @return {JSX.Element}
 */
const AiControls = createHigherOrderComponent(
	(BlockEdit: React.ComponentType<any>) => (props: any) => {
		/**
		 * Check that we are in the correct block
		 */
		if (!ALLOWED_BLOCKS.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		/**
		 * Handle state
		 */
		const [isVisible, setIsVisible] = useState<boolean>(false);
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [selection, setSelection] = useState<Selection>({
			block: null,
			text: '',
			start: 0,
			end: 0,
		});

		/**
		 * Handle generate content
		 * @param event - Form event
		 */
		const handleGenerateContent = async (
			event: React.FormEvent<HTMLFormElement>
		) => {
			event.preventDefault();
			setIsLoading(true);

			/**
			 * Get forn data
			 */
			const formData = new FormData(event.currentTarget);

			/**
			 * Handle prompt validation
			 * TODO: window.alert is not recommended, use a proper validation method
			 */
			if (!formData.get('prompt')) {
				// eslint-disable-next-line no-alert
				window.alert(
					__('Please enter a prompt', 'kotisivu-block-theme')
				);
				setIsLoading(false);
				return;
			}

			/**
			 * Fetch the block content
			 */
			const aiContent = await getAiContent({
				prompt: formData.get('prompt'),
				selection: selection.text,
			});

			if (formData.get('use-selected')) {
				replateSelectedText({
					block: selection.block,
					text: aiContent,
					start: selection.start,
					end: selection.end,
				});
			} else {
				const blocks = await parseMarkdownToBlocks(aiContent);
				if (selection.block) {
					addBlocksToEditor({
						currentBlock: selection.block,
						blocks,
					});
				}
			}

			setIsLoading(false);
			setIsVisible(false);
		};

		/**
		 * Handle keyboard shortcut to open the popover
		 */
		useShortcut(
			'kotisivu-block-theme/shortcut-ai-open',
			useCallback(async (event: KeyboardEvent) => {
				/**
				 * Check that we are in the correct block and set the selected block
				 */
				const currentBlock = await getSelectedBlock();

				const {
					name: blockName,
					attributes: {
						content: { text: blockTextContent },
					},
				} = currentBlock;

				if (!ALLOWED_BLOCKS.includes(blockName)) {
					return;
				}

				/**
				 * Get the selected text and save it to the state
				 */
				const {
					text: selectedText,
					start: startIndex,
					end: endIndex,
				} = getSelectedText(blockTextContent);

				setSelection({
					block: currentBlock,
					text: selectedText,
					start: startIndex,
					end: endIndex,
				});

				/**
				 * Show the popover
				 */
				setIsVisible(true);
			}, [])
		);

		return (
			<>
				<BlockEdit {...props} />
				<AiPopover
					isVisible={isVisible}
					setIsVisible={setIsVisible}
					isLoading={isLoading}
					selectedText={selection.text}
					generateContentCallback={handleGenerateContent}
				/>
			</>
		);
	},
	'AiControls'
);

export default AiControls;
