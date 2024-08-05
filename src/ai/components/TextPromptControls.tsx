/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { useState, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TextPromptPopover from './popover/TextPromptPopover';

import StatusContext from '../contexts/StatusContext';
import SelectionContext from '../contexts/SelectionContext';

import { getCurrentSelection } from '../utils';

import { ALLOWED_TEXT_BLOCKS, STATUS } from '../constants';

import { Selection, Status } from '../types';

/**
 * Higher order component to add AI controls to the paragraph block
 * @param {React.ComponentType<any>} BlockEdit - The block edit component
 * @return {JSX.Element}
 */
const TextPromptControls = createHigherOrderComponent(function (
	BlockEdit: React.ComponentType<any>
) {
	return (props: any) => {
		/**
		 * Check that we are in the correct block
		 */
		if (!ALLOWED_TEXT_BLOCKS.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		/**
		 * Handle state
		 */
		const [status, setStatus] = useState<Status>(STATUS.INITIAL);
		const [selection, setSelection] = useState<Selection>({
			block: null,
			anchor: null,
			text: '',
			start: 0,
			end: 0,
		});

		/**
		 * Handle keyboard shortcut to open the popover
		 */
		useShortcut(
			'kotisivu-block-theme/shortcut-ai-open',
			useCallback(async (event: KeyboardEvent) => {
				const currentSelection = await getCurrentSelection();

				if (currentSelection) {
					setSelection(currentSelection);
					setStatus(STATUS.VISIBLE);
				} else {
					// eslint-disable-next-line no-console
					console.error(
						__(
							'No text selected or wrong block type',
							'kotisivu-block-theme'
						)
					);

					setStatus(STATUS.ERROR);
				}
			}, [])
		);

		return (
			<>
				<BlockEdit {...props} />
				<StatusContext.Provider value={{ status, setStatus }}>
					<SelectionContext.Provider
						value={{ selection, setSelection }}
					>
						<TextPromptPopover />
					</SelectionContext.Provider>
				</StatusContext.Provider>
			</>
		);
	};
}, 'AiControls');

export default TextPromptControls;
