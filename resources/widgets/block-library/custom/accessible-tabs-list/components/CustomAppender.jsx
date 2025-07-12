/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Constants
 */
const TAB_BLOCK_NAME = 'ksd/accessible-tabs-list-item';
const PANEL_CONTAINER_BLOCK_NAME = 'ksd/accessible-tabs-panel-container';
const PANEL_BLOCK_NAME = 'ksd/accessible-tabs-panel';

/**
 * Button custom appender
 * @param {Object} props - component props
 * @param {string} props.clientId - client id
 * @return {JSX.Element} - React component
 */
export default function CustomAppender({ clientId }) {
	const { insertBlock } = useDispatch('core/block-editor');

	/**
	 * Get blocks related to this block
	 */
	const parentBlock = useSelect((select) => {
		const parent = select('core/block-editor').getBlockParents(clientId);
		return select('core/block-editor').getBlock(parent[parent.length - 1]);
	});

	const panelBlock = parentBlock?.innerBlocks.find(
		(child) => child.name === PANEL_CONTAINER_BLOCK_NAME
	);

	/**
	 * Insert a new tab and panel block
	 * @return {void}
	 */
	const insertNew = async () => {
		const listBlock = await wp.data
			.select('core/block-editor')
			.getBlock(clientId);

		const nextIndex = listBlock?.innerBlocks.length + 1;

		if (!nextIndex) {
			return;
		}

		if (nextIndex > 8) {
			// eslint-disable-next-line no-alert
			window.alert(
				__('Maximum number (8) of tabs reached', 'kotisivu-block-theme')
			);
			return;
		}

		// Insert new tab block
		insertBlock(
			createBlock(TAB_BLOCK_NAME, {
				tabName: `Tab ${nextIndex}`,
				tabId: nextIndex,
				tabRef: `#panel-${nextIndex}`,
			}),
			nextIndex,
			clientId
		);

		// Insert new panel block
		insertBlock(
			createBlock(PANEL_BLOCK_NAME, {
				panelId: nextIndex,
				labelledBy: `tab-${nextIndex}`,
			}),
			nextIndex,
			panelBlock.clientId
		);
	};

	return (
		<button
			className="editor-accessible-tabs__list-add"
			onClick={insertNew}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
				<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
			</svg>
			{__('Add new', 'kotisivu-block-theme')}
		</button>
	);
}
