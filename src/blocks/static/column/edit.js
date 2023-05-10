/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { sprintf, __ } from '@wordpress/i18n';

function ColumnEdit({
	attributes: {
		templateLock,
		allowedBlocks
	},
	clientId,
}) {

	const { columnsIds, hasChildBlocks, rootClientId } = useSelect((select) => {
		const {
			getBlockOrder,
			getBlockRootClientId
		} = select(blockEditorStore);

		const rootId = getBlockRootClientId(clientId);

		return {
			hasChildBlocks: getBlockOrder(clientId).length > 0,
			rootClientId: rootId,
			columnsIds: getBlockOrder(rootId),
		};
	},
		[clientId]
	);

	const blockProps = useBlockProps();

	/**
	 * Label for screen readers
	 * 
	 * translators: 
	 * - 1: Block label (i.e. "Block: Column"), 
	 * - 2: Position of the selected block, 
	 * - 3: Total number of sibling blocks of the same type
	 * ex. "Block: Column (2 of 4)"
	 */
	const label = sprintf(
		__('%1$s (%2$d of %3$d)'),
		blockProps['aria-label'],
		columnsIds.indexOf(clientId) + 1,
		columnsIds.length
	);

	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps, 'aria-label': label },
		{
			templateLock,
			allowedBlocks,
			renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<div {...innerBlocksProps} />
		</>
	);
}

export default ColumnEdit;
