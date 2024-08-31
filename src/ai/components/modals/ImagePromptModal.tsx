import { __ } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';
/**
 * Internal dependencies
 */
import StatusContext from '../../contexts/StatusContext';

import Form from '../form/Form';
import PromptControl from '../form/PromptControl';
import WarningText from '../form/WarningText';
import ImagePreview from '../image-preview/ImagePreview';

import { getAiImageContent } from '../../utils';
import type { Image } from '../../types';
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
const ImagePromptModal = (): JSX.Element | null => {
	const { status, setStatus } = useContext(StatusContext);
	const [preview, setPreview] = useState<Image[] | null>(null);

	const modalOpen = status === STATUS.VISIBLE || status === STATUS.LOADING;

	if (!modalOpen) {
		return null;
	}

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
		const images = await getAiImageContent({
			prompt: formData.get('prompt'),
		});

		setPreview(images);
	};

	return (
		<Form onSubmit={generateContent}>
			<PromptControl
				status={status}
				placeholder={__(
					'What kind of image you want to generate?',
					'kotisivu-block-theme'
				)}
			/>
			<ImagePreview preview={preview} />
			<WarningText />
		</Form>
	);
};

export default ImagePromptModal;
