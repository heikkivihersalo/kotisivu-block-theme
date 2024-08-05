import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';
import { useContext } from '@wordpress/element';
/**
 * Internal dependencies
 */
import SelectionContext from '../../contexts/SelectionContext';
import StatusContext from '../../contexts/StatusContext';

import Form from '../form/Form';
import PromptControl from '../form/PromptControl';
import SelectionControl from '../form/SelectionControl';
import WarningText from '../form/WarningText';

import {
	getAiContent,
	addBlocksToEditor,
	parseMarkdownToBlocks,
	replateSelectedText,
} from '../../utils';

import { STATUS } from '../../constants';

/**
 * AiPopover component
 * @param {Object} props - Component props
 * @param {boolean} props.isVisible - Popover visibility
 * @param {Function} props.setIsVisible - Popover visibility setter
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.selectedText - Selected text
 * @param {Function} props.generateContentCallback - Generate content callback
 * @return {JSX.Element} Popover component
 */
const TextPromptPopover = (): JSX.Element | null => {
	const { selection, setSelection } = useContext(SelectionContext);
	const { status, setStatus } = useContext(StatusContext);

	const modalOpen = status === STATUS.VISIBLE || status === STATUS.LOADING;

	if (!selection || !modalOpen) {
		return null;
	}

	/**
	 * Close popover window
	 * @return {void}
	 */
	const closePopover = (): void => {
		setStatus(STATUS.INITIAL);
		setSelection({
			block: null,
			anchor: null,
			text: '',
			start: 0,
			end: 0,
		});
	};

	/**
	 * Handle generate content
	 * @param event - Form event
	 */
	const generateContent = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStatus(STATUS.LOADING);

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
			window.alert(__('Please enter a prompt', 'kotisivu-block-theme'));
			setStatus(STATUS.INITIAL);
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

		closePopover();
	};

	return (
		<Popover
			placement="bottom"
			onClose={closePopover}
			anchor={selection.anchor}
		>
			<Form onSubmit={generateContent}>
				<PromptControl status={status} />
				<SelectionControl selectedText={selection.text} />
				<WarningText />
			</Form>
		</Popover>
	);
};

export default TextPromptPopover;
