import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Form from './form/Form';
import PromptControl from './form/PromptControl';
import SelectionControl from './form/SelectionControl';
import WarningText from './form/WarningText';
import type { PopoverProps } from '../types';

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
const AiPopover = ({
	isVisible,
	setIsVisible,
	isLoading,
	selectedText,
	generateContentCallback,
}: PopoverProps): JSX.Element => {
	return (
		<>
			{isVisible && (
				<>
					<Popover
						placement="bottom"
						onClose={() => setIsVisible(false)}
					>
						<Form onSubmit={generateContentCallback}>
							<PromptControl isLoading={isLoading} />
							<SelectionControl selectedText={selectedText} />
							<WarningText />
						</Form>
					</Popover>
				</>
			)}
		</>
	);
};

export default AiPopover;
